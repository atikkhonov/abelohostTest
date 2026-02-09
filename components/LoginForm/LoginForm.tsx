"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import styles from "./LoginForm.module.scss";

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      errors.username = "Username is required";
    } else if (username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.trim().length < 3) {
      errors.password = "Password must be at least 3 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      await login(username.trim(), password);
      router.push("/");
    } catch (err) {
      // Error is handled by the store
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (validationErrors.username) {
                  setValidationErrors({
                    ...validationErrors,
                    username: undefined,
                  });
                }
              }}
              className={`${styles.input} ${
                validationErrors.username ? styles.inputError : ""
              }`}
              placeholder="Enter your username"
              disabled={isLoading}
            />
            {validationErrors.username && (
              <span className={styles.errorText}>
                {validationErrors.username}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (validationErrors.password) {
                  setValidationErrors({
                    ...validationErrors,
                    password: undefined,
                  });
                }
              }}
              className={`${styles.input} ${
                validationErrors.password ? styles.inputError : ""
              }`}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {validationErrors.password && (
              <span className={styles.errorText}>
                {validationErrors.password}
              </span>
            )}
          </div>

          {error && (
            <div className={styles.apiError}>
              <span className={styles.errorText}>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
