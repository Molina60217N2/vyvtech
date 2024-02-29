import Link from "next/link";
import Footer from "../components/Footer";
import { PreviewAlert } from "components/preview-alert";
import { NextUIProvider } from "@nextui-org/react";
import { Cabin } from "next/font/google";
import Navbarvyv from "@/components/Navbar";
import { DrupalTaxonomyTerm } from "next-drupal";

const cabin = Cabin({
  subsets: ["latin"],
});

interface LayoutInterface {
  navbarCategories: DrupalTaxonomyTerm[];
}

export function Layout({ children, navbarCategories }: React.PropsWithChildren<LayoutInterface> ) {
  return (
    <NextUIProvider className={cabin.className}>
      <PreviewAlert />
      <div className="flex flex-col min-h-screen">
        <header>
          <Navbarvyv navbarCategories={navbarCategories}/>
        </header>
        <main className="flex-1">{children}</main>
        <Footer/>
      </div>
    </NextUIProvider>
  );
}
