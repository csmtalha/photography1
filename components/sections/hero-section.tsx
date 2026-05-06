'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { FloatingSphere } from '@/components/3d/floating-sphere'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const scrollProgress = Math.max(0, Math.min(1, (rect.bottom - window.innerHeight) / rect.height))
        
        // Parallax effect on 3D element
        const parallax = scrollProgress * 20
        const canvas = containerRef.current.querySelector('canvas')
        if (canvas) {
          canvas.style.transform = `translateY(${parallax}px)`
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-0"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mb-8 md:mb-0">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-6 leading-tight text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl tracking-wide text-muted-foreground mb-8 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.p
          className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Capturing moments that tell stories. From editorial campaigns to intimate portraits, each photograph represents a unique perspective on the world.
        </motion.p>
      </div>

      {/* 3D Sphere */}
      <motion.div
        className="relative z-5 w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <FloatingSphere />
      </motion.div>

      {/* Scroll CTA */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll to explore</span>
          <ChevronDown size={20} className="text-muted-foreground" />
        </div>
      </motion.div>
    </section>
  )
}
