import { NextRequest, NextResponse } from 'next/server'
import { generateAlbums, generateReviews } from '@/lib/faker'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  
  const allAlbums = generateAlbums(100)
  const allReviews = generateReviews(100, allAlbums)
  
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedReviews = allReviews.slice(startIndex, endIndex)
  
  return NextResponse.json({
    reviews: paginatedReviews,
    pagination: {
      page,
      limit,
      total: allReviews.length,
      totalPages: Math.ceil(allReviews.length / limit),
    },
  })
}