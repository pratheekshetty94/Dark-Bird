'use client'

import Spline from '@splinetool/react-spline/next'

export default function SplineCamera() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Spline scene="https://prod.spline.design/xdicw7G6UV0NqTOO/scene.splinecode" />
    </div>
  )
}
