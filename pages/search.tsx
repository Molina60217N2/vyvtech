import { useSearch } from "@/hooks/use-search";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "@/components/layout";
import Head from "next/head";
import { absoluteUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import Error from "@/public/404.jpg";

export default function SearchPage() {
  const router = useRouter();
  const [keys, setKeys] = React.useState<string>(null);
  const { isLoading, results } = useSearch(keys);
  React.useEffect(() => {
    if (router.query?.keys) {
      setKeys(router.query.keys as string);
    }
  }, [router]);
  const loader = Array(24)
    .fill(null)
    .map((_, i) => i + 1);
  return (
    <Layout>
      <Head>
        <title>{keys} | V&V Technologies</title>
        <meta
          name="description"
          content="V&V Technologies, encuentra tus productos de mejor calidad al mejor precio."
        />
        <meta
          property="og:image"
          content="https://www.vyvtechnologies.com/logo.png"
        />
        <meta property="og:title" content="V&V Technologies" />
        <meta
          property="og:description"
          content="V&V Technologies, encuentra tus productos de mejor calidad al mejor precio."
        />
        <meta property="og:url" content="https://www.vyvtechnologies.com/" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </Head>
      {/* LOADING */}
      {isLoading && keys && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 md:col-auto lg:grid-cols-4 gap-4">
          {loader.map((item) => (
            <div
              key={item}
              className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse"
            >
              <div className="h-48 bg-gray-300"></div>
              <div className="px-6 py-4">
                <div className="h-6 bg-gray-300 mb-2"></div>
                <div className="h-4 bg-gray-300 w-2/3"></div>
              </div>
              <div className="px-6 pt-4 pb-2">
                <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-300 w-1/2"></div>
              </div>
            </div>
          ))}
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
            {results.map((result, key) => (
              <div key={key} className="bg-EEF4F8 mt-4 shadow-xl rounded-3xl">
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
      {!isLoading && !results?.length ? (
        <section className="pb-10 pt-5">
          <div className="flex flex-col items-center justify-center">
            <div>
              <h2 className="text-center text-6xl font-bold text-[#0F5C9A]">
                Oops.
              </h2>
            </div>
            <div className="py-3">
              <h4 className="text-center text-xl">
                No podemos encontrar el producto que estas buscando
              </h4>
            </div>
            <div className="pb-3">
              <p className="text-center text-sm">
                Es posible que haya caducado o que haya un error tipográfico.
                Tal vez puedas encontrar lo que necesitas en nuestra página de
                productos.
              </p>
            </div>
            <div className="pt-3">
              <Button
                as={Link}
                href="/productos"
                className="bg-[#0F5C9A] tex-[18px] font-bold text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 7.57371L7.5 2.37591L2 7.57371V12.6241H13V7.57371ZM6.81314 0.273208L0 6.712V14.6241H15V6.712L8.18686 0.273209C7.8014 -0.0910692 7.1986 -0.0910698 6.81314 0.273208Z"
                    fill="white"
                  />
                </svg>
                Volver al inicio
              </Button>
            </div>
            <div className="pt-5">
              <Image
                className="rounded-3xl"
                src={Error}
                alt="error"
                width={600}
                height={600}
                placeholder="blur"
              />
            </div>
          </div>
        </section>
      ) : null}
    </Layout>
  );
}
