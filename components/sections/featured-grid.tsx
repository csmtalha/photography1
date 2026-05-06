'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ImageGrid } from '@/components/gallery/image-grid'
import { InstagramPost } from '@/lib/instagram-service'
import { ArrowRight } from 'lucide-react'

interface FeaturedGridProps {
  posts: InstagramPost[]
  isLoading?: boolean
}

export function FeaturedGrid({ posts, isLoading = false }: FeaturedGridProps) {
  const featured = posts.slice(0, 6)

  return (
    <section className="py-20 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A curated selection of recent projects that showcase my approach to light, composition, and storytelling.
          </p>
        </motion.div>

        {/* Grid */}
        <ImageGrid posts={featured} isLoading={isLoading} />

        {/* CTA */}
        <motion.div
          className="mt-16 md:mt-20 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 rounded-lg font-light tracking-wide"
          >
            View all work
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
