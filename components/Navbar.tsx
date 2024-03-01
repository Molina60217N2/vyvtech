"use client";
import Link from "next/link";
import Image from "next/image";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import { FormSearch } from "./form--search";
import { DrupalTaxonomyTerm } from "next-drupal";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/Navbar.module.css"

interface NavbarvyvInterface {
  navbarCategories: DrupalTaxonomyTerm[];
}

export default function Navbarvyv({navbarCategories}: NavbarvyvInterface) {

  const [hoverRotate, setHoverRotate] = useState(false);
  const divReference = useRef(null);
  const categories = navbarCategories?.["data"];

  const toggleRotation = () => {
    setHoverRotate(!hoverRotate);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divReference.current && !divReference.current.contains(event.target)) {
        setHoverRotate(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

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
        <div className="flex items-center space-x-6 pt-5 max-[640px]:justify-center max-[489px]:grid max-[489px]:grid-cols-2 max-[489px]:space-x-0 max-[489px]:justify-items-center max-[489px]:space-y-3">
          <Link href="/">
            <p className={`text-base font-bold md:text-lg text-darkBlue ease-in-out duration-300 hover:text-[#105A8B]`}>Inicio</p>
          </Link>
          <Link className="min-[489px]:pl-4" style={{
            marginTop: "0px",
          }} href="/productos">
            <p className={`text-base font-bold md:text-lg text-darkBlue ease-in-out duration-300 hover:text-[#105A8B]`}>Productos</p>
          </Link>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className={`flex bg-transparent cursor-pointer md:text-lg hover:ease-out text-darkBlue ease-in-out duration-300 hover:text-[#105A8B] font-bold text-base pointer gap-0 ${styles.svgColorHover}`}
                onClick={toggleRotation}
                ref={divReference}
                disableRipple={true}
                startContent={<svg className={hoverRotate ? `${styles.svgHover}` : `${styles.svgNormal}`} width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.75 0.5L7 6.75L13.25 0.5H0.75Z" fill="#122049"/>
                </svg>}
              >
                Categorías
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" className="overflow-y-auto max-h-60">
              {categories?.map((category, index) => (
                <DropdownItem key={index} variant="bordered" color="primary" className="hover:bg-[#e7e7e7]" textValue="Items de las categorias">
                  <Link href={`/filter?&category=${category.attributes.name}`} passHref>
                    <p className="font-bold md:text-lg text-base text-darkBlue">{category.attributes.name}</p>
                  </Link>
                </DropdownItem>
              ))}
            </DropdownMenu>
           </Dropdown>
          <Link href="/acerca-del-negocio" className="min-[489px]:pl-1">
            <p className={`text-base font-bold md:text-lg text-darkBlue ease-in-out duration-300 hover:text-[#105A8B]`}>Sobre Nosotros</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}
