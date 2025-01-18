'use client'// src/app/error.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  // useEffect(() => {
  //   console.error("Caught an error:", error);
  // }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <img src="error.png" alt=""  />
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-[#FB2E86] text-white rounded hover:bg-[#e20073]"
      >
        Go Back Home
      </button>
    </div>
  );
}
