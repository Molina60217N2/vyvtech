import { DrupalTaxonomyTerm } from "next-drupal";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
interface DropdownInterface {
  categories: DrupalTaxonomyTerm[];
  brands: DrupalTaxonomyTerm[];
}

export default function FilterBtns({
  categories,
  brands,
  ...props
}: DropdownInterface) {
  // var url = "/filter?";
  const itemsCategories = categories.map((category) => ({
    name: category.name,
  }));
  const itemsBrands = brands.map((brand) => ({
    name: brand.name,
  }));

  const [selectedCategories, setSelectedCategories] = React.useState("");
  function handleCategoryClick(item) {
    setSelectedCategories(item.name);
  }

  const [selectedBrands, setSelectedBrands] = React.useState("");
  function handleBrandClick(item) {
    setSelectedBrands(item.name);
  }
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  useEffect(() => {
    setIsButtonDisabled(!(selectedBrands || selectedCategories));
  }, [selectedBrands, selectedCategories]);
  const router = useRouter();

  useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories]);
  return (
    <div className="flex flex-row gap-0 sm:gap-6">
      {/* Dropdown for Categories */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="bg-[#0F5C9A] text-white text-sm md:text-lg md:w-3/4"
          >
            {selectedCategories || "Seleccionar categoria"}
            <svg
              width="23"
              height="11"
              viewBox="0 0 23 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.4 1.1875L13.25 9.3375C12.2875 10.3 10.7125 10.3 9.75001 9.3375L1.60001 1.1875"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={itemsCategories}>
          {(item) => (
            <DropdownItem
              onClick={() => handleCategoryClick(item)}
              key={item.name}
            >
              {item.name}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      {/* Dropdown for brands */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="bg-[#0F5C9A] text-white text-sm md:text-lg md:w-3/4"
          >
            {selectedBrands || "Seleccionar marca"}
            <svg
              width="23"
              height="11"
              viewBox="0 0 23 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.4 1.1875L13.25 9.3375C12.2875 10.3 10.7125 10.3 9.75001 9.3375L1.60001 1.1875"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={itemsBrands}>
          {(item) => (
            <DropdownItem
              onClick={() => handleBrandClick(item)}
              key={item.name}
            >
              {item.name}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      {/* boton para ir a la pagina con items filtrados */}
      {(selectedBrands || selectedCategories) && (
        <Button
          className="bg-green-700 text-white text-sm md:text-lg md:w-3/4"
          onClick={() => {
            var url = `/filter?`;
            if (selectedBrands && selectedBrands !== "") {
              url += `&brand=` + selectedBrands;
            }
            if (selectedCategories && selectedCategories !== "") {
              url += `&category=` + selectedCategories;
            }
            router.push(url);
          }}
        >
          Filtrar Productos
        </Button>
      )}
    </div>
  );
}
