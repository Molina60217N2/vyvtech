import { DrupalTaxonomyTerm } from "next-drupal";
import React from "react";
import Link from "next/link";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

interface CategoryInterface {
  tags: DrupalTaxonomyTerm[];
}

export default function Category({ tags, ...props }: CategoryInterface) {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {tags.map((item, index) => (
        <Link key={index} href={item.path.alias} passHref>
          <Card as="a" shadow="sm" isPressable>
            <CardBody className="overflow-visible p-0">
              {/* <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[140px]"
                src={item.img}
              /> */}
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.name}</b>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
