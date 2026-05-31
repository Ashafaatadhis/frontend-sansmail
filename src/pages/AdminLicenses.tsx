import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  IconPlus,
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconBan,
  IconCircleCheck,
  IconDotsVertical,
} from "@tabler/icons-react";
import api from "@/lib/axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [];
  if (current <= 3) pages.push(1, 2, 3, 4, "...", total);
  else if (current >= total - 2) pages.push(1, "...", total - 3, total - 2, total - 1, total);
  else pages.push(1, "...", current - 1, current, current + 1, "...", total);
  return pages;
}

export default function AdminLicenses() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-licenses", debouncedSearch, page, limit, statusFilter],
    queryFn: async () => {
      const params: any = { search: debouncedSearch, page, limit };
      if (statusFilter !== "all") params.isActive = statusFilter;
      const { data } = await api.get("/admin/licenses", { params });
      return data.data;
    },
  });

  const licenses = data?.items ?? [];
  const meta = data?.meta ?? { total: 0, page: 1, totalPages: 1 };
  const pageNumbers = useMemo(() => getPageNumbers(page, meta.totalPages), [page, meta.totalPages]);

  const revokeMutation = useMutation({
    mutationFn: (id: string) => api.patch(`/admin/licenses/${id}/revoke`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-licenses"] });
      toast.success("License revoked");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed"),
  });

  const activateMutation = useMutation({
    mutationFn: (id: string) => api.patch(`/admin/licenses/${id}/activate`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-licenses"] });
      toast.success("License activated");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed"),
  });

  const handleLimitChange = (val: string) => {
    setLimit(Number(val));
    setPage(1);
  };

  return (
    <div className="mt-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-ink-deep">Licenses</h2>
        <Button onClick={() => navigate("/admin/licenses/create")} size="sm">
          <IconPlus className="h-4 w-4 mr-1" />
          Generate License
        </Button>
      </div>

      {/* Search + Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative max-w-sm">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <Input
              placeholder="Search licenses..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-9 h-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="h-9 w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-steel">Show</span>
          <Select value={String(limit)} onValueChange={handleLimitChange}>
            <SelectTrigger className="h-9 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-steel">entries</span>
        </div>
      </div>

      {/* Table */}
      <Card className="border-hairline">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-hairline hover:bg-transparent">
                <TableHead className="h-8 px-6 text-xs uppercase tracking-wider text-steel font-semibold">License Key</TableHead>
                <TableHead className="h-8 px-6 text-xs uppercase tracking-wider text-steel font-semibold">User</TableHead>
                <TableHead className="h-8 px-6 text-xs uppercase tracking-wider text-steel font-semibold">Status</TableHead>
                <TableHead className="h-8 px-6 text-xs uppercase tracking-wider text-steel font-semibold">Domains</TableHead>
                <TableHead className="h-8 px-6 text-xs uppercase tracking-wider text-steel font-semibold">Expires</TableHead>
                <TableHead className="h-8 px-6 text-xs uppercase tracking-wider text-steel font-semibold">Created</TableHead>
                <TableHead className="h-8 w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: limit }).map((_, i) => (
                  <TableRow key={i} className="border-hairline">
                    <TableCell colSpan={7} className="px-6 py-2">
                      <div className="h-4 bg-surface rounded animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))
              ) : licenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-20 text-center text-muted">
                    No licenses found
                  </TableCell>
                </TableRow>
              ) : (
                licenses.map((license: any) => (
                  <TableRow key={license.id} className="border-hairline hover:bg-surface-soft">
                    <TableCell className="px-6 py-2 font-mono text-xs text-ink">
                      {license.key}
                    </TableCell>
                    <TableCell className="px-6 py-2 text-sm text-slate">
                      {license.user?.name ?? "-"}
                    </TableCell>
                    <TableCell className="px-6 py-2">
                      <Badge variant={license.isActive ? "default" : "secondary"} className="text-xs">
                        {license.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-2 text-center text-sm text-slate">
                      {license.domains?.length ?? 0}
                    </TableCell>
                    <TableCell className="px-6 py-2 text-sm text-muted">
                      {license.expiresAt
                        ? new Date(license.expiresAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                        : "Never"}
                    </TableCell>
                    <TableCell className="px-6 py-2 text-sm text-muted">
                      {new Date(license.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </TableCell>
                    <TableCell className="px-2 py-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-xs">
                            <IconDotsVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {license.isActive ? (
                            <DropdownMenuItem onClick={() => revokeMutation.mutate(license.id)}>
                              <IconBan className="h-4 w-4 mr-2" />
                              Revoke
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => activateMutation.mutate(license.id)}>
                              <IconCircleCheck className="h-4 w-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          Showing {meta.total === 0 ? 0 : (page - 1) * limit + 1}–
          {Math.min(page * limit, meta.total)} of {meta.total} licenses
        </p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon-sm" disabled={page <= 1} onClick={() => setPage(1)}>
            <IconChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon-sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            <IconChevronLeft className="h-4 w-4" />
          </Button>
          {pageNumbers.map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="px-1 text-steel text-sm">...</span>
            ) : (
              <Button key={p} variant={p === page ? "default" : "outline"} size="icon-sm" onClick={() => setPage(p as number)}>
                {p}
              </Button>
            )
          )}
          <Button variant="outline" size="icon-sm" disabled={page >= meta.totalPages} onClick={() => setPage((p) => p + 1)}>
            <IconChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon-sm" disabled={page >= meta.totalPages} onClick={() => setPage(meta.totalPages)}>
            <IconChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
