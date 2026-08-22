import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./clientLayout"

export const metadata: Metadata = {
  title: "Arcky-Tech Dashbobard",
  description: "Arcky-Tech Dashboard, login with youtube to see your analytics or discord to manage Doggo Bot for your server(s).",
  icons: {
    icon: "favicon.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body id="root" className="min-h-screen flex flex-col overflow-hidden bg-gray-900">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}