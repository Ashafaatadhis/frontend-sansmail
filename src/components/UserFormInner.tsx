import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import api from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters").optional().or(z.literal("")),
  role: z.enum(["ADMIN", "CLIENT"]),
});

export type UserFormData = z.infer<typeof userSchema>;

type Props = {
  user?: any;
  isEdit: boolean;
};

export default function UserFormInner({ user, isEdit }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      password: "",
      role: user?.role ?? "CLIENT",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: UserFormData) => api.post("/admin/users", data),
    onSuccess: () => {
      toast.success("User created successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      navigate("/admin/users");
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Failed to create user"),
  });

  const updateMutation = useMutation({
    mutationFn: (data: UserFormData) => {
      const payload: any = {
        name: data.name,
        email: data.email,
        role: data.role,
      };
      if (data.password) payload.password = data.password;
      return api.patch(`/admin/users/${user.id}`, payload);
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      navigate("/admin/users");
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Failed to update user"),
  });

  const onSubmit = (data: UserFormData) => {
    isEdit ? updateMutation.mutate(data) : createMutation.mutate(data);
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter name" {...register("name")} />
        {errors.name && (
          <p className="text-error text-xs">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-error text-xs">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">
          Password {isEdit && "(leave empty to keep current)"}
        </Label>
        <Input
          id="password"
          type="password"
          placeholder={
            isEdit ? "Leave empty to keep current" : "Enter password"
          }
          {...register("password")}
        />
        {errors.password && (
          <p className="text-error text-xs">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Role</Label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLIENT">Client</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.role && (
          <p className="text-error text-xs">{errors.role.message}</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? isEdit
              ? "Saving..."
              : "Creating..."
            : isEdit
              ? "Save Changes"
              : "Create User"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/users")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
