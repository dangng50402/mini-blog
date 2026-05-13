
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "../lib/api";
import type { Post } from "../lib/types";

async function PostsList() {
  const posts = await getPosts(); 

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="group block bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all"
    >
      {/* Cover image — dùng picsum với post.id để ảnh consistent */}
      <div className="relative h-40 w-full bg-gray-100">
        <Image
          src={`https://picsum.photos/seed/${post.id}/600/300`}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

       <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-xs font-medium text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
            #{post.id}
          </span>
          <span className="text-xs text-gray-400">User {post.userId}</span>
        </div>
        <h2 className="font-semibold text-gray-900 capitalize mb-2 group-hover:text-indigo-700 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-3">{post.body}</p>
      </div>
    </Link>
  );
}


export default function PostsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tất cả bài viết</h1>
        <PostsList />
    </div>
  );
}