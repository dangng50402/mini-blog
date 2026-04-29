"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6 group"
    >
      <span className="group-hover:-translate-x-1 transition-transform">←</span>
      Quay lại
    </button>
  );
}