import { useSearch } from "@/hooks/use-search";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "@/components/layout";
import Head from "next/head";
import { absoluteUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function SearchPage() {
  const router = useRouter();
  const [keys, setKeys] = React.useState<string>(null);
  const { isLoading, results } = useSearch(keys);
  React.useEffect(() => {
    if (router.query?.keys) {
      setKeys(router.query.keys as string);
    }
  }, [router]);

  return (
    <Layout>
      <Head>
        <title>{keys} | V&V Technologies</title>
        <meta
          name="description"
          content="V&V Technologies, encuentra tus productos de mejor calidad al mejor precio"
        />
      </Head>
      {/* LOADING */}
      {isLoading && keys && (
        <div
          aria-label="Loading..."
          role="status"
          className="flex items-center"
        >
          <svg
            className="h-20 w-20 animate-spin stroke-gray-500"
            viewBox="0 0 256 256"
          >
            <line
              x1="128"
              y1="32"
              x2="128"
              y2="64"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="195.9"
              y1="60.1"
              x2="173.3"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="224"
              y1="128"
              x2="192"
              y2="128"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="195.9"
              y1="195.9"
              x2="173.3"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="128"
              y1="224"
              x2="128"
              y2="192"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="60.1"
              y1="195.9"
              x2="82.7"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="32"
              y1="128"
              x2="64"
              y2="128"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="60.1"
              y1="60.1"
              x2="82.7"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
          </svg>
          <span className="max-[768px]:text-2xl text-4xl font-medium text-gray-500">
            Buscando {keys}
          </span>
        </div>
      )}
      {/* Resultados de la busqueda */}
      {results?.length ? (
        <div className="bg-[#EEEDED] pt-7 pb-7 md:pt-1 w-full">
          <h1 className="pb-10 text-center text-5xl max-[768px]:text-2xl mt-5">
            Resultados de la búsqueda:{" "}
            <span className="font-bold text-darkBlue">{keys}</span>
          </h1>
          <div className="grid justify-items-center grid-cols-1 justify-center w-auto md:grid-cols-2 md:col-auto lg:grid-cols-4 gap-4">
            {results.map((result) => (
              <div className="bg-EEF4F8 mt-4 shadow-xl rounded-3xl">
                {/* card */}
                <div className="bg-white rounded-3xl h-full p-4 lg:max-w-80 drop-shadow-md">
                  <div className="sm:max-h-72 md:max-h-48 lg:max-h-72 overflow-hidden">
                    <Image
                      src={absoluteUrl(result.field_product_image.uri.url)}
                      alt={result.field_product_image.resourceIdObjMeta.alt}
                      width={800}
                      height={400}
                      // objectFit="contain"
                      className="rounded-t-md"
                    />
                  </div>
                  <div className="grid gap-3">
                    <p className="text-sm text-darkBlue font-bold md:text-lg mt-8">
                      {result.title}
                    </p>
                    <p className="text-sm md:text-base font-normal text-lightGray">
                      {result.field_product_brand.name}
                    </p>
                    <p className="text-sm text-darkBlue font-bold md:text-lg">
                      ¢{result.field_product_price}
                    </p>
                    <Link
                      href={result.path.alias}
                      className="flex justify-center"
                    >
                      <Button className="bg-darkBlue rounded-3xl">
                        <span className="text-sm md:text-base text-white">
                          Ver producto
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </Layout>
  );
}
