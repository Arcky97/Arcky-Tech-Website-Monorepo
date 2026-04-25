import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./clientLayout";

export const metadata: Metadata = {
  title: "Arcky-Tech",
  description: "Arcky-Tech Website, a collection of Arcky's projects made with passion.",
  icons: {
    icon: "favicon.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

