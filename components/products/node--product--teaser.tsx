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
  console.log(node.field_product_brand.name);
  return (
    <div {...props} className="bg-EEF4F8">
      {/* card */}
      <div className="bg-white rounded-xl h-full p-4 lg:max-w-80">
        <div className="max-h-28 sm:max-h-72 md:max-h-48 lg:max-h-72 overflow-hidden relative">
          <Image
            src={absoluteUrl(node.field_product_image.uri.url)}
            alt={node.field_product_image.resourceIdObjMeta.alt}
            width={800}
            height={400}
            objectFit="cover"
            className="rounded-t-md max-h-48 lg:max-h-96"
          />
        </div>
        <div className="grid gap-3">
          <p className="text-sm text-darkBlue font-bold md:text-lg">
            {node.title}
          </p>
          <p className="text-sm md:text-base font-normal text-lightGray">
            {node.field_product_brand.name}
          </p>
          <p className="text-sm text-darkBlue font-bold md:text-lg">
            ¢{node.field_product_price}
          </p>
          <Link href={node.path.alias}>
            <Button className="bg-darkBlue">
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

// <Link href={node.path.alias} className="no-underline hover:text-blue-600">
//         <h2 className="mb-4 text-4xl font-bold">{node.title}</h2>
//       </Link>
//       <div className="mb-4 text-gray-600">
//         {node.uid?.display_name ? (
//           <span>
//             Posted by{" "}
//             <span className="font-semibold">{node.uid?.display_name}</span>
//           </span>
//         ) : null}
//         <span> - {formatDate(node.created)}</span>
//       </div>
//       {node.field_product_image && (
//         <figure className="my-4">
//           <Image
//             src={absoluteUrl(node.field_product_image.uri.url)}
//             width={768}
//             height={480}
//             alt={node.field_product_image.resourceIdObjMeta.alt}
//           />
//         </figure>
//       )}
//       <Link
//         href={node.path.alias}
//         className="inline-flex items-center px-6 py-2 border border-gray-600 rounded-full hover:bg-gray-100"
//       >
//         Read article
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="w-4 h-4 ml-2"
//         >
//           <path d="M5 12h14M12 5l7 7-7 7" />
//         </svg>
//       </Link>
