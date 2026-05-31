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
import DomainFormInner from "@/components/DomainFormInner";

export default function DomainForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const { data: domain, isLoading } = useQuery({
    queryKey: ["admin-domain", id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/domains/${id}`);
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
        onClick={() => navigate("/admin/domains")}
      >
        <IconArrowLeft className="h-4 w-4 mr-1" />
        Back to Domains
      </Button>

      <Card className="border-hairline">
        <CardHeader>
          <CardTitle>{isEdit ? "Edit Domain" : "Add Domain"}</CardTitle>
          <CardDescription>
            {isEdit
              ? "Update domain information below."
              : "Add a new domain to the system."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEdit && isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-surface rounded animate-pulse"
                />
              ))}
            </div>
          ) : (
            <DomainFormInner
              key={domain?.id ?? "new"}
              domain={domain}
              isEdit={isEdit}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
