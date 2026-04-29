"use client";

import { useEffect } from "react";

export default function PostsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Có lỗi xảy ra</h2>
      <p className="text-gray-500 text-sm mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
      >
        Thử lại
      </button>
    </div>
  );
}