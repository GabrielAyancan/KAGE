"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, CheckCircle2 } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { RegisterFormData, FormErrors, SocialProvider } from "@/types/auth";
import { authService } from "@/services/authService";
import { supabase } from "@/lib/supabase";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Nome é obrigatório";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Sobrenome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Insira um endereço de e-mail válido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve conter pelo menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof RegisterFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrors({});

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });

      if (error) {
        console.error("Erro no cadastro Supabase:", error);
        setErrors({
          general:
            error.message ||
            "Ocorreu um erro ao realizar seu cadastro. Verifique os dados e tente novamente.",
        });
        return;
      }

      console.log("Cadastro realizado com sucesso via Supabase:", data);
      setSuccessMessage("Conta criada com sucesso! Redirecionando...");
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      console.error("Erro inesperado no cadastro:", err);
      setErrors({
        general:
          "Ocorreu um erro inesperado ao processar seu cadastro. Tente novamente.",
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
          Crie sua conta
        </h2>
        <p className="mt-1.5 text-sm text-neutral-500">
          Preencha seus dados para começar.
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
            ou preencha com seus dados
          </span>
        </div>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Name and Surname side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <InputField
            id="register-first-name"
            label="Nome"
            placeholder="Ex: João"
            value={formData.firstName}
            onChange={handleChange("firstName")}
            error={errors.firstName}
            leftIcon={<User className="w-4 h-4" />}
            autoComplete="given-name"
            required
          />

          <InputField
            id="register-last-name"
            label="Sobrenome"
            placeholder="Ex: Silva"
            value={formData.lastName}
            onChange={handleChange("lastName")}
            error={errors.lastName}
            autoComplete="family-name"
            required
          />
        </div>

        {/* E-mail */}
        <InputField
          id="register-email"
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
        <InputField
          id="register-password"
          label="Senha"
          isPassword
          placeholder="Mínimo de 6 caracteres"
          value={formData.password}
          onChange={handleChange("password")}
          error={errors.password}
          leftIcon={<Lock className="w-4 h-4" />}
          autoComplete="new-password"
          required
        />

        {/* Confirmar senha */}
        <InputField
          id="register-confirm-password"
          label="Confirmar senha"
          isPassword
          placeholder="Repita sua senha"
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          error={errors.confirmPassword}
          leftIcon={<Lock className="w-4 h-4" />}
          autoComplete="new-password"
          required
        />

        {/* Submit button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isSubmitting}
          >
            Criar conta
          </Button>
        </div>
      </form>

      {/* Footer Switch */}
      <div className="mt-6 text-center text-xs text-neutral-500">
        <span>Já possui uma conta? </span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-semibold text-neutral-900 hover:underline focus:outline-none focus:ring-2 focus:ring-neutral-400 rounded px-1 transition-all"
        >
          Entre aqui
        </button>
      </div>

      {/* Terms and Privacy policy notice */}
      <p className="mt-6 text-[11px] text-center text-neutral-400 leading-relaxed">
        Ao continuar, você concorda com os nossos{" "}
        <a href="#termos" className="text-neutral-500 hover:underline">
          Termos de Serviço
        </a>{" "}
        e{" "}
        <a href="#privacidade" className="text-neutral-500 hover:underline">
          Política de Privacidade
        </a>
        .
      </p>
    </div>
  );
};
