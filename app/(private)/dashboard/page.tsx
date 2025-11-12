'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import { DashboardStats } from './DashboardStats'
import { AlbumsTable } from './AlbumsTable'
import { ReviewsTable } from './ReviewsTable'
import { UsersTable } from './UsersTable'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your music portal content and users
          </p>
        </div>
        
        <DashboardStats />
        
        <div className="space-y-8">
          <AlbumsTable />
          <ReviewsTable />
          <UsersTable />
        </div>
      </div>
    </ProtectedRoute>
  )
}