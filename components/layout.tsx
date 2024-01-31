import Link from "next/link";
import Footer from "../components/Footer";

import { PreviewAlert } from "components/preview-alert";
import { NextUIProvider } from "@nextui-org/react";

export function Layout({ children }) {
  return (
    <NextUIProvider>
      <PreviewAlert />
      <div className="flex flex-col min-h-screen">
        <header>
          <div className="container flex items-center justify-between py-6 mx-auto">
            <Link href="/" className="text-2xl font-semibold no-underline">
              Next.js for Drupal
            </Link>
            <Link
              href="https://next-drupal.org/docs"
              target="_blank"
              rel="external"
              className="hover:text-blue-600"
            >
              Read the docs
            </Link>
          </div>
        </header>
        <main className="">{children}</main>
        <Footer />
      </div>
    </NextUIProvider>
  );
}
