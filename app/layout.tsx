import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Atenia - El Asistente Inteligente para tu Restaurante',
  description: 'Atenia es el primer asistente de Inteligencia Artificial para WhatsApp que contesta en 2 segundos, filtra a los proveedores y agenda mesas 24/7.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased bg-white`}>{children}</body>
    </html>
  )
}
