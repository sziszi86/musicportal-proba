import Link from 'next/link'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Review } from '@/lib/faker'

interface AlbumReviewProps {
  review: Review
}

export function AlbumReview({ review }: AlbumReviewProps) {
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
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Review</span>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {review.rating}/5
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Review by <span className="font-medium">{review.author}</span> • {review.date}
              </p>
            </div>
            
            <p className="text-lg text-foreground leading-relaxed">
              {review.summary}
            </p>
            
            <Button variant="outline" asChild>
              <Link href={`/reviews/${review.id}`}>
                Read Full Review
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}