export default function PostsLoading() {
    return (
      <div>
        <div className="h-9 w-48 bg-gray-200 rounded-lg animate-pulse mb-2" />
        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse mb-8" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
              <div className="flex justify-between">
                <div className="h-5 w-10 bg-indigo-100 rounded-full animate-pulse" />
                <div className="h-4 w-14 bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-5/6 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }