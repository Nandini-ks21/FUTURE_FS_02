import "./globals.css";
import Link from "next/link";
import { StoreProvider } from "@/context/StoreContext";

export const metadata = {
  title: "Mini E-Commerce",
  description: "A mini e-commerce storefront built with Next.js + Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <StoreProvider>
          <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-50">
            <nav className="container flex items-center justify-between py-4">
              <Link href="/" className="text-2xl font-bold">
                mini<span className="text-blue-600">Shop</span>
              </Link>
              <div className="flex gap-4 items-center text-sm">
                <Link href="/" className="hover:text-blue-600">Products</Link>
                <Link href="/orders" className="hover:text-blue-600">Orders</Link>
                <Link href="/cart" className="hover:text-blue-600">Cart</Link>
                <UserInfo />
              </div>
            </nav>
          </header>
          <main className="container py-6">{children}</main>
          <footer className="border-t py-6 text-center text-xs text-gray-500">
            Built with Next.js + Tailwind • Demo project
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}

function UserInfo() {
  if (typeof window === "undefined") return null;
  return null;
}
