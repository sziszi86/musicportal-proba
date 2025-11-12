import { Star, Calendar, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Review } from '@/lib/faker'

interface ReviewHeaderProps {
  review: Review
}

export function ReviewHeader({ review }: ReviewHeaderProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="bg-gradient-to-br from-background to-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="outline" className="mb-4">
            Album Review
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            {review.album.title}
          </h1>
          
          <p className="text-xl text-muted-foreground">
            by {review.album.artist}
          </p>
          
          <div className="flex items-center justify-center space-x-2">
            {renderStars(review.rating)}
            <span className="text-lg font-semibold text-foreground ml-2">
              {review.rating}/5
            </span>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {review.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(review.publishedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}