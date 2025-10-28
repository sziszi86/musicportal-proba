import { Review } from '@/lib/faker'
import { ReviewCard } from './ReviewCard'
import { ReviewsPagination } from './ReviewsPagination'

interface ReviewsListProps {
  searchParams: {
    page?: string
  }
}

async function getReviews(page: number = 1) {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: '20',
  })
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/reviews?${searchParams}`, {
    cache: 'force-cache',
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch reviews')
  }
  
  return response.json()
}

export async function ReviewsList({ searchParams }: ReviewsListProps) {
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams.page || '1')
  const { reviews, pagination } = await getReviews(page)
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {reviews.map((review: Review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      
      <ReviewsPagination pagination={pagination} />
    </div>
  )
}