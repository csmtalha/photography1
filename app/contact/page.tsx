'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission (in production, send to backend)
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsLoading(false)

      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 1000)
  }

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Have a project in mind or just want to say hello? I'd love to hear from you. Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div>
            <h3 className="text-sm tracking-widest uppercase mb-2 opacity-60">Email</h3>
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-lg hover:opacity-60 transition-opacity">
              {siteConfig.contactEmail}
            </a>
          </div>
          <div>
            <h3 className="text-sm tracking-widest uppercase mb-2 opacity-60">Location</h3>
            <p className="text-lg">Los Angeles, California</p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          className="space-y-6"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Name */}
          <div>
            <label className="block text-sm tracking-widest uppercase mb-3 opacity-60">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 rounded-lg"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm tracking-widest uppercase mb-3 opacity-60">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 rounded-lg"
              placeholder="your@email.com"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm tracking-widest uppercase mb-3 opacity-60">
              Subject
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 rounded-lg"
            >
              <option value="">Select a subject...</option>
              <option value="commercial">Commercial Project</option>
              <option value="editorial">Editorial Photography</option>
              <option value="portrait">Portrait Session</option>
              <option value="other">Other Inquiry</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm tracking-widest uppercase mb-3 opacity-60">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={8}
              className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 rounded-lg resize-none"
              placeholder="Tell me about your project or what you'd like to discuss..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading || isSubmitted}
            className="w-full px-8 py-4 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 rounded-lg font-light tracking-wide uppercase text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Sending...' : isSubmitted ? 'Message sent!' : 'Send Message'}
          </motion.button>

          {/* Success Message */}
          {isSubmitted && (
            <motion.div
              className="p-4 border border-green-600 bg-green-50/10 text-green-600 rounded-lg text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Thank you for your message! I'll get back to you shortly.
            </motion.div>
          )}
        </motion.form>
      </div>

      <Footer />
    </main>
  )
}
