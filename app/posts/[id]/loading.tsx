export default function PostDetailLoading() {
    return (
      <article>
        {/* Header skeleton */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6 animate-pulse">
          {/* User */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-100 rounded" />
            </div>
          </div>
  
          {/* Title */}
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />
  
          {/* Content */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-5/6 bg-gray-100 rounded" />
            <div className="h-4 w-2/3 bg-gray-100 rounded" />
          </div>
  
          {/* Actions */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-4">
            <div className="h-8 w-20 bg-gray-200 rounded-full" />
            <div className="h-4 w-24 bg-gray-100 rounded" />
          </div>
        </div>
  
        {/* Comments skeleton */}
        <section>
          <div className="h-5 w-40 bg-gray-200 rounded mb-4 animate-pulse" />
  
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-4 space-y-2 animate-pulse"
              >
                <div className="flex justify-between">
                  <div className="h-4 w-40 bg-gray-200 rounded" />
                  <div className="h-3 w-24 bg-indigo-100 rounded" />
                </div>
  
                <div className="h-3 w-full bg-gray-100 rounded" />
                <div className="h-3 w-5/6 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </section>
      </article>
    );
  }
