import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { DrupalNode, deserialize } from "next-drupal";
import { absoluteUrl, formatDate } from "lib/utils";
import { useSearch } from "hooks/use-search";
import { Layout } from "components/layout";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import NotFound from "@/public/404.jpg";
import Head from "next/head";
import { useFilter } from "@/hooks/use-filter";
import { PagerProps, Pager } from "components/pager";

export default function SearchPage() {
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
  // console.log(
  //   Math.ceil(parseInt(results[results.length - 2] as unknown as string) / 24)
  // );

  return (
    <Layout>
      <Head>
        <title>Filtros</title>
        <meta
          name="description"
          content="El arte de forjar el Hierro Convierte tus ideas en productos de alta calidad"
        />
      </Head>
      <div className="justify-center items-center flex">
        {/* LOADING */}
        {isLoading && brand && category && (
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
          </div>
        )}
        {/* Resultados de los filtros */}
        {results?.length ? (
          <div className="bg-[#EEEDED] pt-7 pb-7 md:pt-1 w-full">
            <div className="ml-10 mt-10 max-[768px]:ml-3 max-[900px]:mt-5 max-[900px]:mb-8"></div>
            <h1 className="pb-10 text-center text-5xl max-[768px]:text-2xl"></h1>
            <div className="grid justify-items-center grid-cols-1 justify-center w-auto md:grid-cols-2 md:col-auto lg:grid-cols-4 gap-4">
              {results.slice(0, results.length - 2).map((result, key) => (
                <div key={key}>{result.title}</div>
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
//   console.log("CONTEXT")
//   console.log(context)
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
