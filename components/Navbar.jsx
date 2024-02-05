"use client";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@nextui-org/react";
import { FormSearch } from "./form--search";

export default function Navbarvyv() {
  return (
    <nav className="p-4">
      {/* Primera sección: Logo y Input Search */}
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-1">
          <Link href="/">
            <p>
              <Image src="/logo.png" alt="Logo" width={60} height={60} />
            </p>
          </Link>
        </div>
        <div className="col-span-11 justify-center mx-auto w-5/6 ">
          <FormSearch />
        </div>
      </div>

      {/* Segunda sección: Enlaces */}
      <div className="mt-4 border-t-1 border-t-[#122049]">
        <div className="flex items-center space-x-6 pt-5 max-[640px]:justify-center max-[320px]:grid max-[320px]:grid-cols-2 max-[320px]:space-x-0 max-[320px]:justify-items-center max-[320px]:space-y-3">
          <Link href="/">
            <p className="font-bold md:text-lg">Inicio</p>
          </Link>
          <Link href="/productos">
            <p className="font-bold md:text-lg">Productos</p>
          </Link>
          <Link href="/categorias">
            <p className="font-bold md:text-lg">Categorias</p>
          </Link>
          <Link href="/acerca">
            <p className="font-bold md:text-lg">Acerca del negocio</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}
