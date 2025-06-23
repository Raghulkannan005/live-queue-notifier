import './globals.css'

export const metadata = {
  title: 'Waitless Online',
  description: 'Waitless Online - Skip the Queue, Live the Life',
}


import Header from './components/Header'
import Footer from './components/Footer'




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
