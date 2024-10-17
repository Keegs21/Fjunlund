import "styles/tailwind.css"
import { Providers } from './providers'
import Navbar from './components/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body style={{
        backgroundImage: `url('/images/bg.webp')`,
        backgroundSize: 'cover',         // Ensures the entire image is visible
        backgroundPosition: 'center',      // Centers the background image
        backgroundRepeat: 'no-repeat',     // Prevents the image from repeating
        backgroundAttachment: 'fixed',     // Keeps the image in place during scrolling
        minHeight: '100vh',                // Ensures the body takes the full height of the viewport
      }}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
