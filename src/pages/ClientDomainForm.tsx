import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IconArrowLeft } from "@tabler/icons-react";
import api from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ClientDomainForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [domainsText, setDomainsText] = useState("");

  const addMutation = useMutation({
    mutationFn: async (text: string) => {
      const list = text
        .split("\n")
        .map((d) => d.trim().toLowerCase())
        .filter((d) => d.length > 0);
      if (list.length === 0) throw new Error("No domains provided");
      return api.post("/domains", { domains: list });
    },
    onSuccess: (res) => {
      toast.success(res.data.message || "Domains added");
      queryClient.invalidateQueries({ queryKey: ["client-domains"] });
      navigate("/room/domains");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || "Failed to add domains");
    },
  });

  return (
    <div className="mt-4">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => navigate("/room/domains")}
      >
        <IconArrowLeft className="h-4 w-4 mr-1" />
        Back to Domains
      </Button>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-hairline">
          <CardHeader>
            <CardTitle>Add Custom Domains</CardTitle>
            <CardDescription>Enter one domain per line.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Domains</Label>
              <textarea
                value={domainsText}
                onChange={(e) => setDomainsText(e.target.value)}
                placeholder={"mydomain.com\nanotherdomain.com\nexample.net"}
                rows={6}
                className="w-full px-3 py-2 bg-canvas border border-hairline-strong rounded-md text-ink placeholder:text-muted text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors font-mono resize-none"
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => addMutation.mutate(domainsText)}
                disabled={!domainsText.trim() || addMutation.isPending}
              >
                {addMutation.isPending ? "Adding..." : "Add Domains"}
              </Button>
              <Button variant="outline" onClick={() => navigate("/room/domains")}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-hairline">
          <CardHeader>
            <CardTitle className="text-base">DNS Setup Required</CardTitle>
            <CardDescription>Configure these records before adding domains.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-surface rounded-md p-4 font-mono text-xs space-y-2 text-ink">
              <p>A record: <span className="text-primary">mail.yourdomain.com</span> → <span className="text-brand-green">103.123.18.59</span></p>
              <p>MX record: <span className="text-primary">@</span> → <span className="text-brand-green">mail.yourdomain.com</span> (priority 10)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
