import Image from "next/image";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import { Button, Chip } from "@nextui-org/react";
import { absoluteUrl, formatDate } from "lib/utils";
import { NodeProductTeaser } from "./node--product--teaser";
import Carousel from "@itseasy21/react-elastic-carousel";
import styles from "./featured--products.module.css";

export interface NodeProductProps {
  node: DrupalNode;
  additionalContent: {
    relatedProducts: DrupalNode[];
  };
}

export function NodeProduct({
  node,
  additionalContent,
  ...props
}: NodeProductProps) {
  const breakPoints = [
    { width: 550, itemsToShow: 1, itemsToScroll: 1, itemPadding: [0, 30] },
    { width: 600, itemsToShow: 3, itemsToScroll: 3 },
  ];

  return (
    <article {...props}>
      <div className="grid grid-cols-2 justify-items-center max-[1024px]:flex max-[1024px]:flex-col pt-10">
        {node.field_product_image && (
          <figure className="border-3 rounded-[10px]  border-[#0F5C9A] max-[1280px]:w-[80%] max-[1024px]:flex max-[1024px]:justify-center max-[1024px]:w-[70%] max-[1024px]:mx-auto">
            <Image
              src={absoluteUrl(node.field_product_image.uri.url)}
              width={640}
              height={400}
              className="rounded-2xl"
              alt={node.field_product_image.resourceIdObjMeta.alt}
              priority
            />
            {node.field_product_image.resourceIdObjMeta.title && (
              <figcaption className="py-2 text-sm text-center text-gray-600">
                {node.field_product_image.resourceIdObjMeta.title}
              </figcaption>
            )}
          </figure>
        )}
        <div className="pt-20 max-[1024px]:w-[80%] max-[1024px]:mx-auto">
          <h1 className="text-center mb-4 text-[64px] font-black leading-tight max-[768px]:text-[36px]">
            {node.title}
          </h1>
          <div className="flex gap-5 justify-center">
            {node.field_product_category && (
              <Link
                key={node.field_product_category.id}
                href={node.field_product_category.path.alias}
              >
                <Chip key={node.field_product_category.name}>
                  {node.field_product_category.name}
                </Chip>
              </Link>
            )}
          </div>
          <h3 className="flex font-bold text-[32px] max-[768px]:text-[28px]">
            Marca:{" "}
            <p className="pl-2 text-[32px] text-[#0F5C9A] max-[768px]:text-[28px]">
              {node.field_product_brand.name}
            </p>
          </h3>
          <h3 className="flex font-bold text-[32px] max-[768px]:text-[28px] py-5">
            Categoria:{" "}
            <p className="pl-2 text-[32px] text-[#0F5C9A] max-[768px]:text-[28px]">
              {node.field_product_category.name}
            </p>
          </h3>
          <h3 className="flex font-bold text-[40px] max-[768px]:text-[32px]">
            Precio:{" "}
            <p className="pl-2 text-[40px] text-[#0F5C9A] max-[768px]:text-[32px]">
              ₡{node.field_product_price}
            </p>
          </h3>
          <div className="pt-5 max-[1024px]:flex max-[1024px]:justify-center ">
            <Button className="bg-[#0F5C9A] font-bold text-center text-[32px] text-white py-6 max-[768px]:text-[26px] max-[360px]:text-[18px]">
              Consultar Producto
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svgv"
                className="ml-2"
              >
                <path
                  d="M0.92926 39.1488L3.62213 29.3151C1.96106 26.437 1.08734 23.1722 1.08856 19.8275C1.09283 9.36399 9.60786 0.851135 20.0711 0.851135C25.1487 0.853271 29.9146 2.82958 33.4986 6.41661C37.0823 10.0036 39.0552 14.7717 39.0534 19.8428C39.0488 30.306 30.5326 38.8201 20.0711 38.8201C20.0705 38.8201 20.0714 38.8201 20.0711 38.8201H20.0629C16.886 38.8189 13.7647 38.0221 10.9921 36.5099L0.92926 39.1488ZM11.4581 33.0746L12.0346 33.4161C14.4565 34.8534 17.2333 35.6136 20.065 35.6151H20.0711C28.7668 35.6151 35.8445 28.5387 35.8481 19.8416C35.8497 15.6268 34.2103 11.6635 31.2314 8.68223C28.2523 5.70098 24.2914 4.05822 20.0769 4.05639C11.3742 4.05639 4.29688 11.1319 4.29352 19.8287C4.2923 22.8091 5.12604 25.7113 6.70564 28.2229L7.081 28.8198L5.48676 34.6401L11.4581 33.0746Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.3268 11.8942C14.9716 11.1044 14.5975 11.0886 14.2593 11.0748C13.9828 11.0629 13.6664 11.0635 13.3505 11.0635C13.0344 11.0635 12.5204 11.1826 12.0859 11.6571C11.651 12.1317 10.4254 13.2791 10.4254 15.6128C10.4254 17.9468 12.1252 20.2018 12.3624 20.5185C12.5995 20.835 15.6436 25.7771 20.4645 27.6783C24.4711 29.2585 25.2862 28.9442 26.156 28.8651C27.0257 28.7861 28.9621 27.7177 29.3573 26.6102C29.7528 25.5027 29.7528 24.5536 29.634 24.3549C29.5153 24.1575 29.1992 24.0388 28.7249 23.8016C28.2507 23.5645 25.9188 22.4167 25.484 22.2587C25.0491 22.1003 24.7329 22.0215 24.4168 22.4964C24.1003 22.9706 23.1921 24.0388 22.9153 24.3549C22.6385 24.672 22.3617 24.7117 21.8875 24.4743C21.4132 24.2365 19.8855 23.736 18.0734 22.1201C16.6635 20.8631 15.7114 19.3103 15.4346 18.8355C15.1581 18.3612 15.43 18.1269 15.643 17.8678C16.0266 17.4012 16.6702 16.5622 16.8283 16.2461C16.9864 15.9293 16.9073 15.6525 16.7889 15.4151C16.6702 15.1779 15.7483 12.8324 15.3268 11.8942Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>
            Posted by{" "}
            <span className="font-semibold">{node.uid?.display_name}</span>
          </span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div> */}
      {node.field_product_description?.processed && (
        <div
          dangerouslySetInnerHTML={{
            __html: node.field_product_description?.processed,
          }}
          className="mt-6 pb-10 w-[84%] mx-auto text-[18px] leading-loose "
        />
      )}
      <div className="p-10 h-max bg-featuredSection">
        <div className={`md:w-4/5 m-auto`}>
          <h2
            className={`text-darkBlue text-center text-2xl font-bold w-1/2 mx-auto mb-4 pb-2 md:text-start md:mx-10 md:w-auto md:inline-block lg:mx-32 lg:text-4xl  ${styles.section_title}`}
          >
            PRODUCTOS RELACIONADOS
          </h2>
          <Carousel itemsToShow={3} breakPoints={breakPoints} isRTL={false}>
            {additionalContent["relatedProducts"]?.length ? (
              additionalContent["relatedProducts"].map((node) => (
                <div key={node.id}>
                  <NodeProductTeaser node={node} />
                </div>
              ))
            ) : (
              <p className="py-4">No nodes found</p>
            )}
          </Carousel>
        </div>
      </div>
    </article>
  );
}
