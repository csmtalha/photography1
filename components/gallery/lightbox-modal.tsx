'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { InstagramPost } from '@/lib/instagram-service'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxModalProps {
  posts: InstagramPost[]
  selectedIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function LightboxModal({
  posts,
  selectedIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxModalProps) {
  const post = posts[selectedIndex]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNext, onPrev])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Modal Content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} className="text-white" />
          </motion.button>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto px-4 py-8">
            {/* Image */}
            <motion.div
              className="relative w-full md:w-2/3 aspect-square"
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={post.url}
                alt={post.caption}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Caption & Info */}
            <motion.div
              className="md:w-1/3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-6 text-white">
                <div>
                  <h3 className="text-sm tracking-widest uppercase mb-4 opacity-60">
                    Caption
                  </h3>
                  <p className="text-lg leading-relaxed">{post.caption}</p>
                </div>

                <div>
                  <h3 className="text-sm tracking-widest uppercase mb-2 opacity-60">
                    Date
                  </h3>
                  <p className="text-sm">
                    {new Date(post.timestamp).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm tracking-widest uppercase mb-2 opacity-60">
                    Format
                  </h3>
                  <p className="text-sm">{post.mediaType}</p>
                </div>

                {/* Counter */}
                <div className="border-t border-white/20 pt-6">
                  <p className="text-sm opacity-60">
                    {selectedIndex + 1} / {posts.length}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
            <motion.button
              onClick={onPrev}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} className="text-white" />
            </motion.button>

            <motion.button
              onClick={onNext}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} className="text-white" />
            </motion.button>
          </div>

          {/* Keyboard hint */}
          <div className="absolute bottom-8 right-8 text-xs text-white/40 space-y-1 hidden md:block">
            <p>ESC to close</p>
            <p>← → to navigate</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
