"use client";

import { useSession } from "next-auth/react";

export default function ProfileClient() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="mt-6">Loading...</p>;
  }

  if (!session) {
    return <p className="mt-6">Not logged in</p>;
  }

  return (
    <div className="py-6 pb-20">
      <h1 className="text-xl font-semibold">Profile</h1>

      <div className="mt-6 bg-white p-4 rounded-lg border">
        <p>
          <strong>Name:</strong> {session.user?.name}
        </p>
        <p>
          <strong>Phone:</strong> {session.user?.phone}
        </p>
      </div>
    </div>
  );
}
