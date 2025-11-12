'use client'

import { useSelector } from 'react-redux'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RootState } from '@/store'

interface DeleteUserModalProps {
  isOpen: boolean
  userId: string | null
  onClose: () => void
  onConfirm: (id: string) => void
}

export function DeleteUserModal({ isOpen, userId, onClose, onConfirm }: DeleteUserModalProps) {
  const { users } = useSelector((state: RootState) => state.auth)
  const user = users.find(u => u.id === userId)

  const handleConfirm = () => {
    if (userId) {
      onConfirm(userId)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        {user && (
          <div className="bg-secondary/30 p-4 rounded-lg">
            <h4 className="font-medium">{user.name}</h4>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">Role: {user.role}</p>
          </div>
        )}
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}