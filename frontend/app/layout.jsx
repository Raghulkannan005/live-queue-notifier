import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Waitless Online',
  description: 'Waitless Online - Skip the Queue, Live the Life',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
          <Header />
          {children}
          <Footer />
      </body>
    </html>
  )
}

