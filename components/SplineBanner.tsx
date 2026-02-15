'use client'

import Spline from '@splinetool/react-spline/next'

export default function SplineBanner({
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
  return (
    <section className={`relative ${height} w-full overflow-hidden bg-deep-black ${className}`}>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: `scale(${scale})` }}
      >
        <Spline scene={scene} />
      </div>
    </section>
  )
}
