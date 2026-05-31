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
  IconTrash,
  IconPencil,
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

  if (current <= 3) {
    pages.push(1, 2, 3, 4, "...", total);
  } else if (current >= total - 2) {
    pages.push(1, "...", total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, "...", current - 1, current, current + 1, "...", total);
  }

  return pages;
}

export default function AdminUsers() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", debouncedSearch, page, limit],
    queryFn: async () => {
      const { data } = await api.get("/admin/users", {
        params: { search: debouncedSearch, page, limit },
      });
      return data.data;
    },
  });

  const users = data?.items ?? [];
  const meta = data?.meta ?? { total: 0, page: 1, totalPages: 1 };
  const pageNumbers = useMemo(() => getPageNumbers(page, meta.totalPages), [page, meta.totalPages]);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.delete(`/admin/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("User deleted successfully");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete user");
    },
  });

  const handleDelete = (user: any) => {
    toast(`Delete ${user.name}?`, {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: () => deleteMutation.mutate(user.id),
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  const handleLimitChange = (val: string) => {
    setLimit(Number(val));
    setPage(1);
  };

  return (
    <div className="mt-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-ink-deep">Users</h2>
        <Button onClick={() => navigate("/admin/users/create")} size="sm">
          <IconPlus className="h-4 w-4 mr-1" />
          Add User
        </Button>
      </div>

      {/* Search + Limit */}
      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 h-9"
          />
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
                <TableHead className="h-8 px-6 text-xs uppercase tracking-wider text-steel font-semibold">
                  Name
                </TableHead>
                <TableHead className="h-8 px-6 text-xs uppercase tracking-wider text-steel font-semibold">
                  Email
                </TableHead>
                <TableHead className="h-8 px-6 text-xs uppercase tracking-wider text-steel font-semibold">
                  Role
                </TableHead>
                <TableHead className="h-8 px-6 text-xs uppercase tracking-wider text-steel font-semibold text-center">
                  Licenses
                </TableHead>
                <TableHead className="h-8 px-6 text-xs uppercase tracking-wider text-steel font-semibold">
                  Created
                </TableHead>
                <TableHead className="h-8 w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: limit }).map((_, i) => (
                  <TableRow key={i} className="border-hairline">
                    <TableCell colSpan={6} className="px-6 py-2">
                      <div className="h-4 bg-surface rounded animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-20 text-center text-muted"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: any) => (
                  <TableRow
                    key={user.id}
                    className="border-hairline hover:bg-surface-soft"
                  >
                    <TableCell className="px-6 py-2 font-medium text-ink text-sm">
                      {user.name}
                    </TableCell>
                    <TableCell className="px-6 py-2 text-slate text-sm">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-6 py-2">
                      <Badge
                        variant={
                          user.role === "ADMIN" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-3 py-2 text-center text-slate text-sm">
                      {user.licenses?.length ?? 0}
                    </TableCell>
                    <TableCell className="px-3 py-2 text-muted text-sm">
                      {new Date(user.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="px-2 py-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-xs">
                            <IconDotsVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(`/admin/users/${user.id}/edit`)
                            }
                          >
                            <IconPencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-error focus:text-error"
                            onClick={() => handleDelete(user)}
                          >
                            <IconTrash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
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
          {Math.min(page * limit, meta.total)} of {meta.total} users
        </p>
        <div className="flex items-center gap-1">
          {/* First */}
          <Button
            variant="outline"
            size="icon-sm"
            disabled={page <= 1}
            onClick={() => setPage(1)}
          >
            <IconChevronsLeft className="h-4 w-4" />
          </Button>
          {/* Prev */}
          <Button
            variant="outline"
            size="icon-sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <IconChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page numbers */}
          {pageNumbers.map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="px-1 text-steel text-sm">
                ...
              </span>
            ) : (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                size="icon-sm"
                onClick={() => setPage(p as number)}
              >
                {p}
              </Button>
            )
          )}

          {/* Next */}
          <Button
            variant="outline"
            size="icon-sm"
            disabled={page >= meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <IconChevronRight className="h-4 w-4" />
          </Button>
          {/* Last */}
          <Button
            variant="outline"
            size="icon-sm"
            disabled={page >= meta.totalPages}
            onClick={() => setPage(meta.totalPages)}
          >
            <IconChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
