import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./clientLayout"

export const metadata: Metadata = {
  title: "Arcky-Tech Scoreboards",
  description: "Arcky-Tech Scoreboards, a collection of overlays used in Arckyus Gaming's let's plays and boss runs.",
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
      lang="en" className="">
      <body id="root" className="min-h-screen flex flex-col overflow-hidden">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
