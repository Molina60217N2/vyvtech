import Image from "next/image";
import Link from "next/link";
import { DrupalNode } from "next-drupal";

import { absoluteUrl, formatDate } from "lib/utils";
import {
  Card,
  CardBody,
  Button,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";

interface NodeProductTeaserProps {
  node: DrupalNode;
}

export function NodeProductTeaser({ node, ...props }: NodeProductTeaserProps) {
  return (
    <div {...props} className="bg-EEF4F8 mt-4 shadow-xl rounded-xl">
      {/* card */}
      <div className="bg-white rounded-3xl h-full p-4 lg:max-w-80 drop-shadow-md">
        <div className="sm:max-h-72 md:max-h-48 lg:max-h-72 overflow-hidden">
          <Image
            src={absoluteUrl(node.field_product_image.uri.url)}
            alt={node.field_product_image.resourceIdObjMeta.alt}
            width={800}
            height={400}
            // objectFit="contain"
            className="rounded-t-md"
          />
        </div>
        <div className="grid gap-3">
          <p className="text-sm text-darkBlue font-bold md:text-lg mt-8">
            {node.title}
          </p>
          <p className="text-sm md:text-base font-normal text-lightGray">
            {node.field_product_brand.name}
          </p>
          <p className="text-sm text-darkBlue font-bold md:text-lg">
            ¢{node.field_product_price}
          </p>
          <Link href={node.path.alias} className="flex justify-center">
            <Button className="bg-darkBlue rounded-3xl">
              <span className="text-sm md:text-base text-white">
                Ver producto
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
