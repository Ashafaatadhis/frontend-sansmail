import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Key } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { AnimatedThemeToggleButton } from "@/components/ui/animated-theme-toggle-button";
import api from "@/lib/axios";

const schema = z.object({
  licenseKey: z.string().min(1, "License key is required"),
});

type FormInput = z.infer<typeof schema>;

export default function ClientLogin() {
  const { setAuth, token, user } = useAuthStore();
  const navigate = useNavigate();
  const [showKey, setShowKey] = useState(false);

  if (token) {
    return (
      <Navigate to={user?.role === "ADMIN" ? "/admin" : "/room"} replace />
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormInput) => {
    try {
      const { data: res } = await api.post("/auth/client/login", data);
      setAuth(res.data.token, res.data.user, res.data.license?.id);
      navigate("/room");
    } catch (err: any) {
      setError("root", {
        message: err.response?.data?.message || "Invalid license key",
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex">
      <div className="fixed top-6 right-6 z-50">
        <AnimatedThemeToggleButton type="horizontal" />
      </div>

      {/* Left side - Hero */}
      <div className="flex-1 bg-gradient-to-br from-brand-navy via-primary-deep to-brand-teal flex items-center justify-center p-12 max-lg:hidden">
        <div className="text-on-primary max-w-lg">
          <h1 className="text-6xl font-bold mb-8 leading-tight">
            Your inbox,
            <br />
            your privacy.
          </h1>
          <p className="text-on-dark-muted text-lg">
            Access your temporary inbox with your license key. Emails
            auto-expire after 1 hour.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 bg-canvas flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-teal rounded-lg mb-4">
              <span className="text-xl text-on-primary font-bold">S</span>
            </div>
            <h2 className="text-3xl font-bold text-ink-deep mb-2">
              Client Access
            </h2>
            <p className="text-steel">Enter your license key to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {errors.root && (
              <div className="bg-error/10 border border-error/20 rounded-md p-3">
                <p className="text-error text-sm">{errors.root.message}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="licenseKey"
                className="block text-sm font-medium text-charcoal mb-2"
              >
                License Key
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  {...register("licenseKey")}
                  id="licenseKey"
                  type={showKey ? "text" : "password"}
                  placeholder="SMAIL-XXXX-XXXX-XXXX"
                  className="w-full h-11 pl-10 pr-10 bg-canvas border border-hairline-strong rounded-md text-ink font-mono placeholder:text-muted text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-ink transition-colors"
                >
                  {showKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.licenseKey && (
                <p className="text-error text-xs mt-1">
                  {errors.licenseKey.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-brand-teal text-on-primary rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Verifying..." : "Access Inbox"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
