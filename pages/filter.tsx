import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { DrupalNode, DrupalTaxonomyTerm, deserialize } from "next-drupal";
import { absoluteUrl, formatDate } from "lib/utils";
import { useSearch } from "hooks/use-search";
import { Layout } from "components/layout";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import NotFound from "@/public/404.jpg";
import Head from "next/head";
import { useFilter } from "@/hooks/use-filter";
import { PagerProps, Pager } from "components/pager";
import { GetStaticPropsResult } from "next";
import { drupal } from "@/lib/drupal";

interface FilterInterface {
  navbarCategories: DrupalTaxonomyTerm[];
}

export default function SearchPage({navbarCategories}: FilterInterface) {
  const router = useRouter();
  const [brand, setBrand] = React.useState<string>(null);
  const [category, setCategory] = React.useState<string>(null);
  const [current, setCurrent] = React.useState<string>(null);
  const { isLoading, results } = useFilter(brand, category, current);

  React.useEffect(() => {
    if (router.query?.brand) {
      setBrand(router.query.brand as string);
    }
    if (router.query?.category) {
      setCategory(router.query.category as string);
    }
    if (router.query?.page) {
      setCurrent(router.query.page as string);
    } else {
      setCurrent("0");
    }
  }, [router]);
  //results[0] => nodos
  //results[1] => total de nodos
  //results[2] => pagina actual
  const loader = Array(24)
    .fill(null)
    .map((_, i) => i + 1);

  return (
    <Layout navbarCategories={navbarCategories}>
      <Head>
        <title>
          {category ? category + " " : ""}
          {brand ? brand + " " : ""} | V&V Technologies
        </title>
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
      <div className="justify-center items-center flex">
        {/* LOADING */}
        {isLoading && (
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
        {/* Resultados de los filtros */}

        {results?.length ? (
          <div className="bg-[#EEEDED] pt-7 pb-7 md:pt-1 w-full">
            <div className="flex flex-col items-center justify-center mt-3 mb-3 gap-4 md:flex-row md:mt-10 md:mb-6">
              <div className="flex flex-col md:flex-row gap-1.5 text-lightBlue font-extrabold">
                {category ? (
                  <h1 className="text-center text-3xl md:text-4xl max-[768px]:text-2x">
                    {category}
                  </h1>
                ) : (
                  ""
                )}
                {brand ? (
                  <h1 className="text-center text-3xl md:text-4xl max-[768px]:text-2x">
                    {brand}
                  </h1>
                ) : (
                  ""
                )}
              </div>
              <Link href={"/productos"}>
                <Button size="lg" className="text-2xl bg-darkBlue text-white">
                  Limpiar Filtros
                </Button>
              </Link>
            </div>
            <div className="grid justify-items-center grid-cols-1 justify-center w-auto md:grid-cols-2 md:col-auto lg:grid-cols-4 gap-4">
              {results.slice(0, results.length - 2).map((result, key) => (
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
            <Pager
              current={parseInt(current)}
              total={Math.ceil(
                parseInt(results[results.length - 2] as unknown as string) / 24
              )}
              href={(page) => {
                var url = `/filter?`;
                if (router.query.brand) {
                  url += `&brand=` + router.query.brand;
                }
                if (router.query.category) {
                  url += `&category` + router.query.category;
                }
                if (page !== 0) {
                  url += `&page=` + page;
                } else {
                  url += `&page=0`;
                }
                return url;
              }}
            />
          </div>
        ) : null}
        {/* NO RESULTS */}
        {!isLoading && !results?.length ? (
          <div className="flex flex-col items-center justify-center mb-5">
            <div>
              <h2 className="text-center text-6xl font-bold text-[#C93400]">
                La búsqueda no dio resultados.
              </h2>
            </div>
            <div className="py-3">
              <h4 className="text-center text-xl">
                No podemos encontrar lo que estás buscando
              </h4>
            </div>
            <div className="pb-3">
              <p className="text-center text-sm">
                Es posible que haya caducado o que haya un error tipográfico.
                Tal vez puedas encontrar lo que necesitas en el catálogo.
              </p>
            </div>

            <div className="pt-5">
              <Image
                className="rounded-lg"
                src={NotFound}
                alt="error"
                width={600}
                height={600}
                placeholder="blur"
              />
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

// export async function getStaticProps(
//   context: GetStaticPropsContext
// ): Promise<GetStaticPropsResult<SearchPageProps>> {
//   const result = await drupal.getResourceCollectionFromContext<JsonApiResponse>(
//     "node--product",
//     context,
//     {
//       deserialize: false,
//       params: getParams("node--product")
//     }
//   )
//   const nodes = deserialize(result) as DrupalNode[]
//   return {
//     props: {
//       nodes
//     },
//   }
// }

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<FilterInterface>> {

  const navbarCategories = await drupal.getResourceCollectionFromContext<
    DrupalTaxonomyTerm[]
  >("taxonomy_term--product_categories", context, {
    deserialize: false,
    params: {
      "fields[taxonomy_term--product_categories]": "name, field_category_image",
      include: "field_category_image",
    },
  });

  return {
    props: {
      navbarCategories,
    },
  };
}