import { z } from 'zod'

export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: unknown
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new APIError(
      response.status,
      data.message || 'Something went wrong',
      data
    )
  }

  return data
}

export function createAPIHandler<T extends z.ZodType>(
  schema: T,
  handler: (data: z.infer<T>) => Promise<unknown>
) {
  return async (req: Request) => {
    try {
      const body = await req.json()
      const validatedData = schema.parse(body)
      const result = await handler(validatedData)
      return Response.json(result)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return Response.json(
          { message: 'Invalid request data', errors: error.errors },
          { status: 400 }
        )
      }

      if (error instanceof APIError) {
        return Response.json(
          { message: error.message, data: error.data },
          { status: error.statusCode }
        )
      }

      console.error('API Error:', error)
      return Response.json(
        { message: 'Internal server error' },
        { status: 500 }
      )
    }
  }
} 