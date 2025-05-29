export const metadata = {
  title: 'Hear Me Out?',
  description: 'No judgment, only understanding',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
