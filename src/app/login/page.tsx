"use client";

import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#090A0A" }}>
      <LoginForm />
    </main>
  );
}