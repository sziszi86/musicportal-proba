import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Review } from '@/lib/faker'

interface ReviewContentProps {
  review: Review
}

export function ReviewContent({ review }: ReviewContentProps) {
  const paragraphs = review.content.split('\n').filter(p => p.trim())

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg font-medium text-foreground mb-6 italic">
            {review.summary}
          </p>
          
          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Tracklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {review.album.tracks.map((track, index) => (
              <div
                key={track.id}
                className="flex items-center justify-between p-2 rounded hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 flex items-center justify-center text-sm text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{track.title}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {track.duration}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}