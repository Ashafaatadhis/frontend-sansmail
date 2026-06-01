import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  IconMail,
  IconRefresh,
  IconSearch,
  IconAlertCircle,
} from "@tabler/icons-react";
import api from "@/lib/axios";
import socket from "@/lib/socket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedThemeToggleButton } from "@/components/ui/animated-theme-toggle-button";
import { BackgroundGrid } from "@/components/ui/background-grid";

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
  const [input, setInput] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const { data: domains = [] } = useQuery<string[]>({
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
        toast.success(`Email baru dari ${email.from}`);
      }
    });
    return () => {
      socket.emit("leave_inbox", address);
      socket.off("new_email");
      socket.disconnect();
    };
  }, [address]);

  const handleCheck = () => {
    setError("");
    const trimmed = input.trim().toLowerCase();

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setError("Format email tidak valid. Contoh: nama@sansmail.my.id");
      return;
    }

    // Ambil domain dari input
    const domain = trimmed.split("@")[1];

    // Cek domain terdaftar dan aktif
    if (!domains.includes(domain)) {
      setError(`Domain "${domain}" tidak terdaftar atau tidak aktif.`);
      return;
    }

    setAddress(trimmed);
    setSelectedEmail(null);
    setEmails([]);
  };

  const getBody = (email: Email) => {
    if (email.bodyHtml) return email.bodyHtml;
    if (email.bodyText)
      return `<pre style="white-space:pre-wrap">${email.bodyText}</pre>`;
    return "<p>No content</p>";
  };

  return (
    <div className="min-h-screen bg-canvas relative">
      <BackgroundGrid />
      {/* Header — bg solid supaya grid tidak tembus */}
      <header className="relative z-10 bg-canvas border-b border-hairline h-14 flex items-center justify-between px-6">
        <span className="text-lg font-semibold text-ink-deep">SansMail</span>
        <AnimatedThemeToggleButton type="horizontal" />
      </header>

      {/* Search */}
      <div className="relative z-10 max-w-2xl mx-auto pt-10 px-4">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-ink-deep mb-1">Cek Inbox</h1>
          <p className="text-sm text-steel">
            Masukkan alamat email untuk melihat inbox
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="nama@sansmail.my.id"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            className={`h-10 flex-1 font-mono text-sm bg-canvas ${error ? "border-red-400 focus-visible:ring-red-400" : ""}`}
          />
          <Button onClick={handleCheck} disabled={!input.trim()}>
            <IconSearch className="h-4 w-4 mr-1" />
            Cek
          </Button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-3 flex items-center gap-2 text-sm text-red-500">
            <IconAlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
      </div>

      {/* Inbox */}
      {address && (
        <div className="relative z-10 max-w-5xl mx-auto mt-8 px-4 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-base font-semibold text-ink-deep font-mono">
              {address}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => refetch()}
              className="h-7 w-7"
            >
              <IconRefresh className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="flex gap-4 h-[60vh] max-sm:flex-col max-sm:h-auto">
            {/* Email List */}
            <div className="w-80 shrink-0 max-sm:w-full">
              <Card className="border-hairline h-full max-sm:h-[40vh] bg-canvas">
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
                      <IconMail className="h-8 w-8 mb-2 opacity-40" />
                      <p className="text-sm">Belum ada email</p>
                      <p className="text-xs mt-1 text-stone">
                        Menunggu email masuk...
                      </p>
                    </div>
                  ) : (
                    emails.map((email) => (
                      <button
                        key={email.id}
                        onClick={() => setSelectedEmail(email)}
                        className={`w-full text-left px-4 py-3 border-b border-hairline hover:bg-surface-soft transition-colors ${selectedEmail?.id === email.id ? "bg-surface" : ""}`}
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
              <Card className="border-hairline h-full max-sm:h-[50vh] bg-canvas">
                <CardContent className="h-full">
                  {selectedEmail ? (
                    <div className="h-full flex flex-col">
                      <div className="pb-4 border-b border-hairline">
                        <h2 className="text-xl font-semibold text-ink-deep">
                          {selectedEmail.subject}
                        </h2>
                        <p className="text-sm text-steel mt-1">
                          Dari:{" "}
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
                        <p>Pilih email untuk dibaca</p>
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
