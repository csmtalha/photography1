'use client'

import { HeroSection } from '@/components/sections/hero-section'
import { FeaturedGrid } from '@/components/sections/featured-grid'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { useInstagram } from '@/hooks/use-instagram'

export default function Home() {
  const { posts, isLoading } = useInstagram({ limit: 12 })

  return (
    <main className="bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedGrid posts={posts} isLoading={isLoading} />
      <Footer />
    </main>
  )
}
