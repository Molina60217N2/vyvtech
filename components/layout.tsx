import Link from "next/link"
import { PreviewAlert } from "components/preview-alert"
import {NextUIProvider} from "@nextui-org/react";
import { Cabin } from 'next/font/google'
import Navbarvyv from '@/components/Navbar'

const cabin = Cabin ({
  subsets: ['latin']
})

export function Layout({ children }) {
  return (
    <NextUIProvider className={cabin.className}>
      <PreviewAlert />
      <div>
        <header>
          <Navbarvyv/>
        </header>
        <main className="container py-10 mx-auto">{children}</main>
      </div>
    </NextUIProvider>
  )
}
