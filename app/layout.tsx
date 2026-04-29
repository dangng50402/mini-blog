import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Blog",
  description: "Blog reader powered by JSONPlaceholder",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-800">
              📖 MiniBlog
            </Link>
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Home
              </Link>
              <Link href="/posts" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Posts
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          {children}
        </main>

        <footer className="border-t border-gray-200 bg-white mt-auto">
          <div className="max-w-4xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
            Data from{" "}
            <a href="https://jsonplaceholder.typicode.com" className="text-indigo-500 hover:underline" target="_blank">
              JSONPlaceholder
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}