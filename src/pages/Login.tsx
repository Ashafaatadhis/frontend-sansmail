import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { AnimatedThemeToggleButton } from "@/components/ui/animated-theme-toggle-button";
import api from "@/lib/axios";
import { adminLoginSchema, type AdminLoginInput } from "@/schemas/auth.schema";

export default function Login() {
  const { setAuth, token } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  if (token) {
    return <Navigate to="/admin" replace />;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data: AdminLoginInput) => {
    try {
      const { data: res } = await api.post("/auth/login", data);
      setAuth(res.data.token, res.data.user);
      navigate("/admin");
    } catch (err: any) {
      setError("root", {
        message: err.response?.data?.message || "Login failed",
      });
      setValue("password", "");
    }
  };

  return (
    <div className="w-full min-h-screen flex">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <AnimatedThemeToggleButton type="horizontal" />
      </div>

      {/* Left side - Hero */}
      <div className="flex-1 bg-gradient-to-br from-brand-navy via-primary-deep to-primary flex items-center justify-center p-12 max-lg:hidden">
        <div className="text-on-primary max-w-lg">
          <h1 className="text-6xl font-bold mb-8 leading-tight">
            Temporary email,
            <br />
            zero commitment.
          </h1>
          <p className="text-on-dark-muted text-lg">
            Generate disposable email addresses instantly. Protect your privacy
            with SansMail.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 bg-canvas flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
              <span className="text-xl text-on-primary font-bold">S</span>
            </div>
            <h2 className="text-3xl font-bold text-ink-deep mb-2">
              Welcome Back
            </h2>
            <p className="text-steel">Sign in to your admin account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Server Error */}
            {errors.root && (
              <div className="bg-error/10 border border-error/20 rounded-md p-3">
                <p className="text-error text-sm">{errors.root.message}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-charcoal mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="admin@sansmail.my.id"
                  className="w-full h-11 pl-10 pr-3 bg-canvas border border-hairline-strong rounded-md text-ink placeholder:text-muted text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                />
              </div>
              {errors.email && (
                <p className="text-error text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-charcoal mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-10 bg-canvas border border-hairline-strong rounded-md text-ink placeholder:text-muted text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-ink transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-error text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-primary text-on-primary rounded-md text-sm font-medium hover:bg-primary-pressed disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-steel text-sm mt-6">
            Client?{" "}
            <button
              onClick={() => navigate("/access")}
              className="text-link-blue hover:text-link-blue-pressed font-medium transition-colors"
            >
              Sign in with license key
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
