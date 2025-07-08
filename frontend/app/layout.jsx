import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'
import ClientSocketProvider from './components/provider/ClientSocketProvider'


export const metadata = {
  title: 'Waitless Online',
  description: 'Waitless Online - Skip the Queue, Live the Life',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({children}) {

  return (
    <html lang="en">
      <body className="antialiased">
          <Header />
          <ClientSocketProvider>
            <div className="min-h-screen">
              {children}
            </div>
          </ClientSocketProvider>
          <Footer />
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={8}
            containerStyle={{
              bottom: 16,
              right: 16,
            }}
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1f2937',
                color: '#f9fafb',
                padding: '12px 16px',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                fontSize: '14px',
                maxWidth: '320px',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#f9fafb',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#f9fafb',
                },
              },
            }}
          />
      </body>
    </html>
  )
}

