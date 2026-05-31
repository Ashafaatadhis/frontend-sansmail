import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import api from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const licenseSchema = z.object({
  userId: z.string().min(1, "User is required"),
  expiresAt: z.string().optional(),
});

type LicenseFormData = z.infer<typeof licenseSchema>;

export default function LicenseFormInner() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: usersData } = useQuery({
    queryKey: ["admin-users-all"],
    queryFn: async () => {
      const { data } = await api.get("/admin/users", { params: { limit: 100 } });
      return data.data.items;
    },
  });

  const users = usersData ?? [];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LicenseFormData>({
    resolver: zodResolver(licenseSchema),
    defaultValues: { userId: "", expiresAt: "" },
  });

  const createMutation = useMutation({
    mutationFn: (data: LicenseFormData) => {
      const payload: any = { userId: data.userId };
      if (data.expiresAt) payload.expiresAt = data.expiresAt;
      return api.post("/admin/licenses", payload);
    },
    onSuccess: () => {
      toast.success("License created successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-licenses"] });
      navigate("/admin/licenses");
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Failed to create license"),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => createMutation.mutate(data))}
      className="space-y-5"
    >
      <div className="space-y-1.5">
        <Label>User</Label>
        <Select
          value={watch("userId")}
          onValueChange={(val) => setValue("userId", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user: any) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name} ({user.email})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.userId && (
          <p className="text-error text-xs">{errors.userId.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="expiresAt">Expires At (optional)</Label>
        <Input id="expiresAt" type="datetime-local" {...register("expiresAt")} />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating..." : "Generate License"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/licenses")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
