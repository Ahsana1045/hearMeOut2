import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from "next-auth"
import { SessionProvider } from "./components/SessionProvider"
import { Metadata } from 'next'

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
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
