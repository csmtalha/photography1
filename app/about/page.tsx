'use client'

import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutPage() {
  const about = {
    sections: [
      {
        title: 'Philosophy',
        content: `I believe photography is about capturing truth and emotion in a single frame. Every image should tell a story, evoke a feeling, or challenge the viewer to see the world differently. My approach combines technical precision with artistic intuition, always prioritizing the humanity in every shot.`,
      },
      {
        title: 'Specializations',
        content: `My expertise spans editorial photography, fashion campaigns, landscape documentation, and intimate portrait work. I work with both natural and studio lighting, always adapting my style to suit the client's vision while maintaining my unique perspective. Whether it's a corporate campaign or a personal project, I bring the same level of dedication and creative excellence.`,
      },
      {
        title: 'Approach',
        content: `I collaborate closely with my clients to understand their vision and objectives. Pre-shoot planning is essential—from location scouting to mood boards—ensuring every detail aligns with the final goal. On set, I remain flexible and responsive to changing conditions, capturing not just planned shots but also unexpected moments that often become the most compelling.`,
      },
      {
        title: 'Background',
        content: `I started photography over a decade ago as a personal passion, driven by a desire to preserve moments. After studying visual arts and working with renowned photographers, I launched my independent practice. Since then, my work has been featured in major publications and exhibited internationally. I continue to push creative boundaries while staying grounded in the fundamentals of light and composition.`,
      },
    ],
  }

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-6">
            {siteConfig.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            {siteConfig.tagline}
          </p>
        </motion.div>

        {/* Bio Image */}
        <motion.div
          className="relative w-full aspect-[4/3] mb-16 md:mb-24 rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image
            src="/hero_round.jpg"
            alt={siteConfig.name}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-16 md:space-y-24">
          {about.sections.map((section, index) => (
            <motion.div
              key={section.title}
              className="border-t border-border pt-12 md:pt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-6">
                {section.title}
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="border-t border-border mt-20 md:mt-32 pt-12 md:pt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
            Let's create something amazing together
          </h3>
          <p className="text-muted-foreground mb-8">
            Whether you have a specific project in mind or just want to discuss possibilities, I'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 rounded-lg font-light tracking-wide"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
