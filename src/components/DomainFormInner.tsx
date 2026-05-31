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

const domainSchema = z.object({
  domain: z.string().min(1, "Domain is required"),
  type: z.enum(["SHARED", "CUSTOM"]),
});

type DomainFormData = z.infer<typeof domainSchema>;

type Props = {
  domain?: any;
  isEdit: boolean;
};

export default function DomainFormInner({ domain, isEdit }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DomainFormData>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      domain: domain?.domain ?? "",
      type: domain?.type ?? "SHARED",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: DomainFormData) => api.post("/admin/domains", data),
    onSuccess: () => {
      toast.success("Domain added successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-domains"] });
      navigate("/admin/domains");
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Failed to add domain"),
  });

  const updateMutation = useMutation({
    mutationFn: (data: DomainFormData) =>
      api.patch(`/admin/domains/${domain.id}`, data),
    onSuccess: () => {
      toast.success("Domain updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-domains"] });
      navigate("/admin/domains");
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Failed to update domain"),
  });

  const onSubmit = (data: DomainFormData) => {
    isEdit ? updateMutation.mutate(data) : createMutation.mutate(data);
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="domain">Domain</Label>
        <Input
          id="domain"
          placeholder="e.g. sansmail.my.id"
          {...register("domain")}
        />
        {errors.domain && (
          <p className="text-error text-xs">{errors.domain.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Type</Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SHARED">
                  Shared — available to all licenses
                </SelectItem>
                <SelectItem value="CUSTOM">
                  Custom — specific to one license
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && (
          <p className="text-error text-xs">{errors.type.message}</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? isEdit
              ? "Saving..."
              : "Adding..."
            : isEdit
              ? "Save Changes"
              : "Add Domain"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/domains")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
