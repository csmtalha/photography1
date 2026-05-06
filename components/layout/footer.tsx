'use client'

import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { Instagram, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const iconMap: Record<string, React.ReactNode> = {
    instagram: <Instagram size={20} />,
    email: <Mail size={20} />,
  }

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* About */}
          <div>
            <h3 className="text-sm tracking-widest uppercase mb-4">About</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {siteConfig.bio}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm tracking-widest uppercase mb-4">Navigate</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm hover:opacity-60 transition-opacity duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm tracking-widest uppercase mb-4">Connect</h3>
            <div className="flex gap-4">
              {siteConfig.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity duration-200"
                  aria-label={link.label}
                >
                  {iconMap[link.platform] || link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p>Crafted with precision and passion</p>
        </div>
      </div>
    </footer>
  )
}
