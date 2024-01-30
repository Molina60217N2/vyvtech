import Link from "next/link"
import Footer from "../components/Footer"

import { PreviewAlert } from "components/preview-alert"

export function Layout({ children }) {
  return (
    <>
      <PreviewAlert />
      <div className="">
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
        <main className="container py-10 mx-auto">{children}</main>
        <Footer/>
      </div>
    </>
  )
}
