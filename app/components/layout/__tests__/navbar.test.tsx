import { render, screen } from '@testing-library/react'
import { Navbar } from '../navbar'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        name: 'Test User',
        email: 'test@example.com',
      },
    },
    status: 'authenticated',
  }),
  signOut: jest.fn(),
}))

describe('Navbar', () => {
  it('renders user information when authenticated', () => {
    render(<Navbar />)
    
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Navbar />)
    
    expect(screen.getByText('Hear Me Out')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Log out')).toBeInTheDocument()
  })
}) 