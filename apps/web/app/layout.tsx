import MainLayoutWrapper from "@arcky/ui/layout/MainLayoutWrapper";
import "./globals.css";

export default function RootLayout({ children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col h-full">
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  )
}