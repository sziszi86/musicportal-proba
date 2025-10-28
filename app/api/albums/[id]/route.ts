import { NextRequest, NextResponse } from 'next/server'
import { generateAlbums } from '@/lib/faker'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const allAlbums = generateAlbums(100)
  const album = allAlbums.find(a => a.id === params.id)
  
  if (!album) {
    return NextResponse.json(
      { error: 'Album not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(album)
}