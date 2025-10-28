'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  genre?: string
}

export function AlbumsPagination({ pagination, genre }: PaginationProps) {
  const { page, totalPages } = pagination
  
  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams()
    params.set('page', pageNum.toString())
    if (genre) params.set('genre', genre)
    return `/albums?${params.toString()}`
  }
  
  const renderPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, page - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === page ? 'default' : 'outline'}
          size="sm"
          asChild
        >
          <Link href={createPageUrl(i)}>{i}</Link>
        </Button>
      )
    }
    
    return pages
  }
  
  if (totalPages <= 1) return null
  
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        asChild={page > 1}
      >
        {page > 1 ? (
          <Link href={createPageUrl(page - 1)}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Link>
        ) : (
          <>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </>
        )}
      </Button>
      
      {renderPageNumbers()}
      
      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        asChild={page < totalPages}
      >
        {page < totalPages ? (
          <Link href={createPageUrl(page + 1)}>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        ) : (
          <>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </>
        )}
      </Button>
    </div>
  )
}