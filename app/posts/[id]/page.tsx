
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, getComments, getUser } from "@/app/lib/api";
import type { Comment } from "@/app/lib/types";
import LikeButton from "@/app/components/LikeButton";
import BackButton from "@/app/components/BackButton";
import Image from "next/image";

type Props = { params: Promise<{ id: string }> };

// ─── generateStaticParams ────────────────────────────────────────────────────
// Pre-render 20 bài đầu tiên lúc build time
export async function generateStaticParams() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=20")
    .then((r) => r.json());

  return posts.map((post: { id: number }) => ({
    id: String(post.id),
  }));
}

// ─── generateMetadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return { title: "Bài viết không tồn tại — MiniBlog" };
  }

  // Capitalize first letter
  const title = post.title.charAt(0).toUpperCase() + post.title.slice(1);

  return {
    title: `${title} — MiniBlog`,
    description: post.body.slice(0, 120),
  };
}

// ─── Sub-components cho Suspense granular ────────────────────────────────────

async function PostBody({ id }: { id: string }) {
  const post = await getPost(id);
  if (!post) notFound()

  const user = await getUser(post.userId);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
      {/* Hero image — priority vì đây là ảnh LCP, above-the-fold */}
      <div className="relative h-56 w-full bg-gray-100">
        <Image
          src={`https://picsum.photos/seed/${post.id}/1200/400`}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority  // ← above-the-fold, ảnh LCP
        />
      </div>

      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          {/* Avatar — width/height cố định, biết trước kích thước */}
          <Image
            src={`https://i.pravatar.cc/40?u=${user.id}`}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-400">@{user.username}</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 capitalize mb-4">
          {post.title}
        </h1>
        <p className="text-gray-600 leading-relaxed">{post.body}</p>

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-4">
          <LikeButton />
        </div>
      </div>
    </div>
  );
}

async function CommentsList({ id }: { id: string }) {
  const comments = await getComments(id);

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Bình luận ({comments.length})
      </h2>
      <div className="space-y-3">
        {comments.map((comment: Comment) => (
          <div key={comment.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-sm text-gray-900">{comment.name}</p>
              <a
                href={`mailto:${comment.email}`}
                className="text-xs text-indigo-400 hover:underline"
              >
                {comment.email}
              </a>
            </div>
            <p className="text-sm text-gray-600">{comment.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}



// ─── Page ────────────────────────────────────────────────────────────────────

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;

  if (isNaN(Number(id))) notFound();

  return (
    <article>
      <BackButton />
      {/* Post body + user: stream riêng */}
        <PostBody id={id} />
      {/* Comments: stream riêng, không block PostBody */}
        <CommentsList id={id} />
    </article>
  );
}