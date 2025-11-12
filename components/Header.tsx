'use client'

import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { login, logout } from '@/store/authSlice'
import { Button } from '@/components/ui/button'

export function Header() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(login({ 
      id: '1',
      name: 'Admin User',
      email: 'admin@musicportal.com',
      role: 'admin'
    }))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          MusicPortal
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link 
            href="/albums" 
            className="text-foreground hover:text-primary transition-colors"
          >
            Albums
          </Link>
          <Link 
            href="/reviews" 
            className="text-foreground hover:text-primary transition-colors"
          >
            Reviews
          </Link>
          {isAuthenticated && (
            <Link 
              href="/dashboard" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          ) : (
            <Button variant="default" size="sm" onClick={handleLogin}>
              Log in
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}