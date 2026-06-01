export function SkeletonBlock({ className = "" }) {
  return <div className={`animate-pulse bg-white/5 rounded ${className}`} />;
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center px-6 pt-24">
      <div className="max-w-6xl mx-auto space-y-6">
        <SkeletonBlock className="w-40 h-4" />
        <SkeletonBlock className="w-3/4 h-16" />
        <SkeletonBlock className="w-1/2 h-8" />
        <SkeletonBlock className="w-96 h-6" />
        <div className="flex gap-4">
          <SkeletonBlock className="w-36 h-12" />
          <SkeletonBlock className="w-36 h-12" />
        </div>
      </div>
    </div>
  );
}
