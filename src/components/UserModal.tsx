import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import EnhancedModal from './EnhancedModal'
import MagneticButton from './MagneticButton'

interface User {
  id?: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin?: string
}

interface UserModalProps {
  user: User | null
  type: 'add' | 'edit' | 'view'
  onClose: () => void
  onSave: (user: User) => void
}

export default function UserModal({ user, type, onClose, onSave }: UserModalProps) {
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    role: 'Viewer',
    status: 'pending',
  })

  useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const isViewMode = type === 'view'

  return (
    <EnhancedModal
      isOpen={true}
      onClose={onClose}
      title={type === 'add' ? 'Add New User' : type === 'edit' ? 'Edit User' : 'User Details'}
    >

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isViewMode}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isViewMode}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                disabled={isViewMode}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as User['status'] })
                }
                disabled={isViewMode}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {!isViewMode && (
              <div className="flex gap-3 pt-4">
                <MagneticButton
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </MagneticButton>
                <MagneticButton
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors"
                >
                  {type === 'add' ? 'Add User' : 'Save Changes'}
                </MagneticButton>
              </div>
            )}

            {isViewMode && (
              <MagneticButton
                type="button"
                onClick={onClose}
                className="w-full px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors mt-4"
              >
                Close
              </MagneticButton>
            )}
          </form>
    </EnhancedModal>
  )
}

