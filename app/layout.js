import './globals.css'

export const metadata = {
  title: 'LAMBORGHINI | Born to Drift',
  description: 'Experience the raging bull — where engineering becomes art.',  icons: {
    icon: '/logo.png',
  },}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
