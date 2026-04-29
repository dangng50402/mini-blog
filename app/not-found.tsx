import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-gray-500 mb-8">Bài viết này không tồn tại</p>
      <Link
        href="/posts"
        className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
      >
        ← Về danh sách bài viết
      </Link>
    </div>
  );
}