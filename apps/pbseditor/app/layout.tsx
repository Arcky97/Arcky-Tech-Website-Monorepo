import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./clientLayout"

export const metadata: Metadata = {
  title: "Arcky-Tech PBS Editor",
  description: "Arcky-Tech PBS Editor, makes editing PBS Files a lot faster and easier!",
  icons: {
    icon: "favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" className="bg-gray-900">
      <body id="root" className="min-h-screen flex flex-col overflow-hidden bg-gray-900">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
