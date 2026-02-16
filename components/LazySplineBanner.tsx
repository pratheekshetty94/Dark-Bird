'use client'

import dynamic from 'next/dynamic'

const SplineBanner = dynamic(() => import('@/components/SplineBanner'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-ink flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
    </div>
  ),
})

export default function LazySplineBanner({
  scene,
  height = 'h-[50vh]',
  scale = 1,
  className = '',
}: {
  scene: string
  height?: string
  scale?: number
  className?: string
}) {
  return <SplineBanner scene={scene} height={height} scale={scale} className={className} />
}
