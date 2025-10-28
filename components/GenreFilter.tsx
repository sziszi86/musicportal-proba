'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

const genres = [
  'Pop', 'Jazz', 'Rock', 'Indie', 'Electronic', 
  'Hip Hop', 'Classical', 'Folk', 'R&B', 'Alternative'
]

export function GenreFilter() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Explore by Genre
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3">
          {genres.map((genre) => (
            <Link key={genre} href={`/albums?genre=${genre.toLowerCase()}`}>
              <Badge 
                variant="outline" 
                className="text-sm px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                {genre}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}