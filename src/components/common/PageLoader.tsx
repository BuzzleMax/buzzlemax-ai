export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="glass flex w-full max-w-md items-center gap-4 rounded-3xl border-white/15 px-6 py-5 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)]">
        <div className="h-3 w-3 animate-pulse rounded-full bg-primary" aria-hidden="true" />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Loading Buzzlemax AI</p>
          <p className="text-sm text-muted-foreground">Preparing the next page experience.</p>
        </div>
      </div>
    </div>
  )
}
