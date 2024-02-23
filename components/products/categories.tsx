import { DrupalTaxonomyTerm } from "next-drupal";
import Image from "next/image";
import { absoluteUrl } from "lib/utils";
import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Link from "next/link";
import Carousel from "@itseasy21/react-elastic-carousel";

interface CategoriesInterface {
  categories: DrupalTaxonomyTerm[];
}

export default function Categories({
  categories,
  ...props
}: CategoriesInterface) {
  const categoriesDescription = categories["data"];
  const categoriesImages = categories["included"];

  const breakPoints = [
    { width: 550, itemsToShow: 1, itemsToScroll: 1, itemPadding: [0, 30] },
    { width: 768, itemsToShow: 2, itemsToScroll: 2 },
    { width: 1024, itemsToShow: 3, itemsToScroll: 3 },
    { width: 1200, itemsToShow: 4, itemsToScroll: 4 },
  ];

  return (
    <div className="h-max">
      <div className={`md:w-11/12 m-auto`}>
        <Carousel itemsToShow={3} breakPoints={breakPoints} isRTL={false}>
          {categoriesDescription.map((category, key) => (
            <div key={key}>
              <Link href={`filter?&category=${category.attributes.name}`} passHref>
                <Card
                  shadow="sm"
                  className="overflow-visible pt-10 px-10 bg-[#0f5b9ab2] cursor-pointer transition-transform transform hover:scale-90 active:scale-105"
                  style={{ width: '250px', height: '300px' }}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      src={absoluteUrl(categoriesImages[key].attributes.uri.url)}
                      width={200}
                      height={200}
                      alt="jeje"
                    />
                  </CardBody>
                  <CardFooter className="font-bold text-[18px] text-white justify-center">
                    <b>{category.attributes.name}</b>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
