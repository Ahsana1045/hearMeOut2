'use client'

import * as React from 'react'
import { useForm, UseFormProps, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/app/lib/utils'

interface FormProps<T extends FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  schema: z.ZodType<T>
  onSubmit: (data: T) => void | Promise<void>
  defaultValues?: UseFormProps<T>['defaultValues']
  children: React.ReactNode
}

export function Form<T extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  children,
  className,
  ...props
}: FormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn('space-y-6', className)}
      {...props}
    >
      {typeof children === 'function' ? children(form) : children}
    </form>
  )
} 