import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IconCopy, IconClock, IconRefresh } from "@tabler/icons-react";
import api from "@/lib/axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ClientGenerate() {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch domains
  const { data: domains } = useQuery({
    queryKey: ["client-domains"],
    queryFn: async () => {
      const { data } = await api.get("/domains", { params: { limit: 100 } });
      return data.data.items;
    },
  });

  // Generate email
  const generateMutation = useMutation({
    mutationFn: async (domain: string) => {
      const { data } = await api.post("/emails/generate", { domain });
      return data.data;
    },
    onSuccess: (data) => {
      setGeneratedEmail(data.address);
      setTimeLeft(data.expiresIn);
      startTimer();
      toast.success("Email generated");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to generate email");
    },
  });

  // Timer
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setGeneratedEmail("");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(generatedEmail);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="mt-4 space-y-4">
      <h2 className="text-2xl font-semibold text-ink-deep">Generate Email</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Generate Card */}
        <Card className="border-hairline">
          <CardHeader>
            <CardTitle className="text-base">New Address</CardTitle>
            <CardDescription>
              Select a domain and generate a temporary email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-charcoal">
                Domain
              </label>
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains?.map((d: any) => (
                    <SelectItem key={d.id} value={d.domain}>
                      {d.domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full"
              disabled={!selectedDomain || generateMutation.isPending}
              onClick={() => generateMutation.mutate(selectedDomain)}
            >
              {generateMutation.isPending ? "Generating..." : "Generate Email"}
            </Button>
          </CardContent>
        </Card>

        {/* Result Card */}
        <Card className="border-hairline">
          <CardHeader>
            <CardTitle className="text-base">Your Address</CardTitle>
            <CardDescription>
              {generatedEmail
                ? "Use this address to receive emails. Expires in 1 hour."
                : "Generate an address to get started."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedEmail ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm text-ink bg-surface px-3 py-2 rounded-md font-mono truncate">
                    {generatedEmail}
                  </code>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={copyAddress}
                  >
                    <IconCopy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <IconClock className="h-4 w-4" />
                  <span>Expires in {formatTime(timeLeft)}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => generateMutation.mutate(selectedDomain)}
                >
                  <IconRefresh className="h-4 w-4 mr-1" />
                  Generate New
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-24 text-muted">
                <p className="text-sm">No active address</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info */}
      <Card className="border-hairline">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">1h</p>
              <p className="text-sm text-steel">Auto-expire</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-green">∞</p>
              <p className="text-sm text-steel">Generate unlimited</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-teal">🔒</p>
              <p className="text-sm text-steel">No personal data</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
