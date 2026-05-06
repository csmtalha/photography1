'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { InstagramPost } from '@/lib/instagram-service'
import { LightboxModal } from './lightbox-modal'
import { Eye } from 'lucide-react'

interface ImageGridProps {
  posts: InstagramPost[]
  isLoading?: boolean
}

export function ImageGrid({ posts, isLoading = false }: ImageGridProps) {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-secondary rounded-lg h-80 animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No posts found</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg bg-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => {
              setSelectedPost(post)
              setSelectedIndex(index)
            }}
          >
            {/* Image */}
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={post.url}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.div
                  className="flex flex-col items-center gap-3"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                >
                  <Eye size={32} className="text-white" />
                  <span className="text-white text-sm tracking-widest uppercase">View</span>
                </motion.div>
              </div>
            </div>

            {/* Caption */}
            <div className="p-4">
              <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {post.caption}
              </p>
              <p className="text-xs text-muted-foreground/50 mt-2">
                {new Date(post.timestamp).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPost && (
        <LightboxModal
          posts={posts}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedPost(null)}
          onNext={() => {
            const nextIndex = (selectedIndex + 1) % posts.length
            setSelectedIndex(nextIndex)
            setSelectedPost(posts[nextIndex])
          }}
          onPrev={() => {
            const prevIndex = (selectedIndex - 1 + posts.length) % posts.length
            setSelectedIndex(prevIndex)
            setSelectedPost(posts[prevIndex])
          }}
        />
      )}
    </>
  )
}
