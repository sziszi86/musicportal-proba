import Link from 'next/link'
import { Github, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-primary mb-3">MusicPortal</h3>
            <div className="flex flex-row space-x-6 text-sm">
              <Link 
                href="/albums" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Albums
              </Link>
              <Link 
                href="/reviews" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Reviews
              </Link>
              <Link 
                href="/dashboard" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Github className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <Instagram className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  )
}