
'use client'

import React, { Suspense, lazy } from 'react'
import { Logo } from '../Logo'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex flex-col items-center justify-center bg-charcoal gap-4">
          <div className="animate-spin-slow">
            <Logo variant="icon" size={60} />
          </div>
          <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse">Initializing Engineering Environment</span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
