import "./globals.css"
import type { Metadata } from "next"
import ClientLayout from "./clientLayout"
import { initServerI18next, getT, getResources, generateI18nStaticParams } from 'next-i18next/server'
import { I18nProvider } from 'next-i18next/client'
import i18nConfig from '../../i18n.config'

initServerI18next(i18nConfig)

export const metadata: Metadata = {
  title: "Arcky-Tech PBS Editor",
  description: "Arcky-Tech PBS Editor, makes editing PBS Files a lot faster and easier!",
  icons: {
    icon: "/favicon.png"
  }
}

export async function generateStaticParams() {
  return generateI18nStaticParams()
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lng: string }>
}) {
  const { lng } = await params
  const { i18n } = await getT()
  const resources = getResources(i18n)

  return (
    <html lang={lng} className="bg-gray-900">
      <body id="root" className="min-h-screen flex flex-col overflow-hidden bg-gray-900">
        <I18nProvider language={lng} resources={resources}>
          <ClientLayout>{children}</ClientLayout>
        </I18nProvider>
      </body>
    </html>
  )
}