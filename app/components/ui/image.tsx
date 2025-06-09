'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/app/lib/utils'

interface OptimizedImageProps extends React.ComponentProps<typeof Image> {
  aspectRatio?: 'square' | 'video' | 'portrait'
}

export function OptimizedImage({
  className,
  aspectRatio = 'square',
  ...props
}: OptimizedImageProps) {
  return (
    <div
      className={cn(
        'overflow-hidden',
        {
          'aspect-square': aspectRatio === 'square',
          'aspect-video': aspectRatio === 'video',
          'aspect-[3/4]': aspectRatio === 'portrait',
        },
        className
      )}
    >
      <Image
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={90}
        {...props}
      />
    </div>
  )
} 