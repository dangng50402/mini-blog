"use client";

import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  function handleLike() {
    if (liked) {
      setLikes((prev) => prev - 1);
      setLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setLiked(true);
    }
  }

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        liked
          ? "bg-red-100 text-red-600 border border-red-200"
          : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-500"
      }`}
    >
      {liked ? "❤️" : "🤍"} {likes > 0 ? likes : ""} Thích
    </button>
  );
}