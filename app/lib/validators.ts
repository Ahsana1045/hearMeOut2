import { z } from 'zod'

export const profileFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
})

export const characterFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  picture: z.string().url('Must be a valid URL'),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>
export type CharacterFormValues = z.infer<typeof characterFormSchema> 