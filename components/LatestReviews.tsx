'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { generateAlbums, generateReviews } from '@/lib/faker'

export function LatestReviews() {
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    const albums = generateAlbums(3)
    const latestReviews = generateReviews(3, albums)
    setReviews(latestReviews)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Latest reviews</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/reviews" className="text-primary text-sm">See more</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow bg-secondary/20 border-none">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={review.album.cover}
                      alt={review.album.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground line-clamp-1">
                      {review.album.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {review.album.artist}
                    </p>
                    <div className="flex items-center mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    by {review.author}
                  </p>
                  <p className="text-xs text-foreground line-clamp-2">
                    {review.summary.slice(0, 100)}...
                  </p>
                  <Button variant="ghost" size="sm" asChild className="w-full mt-2">
                    <Link href={`/reviews/${review.id}`}>
                      Olvasd tovább
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}