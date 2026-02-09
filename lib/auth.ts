import apiClient from "./api";
import type { LoginResponse, User } from "@/types";

export const authService = {
  async login(username: string, password: string): Promise<User> {
    try {
      const response = await apiClient.post<LoginResponse>("/auth/login", {
        username,
        password,
      });

      const user: User = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        gender: response.data.gender,
        image: response.data.image,
        token: response.data.token,
      };

      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        const apiError = error.response.data as { message: string };
        throw new Error(apiError.message || "Invalid credentials");
      }
      throw new Error("Login failed. Please try again.");
    }
  },

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  getStoredUser(): User | null {
    if (typeof window === "undefined") return null;

    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },
};
