"use client";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@nextui-org/react";

export default function Navbarvyv() {
  return (
    <nav className="p-4">
      {/* Primera sección: Logo y Input Search */}
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-1">
          <Link href="/">
            <p>
              <Image
                src="/logo.png"
                alt="Logo"
                width={60}
                height={60}
              />
            </p>
          </Link>
        </div>
        <div className="col-span-11 flex justify-center mx-auto w-5/6 ">
          <Input
            placeholder="Buscar Productos..."
            size="md"
            classNames={{
              base: "mx-auto",
              mainWrapper: "h-full",
              input: "text-small font-bold",
              inputWrapper:["h-full bg-[#F9F9F9] border-2 border-[#0F5C9A]"] 
            }}
            type="search"
            startContent={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M10.9825 9.68624L10.7376 10.0307L11.0364 10.3295L15.8499 15.1429C15.9394 15.237 15.9888 15.3621 15.9877 15.492C15.9866 15.6231 15.934 15.7485 15.8413 15.8412C15.7486 15.9339 15.6232 15.9865 15.4921 15.9877C15.3622 15.9888 15.237 15.9393 15.143 15.8498L10.3306 11.0374L10.0317 10.7386L9.68725 10.9835C8.86442 11.5686 7.8964 11.9159 6.88929 11.9873C5.88217 12.0588 4.87482 11.8517 3.97761 11.3886C3.0804 10.9256 2.32796 10.2245 1.80275 9.36223C1.27753 8.49994 0.999804 7.50972 1 6.50007V6.49991C0.99989 5.6343 1.20409 4.7809 1.59599 4.00909C1.98789 3.23728 2.55643 2.56887 3.25536 2.05822C3.9543 1.54757 4.76389 1.2091 5.6183 1.07034C6.47271 0.931575 7.34781 0.996436 8.17243 1.25965C8.99704 1.52286 9.74789 1.97699 10.3639 2.5851C10.9799 3.19321 11.4437 3.93813 11.7175 4.75928C11.9914 5.58043 12.0675 6.45462 11.9398 7.31075C11.8121 8.16688 11.4841 8.98077 10.9825 9.68624ZM6.5 1.99997C5.30653 1.99997 4.16193 2.47408 3.31802 3.31799C2.47411 4.16191 2 5.3065 2 6.49997C2 7.69345 2.47411 8.83804 3.31802 9.68195C4.16193 10.5259 5.30653 11 6.5 11C7.69347 11 8.83807 10.5259 9.68198 9.68195C10.5259 8.83804 11 7.69345 11 6.49997C11 5.3065 10.5259 4.16191 9.68198 3.31799C8.83807 2.47408 7.69347 1.99997 6.5 1.99997Z" fill="#6B7280" stroke="#122049"/>
            </svg>}
          />
        </div>
      </div>

      {/* Segunda sección: Enlaces */}
      <div className="mt-4 border-t-1 border-t-[#122049]">
        <div className="flex items-center space-x-6 pt-5 max-[640px]:justify-center max-[320px]:grid max-[320px]:grid-cols-2 max-[320px]:space-x-0 max-[320px]:justify-items-center max-[320px]:space-y-3">
          <Link href="/">
            <p className="font-bold">Inicio</p>
          </Link>
          <Link href="/productos">
            <p className="font-bold">Productos</p>
          </Link>
          <Link href="/categorias">
            <p className="font-bold">Categorias</p>
          </Link>
          <Link href="/acerca">
            <p className="font-bold">Acerca del negocio</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}
