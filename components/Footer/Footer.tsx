"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import styles from "./Footer.module.scss";

export default function Footer() {
  const { user, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          {currentYear}
          {mounted && isAuthenticated && user && (
            <span className={styles.userEmail}> Logged as {user.email}</span>
          )}
        </p>
      </div>
    </footer>
  );
}
