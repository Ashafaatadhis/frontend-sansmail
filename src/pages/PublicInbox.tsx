import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { IconMail, IconSearch, IconRefresh } from "@tabler/icons-react";
import api from "@/lib/axios";
import socket from "@/lib/socket";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedThemeToggleButton } from "@/components/ui/animated-theme-toggle-button";

type Email = {
  id: string;
  to: string;
  from: string;
  subject: string;
  bodyText?: string;
  bodyHtml?: string;
  received: string;
};

export default function PublicInbox() {
  const [domain, setDomain] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const { data: domains } = useQuery({
    queryKey: ["public-domains"],
    queryFn: async () => {
      const { data } = await api.get("/public/domains");
      return data.data;
    },
  });

  const {
    data: inboxData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["public-inbox", address],
    queryFn: async () => {
      const { data } = await api.get(`/public/inbox/${address}`);
      return data.data;
    },
    enabled: !!address,
  });

  useEffect(() => {
    if (inboxData) setEmails(inboxData);
  }, [inboxData]);

  useEffect(() => {
    if (!address) return;

    socket.connect();
    socket.emit("join_inbox", address);

    socket.on("new_email", (email: Email) => {
      if (email.to === address) {
        setEmails((prev) => [email, ...prev]);
        toast.success(`New email from ${email.from}`);
      }
    });

    return () => {
      socket.emit("leave_inbox", address);
      socket.off("new_email");
      socket.disconnect();
    };
  }, [address]);

  const handleCheck = () => {
    if (!domain || !username.trim()) {
      toast.error("Select domain and enter username");
      return;
    }
    const fullAddress = `${username.trim().toLowerCase()}@${domain}`;
    setAddress(fullAddress);
    setSelectedEmail(null);
    setEmails([]);
  };

  const getBody = (email: Email) => {
    if (email.bodyHtml) return email.bodyHtml;
    if (email.bodyText) return `<pre>${email.bodyText}</pre>`;
    return "<p>No content</p>";
  };

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="border-b border-hairline h-14 flex items-center justify-between px-6">
        <span className="text-lg font-semibold text-ink-deep">SansMail</span>
        <AnimatedThemeToggleButton type="horizontal" />
      </header>

      {/* Search Bar */}
      <div className="max-w-5xl mx-auto pt-8 px-4">
        <Card className="border-hairline">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-ink-deep mb-4">
              Check Inbox
            </h2>
            <div className="flex gap-3 max-sm:flex-col">
              <div className="flex-1">
                <Input
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-10"
                  onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                />
              </div>
              <span className="flex items-center text-steel text-lg">@</span>
              <div className="flex-1">
                <Select value={domain} onValueChange={setDomain}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains?.map((d: string) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleCheck}
                disabled={!domain || !username.trim()}
              >
                <IconSearch className="h-4 w-4 mr-1" />
                Check
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      {address && (
        <div className="max-w-5xl mx-auto mt-6 px-4 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-lg font-semibold text-ink-deep font-mono">
              {address}
            </h3>
            <Button variant="ghost" size="icon-sm" onClick={() => refetch()}>
              <IconRefresh className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-4 h-[60vh] max-sm:flex-col max-sm:h-auto">
            {/* Email List */}
            <div className="w-80 shrink-0 max-sm:w-full">
              <Card className="border-hairline h-full max-sm:h-[40vh]">
                <CardContent className="p-0 h-full overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 space-y-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-14 bg-surface rounded animate-pulse"
                        />
                      ))}
                    </div>
                  ) : emails.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted">
                      <IconMail className="h-8 w-8 mb-2 opacity-50" />
                      <p className="text-sm">No emails yet</p>
                      <p className="text-xs mt-1">
                        Waiting for incoming mail...
                      </p>
                    </div>
                  ) : (
                    emails.map((email) => (
                      <button
                        key={email.id}
                        onClick={() => setSelectedEmail(email)}
                        className={`w-full text-left px-4 py-3 border-b border-hairline hover:bg-surface-soft transition-colors ${
                          selectedEmail?.id === email.id ? "bg-surface" : ""
                        }`}
                      >
                        <p className="text-sm font-medium text-ink truncate">
                          {email.subject}
                        </p>
                        <p className="text-xs text-steel truncate">
                          {email.from}
                        </p>
                        <p className="text-xs text-muted mt-0.5">
                          {new Date(email.received).toLocaleTimeString()}
                        </p>
                      </button>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Email Content */}
            <div className="flex-1 min-w-0">
              <Card className="border-hairline h-full max-sm:h-[50vh]">
                <CardContent className="h-full">
                  {selectedEmail ? (
                    <div className="h-full flex flex-col">
                      <div className="pb-4 border-b border-hairline">
                        <h2 className="text-xl font-semibold text-ink-deep">
                          {selectedEmail.subject}
                        </h2>
                        <p className="text-sm text-steel mt-1">
                          From:{" "}
                          <span className="text-ink">{selectedEmail.from}</span>
                        </p>
                        <p className="text-xs text-muted mt-1">
                          {new Date(selectedEmail.received).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex-1 pt-4 overflow-y-auto">
                        <div
                          className="text-sm text-ink leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: getBody(selectedEmail),
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted">
                      <div className="text-center">
                        <IconMail className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p>Select an email to read</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
