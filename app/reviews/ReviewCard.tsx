import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Review } from '@/lib/faker'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={review.album.cover}
              alt={review.album.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground line-clamp-1">
              {review.album.title}
            </h3>
            <p className="text-muted-foreground text-sm">
              by {review.album.artist}
            </p>
            <div className="flex items-center mt-1">
              {renderStars(review.rating)}
              <span className="ml-2 text-sm text-muted-foreground">
                {review.rating}/5
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">
              Review by <span className="font-medium">{review.author}</span>
            </p>
            <p className="text-xs text-muted-foreground">{review.date}</p>
          </div>
          
          <p className="text-sm text-foreground line-clamp-4">
            {review.summary}
          </p>
          
          <Button variant="ghost" size="sm" asChild className="w-full">
            <Link href={`/reviews/${review.id}`}>
              Read Full Review
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}