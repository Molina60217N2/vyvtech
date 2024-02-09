import { getParams } from "@/lib/get-params";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { GetServerSidePropsResult } from "next";
import { drupal } from "lib/drupal";
import {
  DrupalNode,
  DrupalTaxonomyTerm,
  JsonApiResponse,
  deserialize,
} from "next-drupal";
import { Layout } from "@/components/layout";
import { NodeProductTeaser } from "@/components/products/node--product--teaser";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Skeleton,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import React from "react";
interface ProductosPageProps {
  nodes: DrupalNode[];
  brands: DrupalTaxonomyTerm[];
  count: number;
}
const PRODUCTS_PER_PAGE = 24;
export default function IndexPage({
  nodes,
  count,
  brands,
}: ProductosPageProps) {
  const router = useRouter();
  const params = useSearchParams();
  var current = 0;
  if (params.get("page")) {
    current = parseInt(params.get("page"));
  }

  const pages = [];
  for (let i = 0; i < Math.ceil(count / PRODUCTS_PER_PAGE); i++) {
    pages.push(i);
  }
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set(["Categoria"])
  );

  const selectedValue = params.get("brand");
  const componentes = Array(12).fill(
    <Card className="w-[200px] space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
  return (
    <Layout>
      {isLoading ? (
        // cargando
        <div className="pt-7 pb-7 md:pt-14">
          <div
            className={`grid grid-cols-1 justify-items-center items-center justify-center w-auto md:grid-cols-2 lg:grid-cols-3 md:col-auto md:gap-3 min-[1550px]:grid-cols-4`}
          >
            {componentes.map((componente, index) => (
              <div key={index}>{componente}</div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize">
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              {brands.map((brand) => (
                <DropdownItem
                  key={brand.name}
                  onClick={() => {
                    current = 0;
                    router.push("/productos?page=0" + "&brand=" + brand.name);
                  }}
                >
                  {brand.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <div className="pt-7 pb-7 md:pt-14">
            <h1>Pagina de producots</h1>
            <h1>{count}</h1>
            <div
              className={`grid grid-cols-1 justify-items-center items-center justify-center w-auto md:grid-cols-2 lg:grid-cols-3 md:col-auto md:gap-3 min-[1550px]:grid-cols-4`}
            >
              {nodes?.length ? (
                nodes.map((node) => (
                  <div key={node.id}>
                    <NodeProductTeaser node={node} />
                  </div>
                ))
              ) : (
                <p className="py-4">No nodes found</p>
              )}
            </div>
          </div>
          {/*  Paginator */}
          <div className="flex items-center justify-center mt-8 mb-8">
            <Pagination
              loop
              classNames={{
                cursor:
                  "bg-darkBlue shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
              }}
              total={pages.length}
              initialPage={current + 1}
              onChange={(page: number) => {
                if (params.get("brand")) {
                  console.log(params.get("brand"));
                  router.push(
                    "/productos?page=" +
                      (page - 1).toString() +
                      "&brand=" +
                      params.get("brand")
                  );
                } else {
                  router.push("/productos?page=" + (page - 1).toString());
                }
              }}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(
  context
): Promise<GetServerSidePropsResult<ProductosPageProps>> {
  var current = 0;
  const brand = context.query.brand;
  if (context.query.page) {
    current = parseInt(context.query.page);
  }

  const params = new DrupalJsonApiParams()
    .addInclude(["uid", "field_product_image", "field_product_brand"])
    .addFields("node--product", [
      "title",
      "field_product_body",
      "uid",
      "created",
      "field_product_image",
      "path",
      "field_product_type",
      "field_product_price",
      "field_product_brand",
    ])
    .addFields("user--user", ["field_name"])
    .addFields("taxonomy_term--product_brand", ["name", "path"])
    .addFilter("status", "1")
    .addSort("created", "DESC");
  if (brand) {
    params.addFilter("field_product_brand.name", brand);
  }

  const result = await drupal.getResourceCollectionFromContext<JsonApiResponse>(
    "node--product",
    context,
    {
      deserialize: false,
      params: {
        ...params.getQueryObject(),
        page: {
          limit: PRODUCTS_PER_PAGE,
          offset: PRODUCTS_PER_PAGE * current,
        },
      },
    }
  );
  const brandsParams = new DrupalJsonApiParams().addFields(
    "taxonomy_term--product_brands",
    ["name", "path", "id"]
  );
  const brandsResult =
    await drupal.getResourceCollectionFromContext<JsonApiResponse>(
      "taxonomy_term--product_brands",
      context,
      {
        deserialize: false,
        params: {
          ...brandsParams.getQueryObject(),
        },
      }
    );

  if (!result.data?.length) {
    return {
      notFound: true,
    };
  }
  const count = result.meta.count;
  const nodes = deserialize(result) as DrupalNode[];
  const brands = deserialize(brandsResult) as DrupalTaxonomyTerm[];
  return {
    props: {
      nodes,
      brands,
      count,
    },
  };
}
