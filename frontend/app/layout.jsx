import './globals.css'

export const metadata = {
  title: 'Waitless Online',
  description: 'Waitless Online - Skip the Queue, Live the Life',
}


import Header from './components/Header'
import Footer from './components/Footer'

import { ClerkProvider } from '@clerk/nextjs'


export default function RootLayout({children}) {
  return (
    <ClerkProvider appearance={{baseTheme: "light"}}>
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  )
}
