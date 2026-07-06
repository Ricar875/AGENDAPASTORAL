import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Gestor Pastoral",
  description: "Sistema de gestão pastoral",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
