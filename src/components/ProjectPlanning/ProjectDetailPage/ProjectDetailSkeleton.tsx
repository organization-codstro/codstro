export const ProjectDetailSkeleton = () => {
  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header 스켈레톤 */}
      <div className="px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-48 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex space-x-2">
            <div className="w-20 bg-gray-200 rounded-lg h-9 animate-pulse" />
            <div className="w-20 bg-gray-200 rounded-lg h-9 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="p-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 좌측 메인 */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Info 스켈레톤 */}
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="w-32 h-5 mb-4 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i}>
                    <div className="w-20 h-4 mb-2 bg-gray-200 rounded animate-pulse" />
                    <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Pages 스켈레톤 */}
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="h-5 mb-4 bg-gray-200 rounded w-28 animate-pulse" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full bg-gray-200 rounded-lg h-14 animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 우측 사이드바 스켈레톤 */}
          <div className="space-y-4">
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="w-24 h-5 mb-4 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full h-24 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-full h-24 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
