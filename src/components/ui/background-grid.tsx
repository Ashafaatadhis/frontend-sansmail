import { cn } from '@/lib/utils'

interface BackgroundGridProps {
  className?: string
}

export function BackgroundGrid({ className }: BackgroundGridProps) {
  return (
    <div
      className={cn('absolute inset-0 z-0 pointer-events-none', className)}
      style={{
        background: 'var(--canvas)',
        backgroundImage: `
          linear-gradient(to right, var(--hairline) 1px, transparent 1px),
          linear-gradient(to bottom, var(--hairline) 1px, transparent 1px),
          radial-gradient(circle at 50% 30%, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)
        `,
        backgroundSize: '32px 32px, 32px 32px, 100% 100%',
      }}
    />
  )
}
