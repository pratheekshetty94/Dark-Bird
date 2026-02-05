'use client'

import React, { useState, useEffect, createContext, useContext } from 'react'
import Preloader from './Preloader'

// Context to share preloader completion state
export const PreloaderContext = createContext<{ isComplete: boolean }>({ isComplete: false })

export const usePreloader = () => useContext(PreloaderContext)

interface PreloaderWrapperProps {
  children: React.ReactNode
}

export default function PreloaderWrapper({ children }: PreloaderWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [preloaderComplete, setPreloaderComplete] = useState(false)

  useEffect(() => {
    // Prevent scroll during preloader
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  const handlePreloaderComplete = () => {
    setIsLoading(false)
    setShowContent(true)
    // Small delay to ensure content is visible before videos start
    setTimeout(() => {
      setPreloaderComplete(true)
    }, 100)
  }

  return (
    <PreloaderContext.Provider value={{ isComplete: preloaderComplete }}>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.5s ease-out'
        }}
      >
        {children}
      </div>
    </PreloaderContext.Provider>
  )
}
