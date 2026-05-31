import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IconArrowLeft } from "@tabler/icons-react";
import api from "@/lib/axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import UserFormInner from "@/components/UserFormInner";

export default function UserForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/users/${id}`);
      return data.data;
    },
    enabled: isEdit,
  });

  return (
    <div className="mt-4">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => navigate("/admin/users")}
      >
        <IconArrowLeft className="h-4 w-4 mr-1" />
        Back to Users
      </Button>

      <Card className="border-hairline">
        <CardHeader>
          <CardTitle>{isEdit ? "Edit User" : "Create User"}</CardTitle>
          <CardDescription>
            {isEdit
              ? "Update user information below."
              : "Fill in the details to create a new user."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEdit && isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-surface rounded animate-pulse"
                />
              ))}
            </div>
          ) : (
            <UserFormInner key={user?.id ?? "new"} user={user} isEdit={isEdit} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
