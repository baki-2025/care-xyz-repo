"use client";
import { setUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    setUser({ email: "user@gmail.com" });
    router.push("/");
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}