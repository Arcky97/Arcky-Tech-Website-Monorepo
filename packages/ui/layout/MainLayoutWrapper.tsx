import CookieBanner from "./CookieBanner";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar/>
      <CookieBanner/>
      <main className="bg-blue-900">
        {children}
      </main>
      <Footer/>
    </>
  )
}