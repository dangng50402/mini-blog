import Link from "next/link";

export default function Home(){
  return(
    <Link
        href="/posts"
        className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
      >
       đến danh sách bài viết
      </Link>
  )
}