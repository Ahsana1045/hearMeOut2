import { User } from "@prisma/client"

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export interface MainNavItem extends NavItem {}

export interface UserNavItem extends NavItem {}

export interface SiteConfig {
  name: string
  description: string
  mainNav: MainNavItem[]
  userNav: UserNavItem[]
}

export interface UserSession {
  user: User | null
  isAuthenticated: boolean
}

export interface Character {
  id: number
  name: string
  description: string
  picture: string
  userId: number
  createdAt: Date
}

export interface ProfileFormValues {
  firstName: string
  username: string
  email: string
} 