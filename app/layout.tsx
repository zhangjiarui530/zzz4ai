import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const playfair = Playfair_Display({ subsets: ['latin'] })

export const metadata = {
  title: 'ZZZ4AI - 教案生成助手',
  description: '智能教案生成平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={cn("bg-white text-gray-800")}>
        <Header />
        <main className="container mx-auto px-6 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

