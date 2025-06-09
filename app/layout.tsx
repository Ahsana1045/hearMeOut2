import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from "next-auth"
import { SessionProvider } from "./components/SessionProvider"
import { Metadata } from 'next'
import { Navbar } from './components/layout/navbar'
import { ErrorBoundary } from './components/layout/error-boundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hear Me Out?',
  description: 'No judgment, only understanding',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ErrorBoundary>
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </ErrorBoundary>
        </SessionProvider>
      </body>
    </html>
  )
}
