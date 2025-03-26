import { User } from "@/models";
import { useAuthStore } from "@/store/auth.store";
import { getHeaders } from "@/utils/get-headers";

interface RegisterProps {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);
  const error = useAuthStore((state) => state.error);

  const loginStore = useAuthStore((state) => state.login);
  const logoutStore = useAuthStore((state) => state.logout);
  const checkAuthStore = useAuthStore((state) => state.checkAuth);
  // const clearErrorStore = useAuthStore((state) => state.clearError);

  const register = async ({
    name,
    lastName,
    email,
    password,
  }: RegisterProps) => {
    checkAuthStore();
    const { ok, user, jwt, error } = await fetch("/api/auth/register", {
      method: "POST",
      headers: { ...getHeaders() },
      body: JSON.stringify({ name, lastName, email, password }),
    }).then((res) => res.json());

    setStatus(ok, user, jwt, error);
  };

  const login = async (email: string, password: string) => {
    checkAuthStore();

    const { ok, user, jwt, error } = await fetch("/api/auth/login", {
      method: "POST",
      headers: { ...getHeaders() },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

    setStatus(ok, user, jwt, error);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logoutStore();
  };

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) return logout();
  };

  const setStatus = (
    status: boolean,
    user: User,
    jwt: string,
    error: string,
  ) => {
    if (status) {
      loginStore(user);
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      logoutStore(error);
      setTimeout(() => {
        logoutStore();
      }, 3000);
    }
  };

  return { status, user, error, register, login, logout, checkAuth };
};
