"use client";
import { setUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const handleRegister = () => {
    setUser({ email: "newuser@gmail.com" });
    router.push("/");
  };

  return (
    <div>
      <h1>Register</h1>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}