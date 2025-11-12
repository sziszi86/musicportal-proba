'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Music, FileText, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RootState } from '@/store'

export function DashboardStats() {
  const { users } = useSelector((state: RootState) => state.auth)
  const [stats, setStats] = useState({
    albums: 0,
    reviews: 0,
    users: users.length,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [albumsRes, reviewsRes] = await Promise.all([
          fetch('/api/albums?limit=1'),
          fetch('/api/reviews?limit=1'),
        ])
        
        const [albumsData, reviewsData] = await Promise.all([
          albumsRes.json(),
          reviewsRes.json(),
        ])
        
        setStats({
          albums: albumsData.pagination?.total || 0,
          reviews: reviewsData.pagination?.total || 0,
          users: users.length,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    fetchStats()
  }, [users.length])

  const statCards = [
    {
      title: 'Total Albums',
      value: stats.albums,
      icon: Music,
      description: 'Albums in database',
    },
    {
      title: 'Total Reviews',
      value: stats.reviews,
      icon: FileText,
      description: 'Published reviews',
    },
    {
      title: 'Total Users',
      value: stats.users,
      icon: Users,
      description: 'Registered users',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}