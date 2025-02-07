"use client";
import { useState } from "react";
import { loginUser } from "@/utils/auth";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await loginUser(email, password);
      console.log("Logged in:", user);
      window.location.href = "/profile";
    } catch (err:any) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">Or login with:</p>
          <button
            onClick={() => signIn("google")}
            className="w-full bg-red-500 text-white p-2 rounded mt-2"
          >
            Google Login
          </button>
          <button
            onClick={() => signIn("facebook")}
            className="w-full bg-blue-700 text-white p-2 rounded mt-2"
          >
            Facebook Login
          </button>
        </div>

        <p className="text-sm text-center mt-4">
          Don't have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  );
}
