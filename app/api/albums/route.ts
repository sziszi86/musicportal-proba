import { NextRequest, NextResponse } from 'next/server'
import { generateAlbums } from '@/lib/faker'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const genre = searchParams.get('genre')
  
  const allAlbums = generateAlbums(100)
  
  let filteredAlbums = allAlbums
  if (genre) {
    filteredAlbums = allAlbums.filter(album => 
      album.genre.toLowerCase() === genre.toLowerCase()
    )
  }
  
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedAlbums = filteredAlbums.slice(startIndex, endIndex)
  
  return NextResponse.json({
    albums: paginatedAlbums,
    pagination: {
      page,
      limit,
      total: filteredAlbums.length,
      totalPages: Math.ceil(filteredAlbums.length / limit),
    },
  })
}