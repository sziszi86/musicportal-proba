import { Album } from '@/lib/faker'
import { AlbumCard } from './AlbumCard'
import { AlbumsPagination } from './AlbumsPagination'

interface AlbumsListProps {
  searchParams: {
    page?: string
    genre?: string
  }
}

async function getAlbums(page: number = 1, genre?: string) {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: '20',
    ...(genre && { genre }),
  })
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/albums?${searchParams}`, {
    cache: 'force-cache',
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch albums')
  }
  
  return response.json()
}

export async function AlbumsList({ searchParams }: AlbumsListProps) {
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams.page || '1')
  const genre = resolvedSearchParams.genre
  
  const { albums, pagination } = await getAlbums(page, genre)
  
  return (
    <div>
      {genre && (
        <div className="mb-6">
          <p className="text-lg text-muted-foreground">
            Showing albums in <span className="font-semibold text-primary">{genre}</span> genre
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {albums.map((album: Album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
      
      <AlbumsPagination pagination={pagination} genre={genre} />
    </div>
  )
}