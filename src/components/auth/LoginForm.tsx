"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, CheckCircle2 } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { LoginFormData, FormErrors, SocialProvider } from "@/types/auth";
import { authService } from "@/services/authService";
import { supabase } from "@/lib/supabase";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Insira um endereço de e-mail válido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field as keyof FormErrors]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrors({});

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error("Erro no login Supabase:", error);
        setErrors({
          general: "Credenciais inválidas. Verifique seu e-mail e senha.",
        });
        return;
      }

      console.log("Login realizado com sucesso via Supabase:", data);
      setSuccessMessage("Login realizado com sucesso! Redirecionando...");
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      console.error("Erro inesperado no login:", err);
      setErrors({
        general: "Ocorreu um erro ao processar seu login. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialAuth = async (provider: SocialProvider) => {
    setSocialLoading(true);
    try {
      const res = await authService.socialAuth(provider);
      setSuccessMessage(res.message || "Redirecionando...");
    } finally {
      setSocialLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto flex flex-col">
      {/* Header section */}
      <div className="mb-7">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
          Acesse sua conta
        </h2>
        <p className="mt-1.5 text-sm text-neutral-500">
          Entre com suas credenciais para continuar.
        </p>
      </div>

      {/* Success notification banner */}
      {successMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-2.5 text-emerald-800 text-xs font-medium animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* General error banner */}
      {errors.general && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200/80 text-red-700 text-xs font-medium animate-in fade-in slide-in-from-top-2">
          {errors.general}
        </div>
      )}

      {/* Social Providers */}
      <div className="space-y-4 mb-6">
        <SocialAuthButtons onSelect={handleSocialAuth} isLoading={socialLoading} />

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-neutral-200/70" />
          <span className="absolute bg-white px-3 text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
            ou acesse com e-mail
          </span>
        </div>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* E-mail */}
        <InputField
          id="login-email"
          label="E-mail"
          type="email"
          placeholder="nome@exemplo.com"
          value={formData.email}
          onChange={handleChange("email")}
          error={errors.email}
          leftIcon={<Mail className="w-4 h-4" />}
          autoComplete="email"
          required
        />

        {/* Senha */}
        <div>
          <InputField
            id="login-password"
            label="Senha"
            isPassword
            placeholder="Sua senha secreta"
            value={formData.password}
            onChange={handleChange("password")}
            error={errors.password}
            leftIcon={<Lock className="w-4 h-4" />}
            autoComplete="current-password"
            required
          />

          <div className="flex items-center justify-between mt-2.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange("rememberMe")}
                className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-xs text-neutral-600">Lembrar de mim</span>
            </label>

            <a
              href="#recuperar-senha"
              className="text-xs text-neutral-600 hover:text-neutral-900 hover:underline transition-colors"
            >
              Esqueceu a senha?
            </a>
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </div>
      </form>

      {/* Footer Switch */}
      <div className="mt-6 text-center text-xs text-neutral-500">
        <span>Ainda não possui uma conta? </span>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-semibold text-neutral-900 hover:underline focus:outline-none focus:ring-2 focus:ring-neutral-400 rounded px-1 transition-all"
        >
          Crie agora
        </button>
      </div>
    </div>
  );
};
