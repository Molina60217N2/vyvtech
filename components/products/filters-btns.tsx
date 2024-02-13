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
  var url = "/filter?";
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
  const router = useRouter();

  useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories]);
  return (
    <div>
      {/* Dropdown for Categories */}
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">
            {selectedCategories || "Seleccionar categoria"}
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
          <Button variant="bordered">
            {selectedBrands || "Seleccionar marca"}
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
      <Button
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
    </div>
  );
}
