'use client'

import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ImageGrid } from '@/components/gallery/image-grid'
import { useInstagram } from '@/hooks/use-instagram'
import { motion } from 'framer-motion'

export default function GalleryPage() {
  const { posts, isLoading } = useInstagram({ limit: 24 })

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Page Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4">
            Full Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore the complete collection of my work. Each image tells a unique story about light, emotion, and the beauty of the moment.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <ImageGrid posts={posts} isLoading={isLoading} />
      </div>

      <Footer />
    </main>
  )
}
