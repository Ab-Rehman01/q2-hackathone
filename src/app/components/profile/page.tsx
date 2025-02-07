"use client";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/utils/auth";

type User = {
  username: string;
  email: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserProfile(token)
        .then((profile: User) => setUser(profile)) // ✅ Explicitly typed User
        .catch((error: unknown) => console.error("Error fetching profile:", error)); // ✅ Typed error as unknown
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold">Profile</h2>
        {user ? (
          <>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
