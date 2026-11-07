import { RegisterFormData, LoginFormData, AuthResponse, SocialProvider } from "@/types/auth";

/**
 * Serviço de Autenticação preparado para integração futura com banco de dados
 * e provedores OAuth (Google, GitHub).
 *
 * Atualmente implementado com simulação assíncrona para validação de UI e fluxos.
 */
class AuthService {
  /**
   * Registro de novo usuário com dados completos
   */
  async register(data: RegisterFormData): Promise<AuthResponse> {
    // Simulação de latência de rede
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Aqui será inserida a chamada real: ex: await fetch('/api/auth/register', ...)
    return {
      success: true,
      message: `Conta criada com sucesso para ${data.firstName}!`,
      user: {
        id: "usr_" + Math.random().toString(36).substring(2, 9),
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
      },
    };
  }

  /**
   * Autenticação via E-mail e Senha
   */
  async login(data: LoginFormData): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Login realizado com sucesso!",
      user: {
        id: "usr_mock_123",
        name: "Usuário",
        email: data.email,
      },
    };
  }

  /**
   * Autenticação com provedores sociais (Google / GitHub)
   */
  async socialAuth(provider: SocialProvider): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Em produção, redirecionará para OAuth provider ou chamará NextAuth signIn(provider)
    return {
      success: true,
      message: `Autenticação com ${provider === "google" ? "Google" : "GitHub"} iniciada.`,
    };
  }
}

export const authService = new AuthService();
