import Link from "next/link";
import Footer from "../components/Footer";

import { PreviewAlert } from "components/preview-alert";
import { NextUIProvider } from "@nextui-org/react";
import { Cabin } from "next/font/google";
import Navbarvyv from "@/components/Navbar";

const cabin = Cabin({
  subsets: ["latin"],
});

export function Layout({ children }) {
  return (
    <NextUIProvider className={cabin.className}>
      <PreviewAlert />
      <div className="flex flex-col min-h-screen">
        <header>
          <Navbarvyv />
        </header>
        <main className="">{children}</main>
        <Footer />
      </div>
    </NextUIProvider>
  );
}
