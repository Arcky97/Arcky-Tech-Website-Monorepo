import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Arcky-Tech",
  description: "A collection of Arcky's Projects, Documentation and a Dashboard.",
  icons: {
    icon: "favicon.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-gray-900">
      <body className="min-h-screen flex flex-col overflow-hidden bg-gray-900">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

