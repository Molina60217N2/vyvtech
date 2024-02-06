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
import { Button, Pagination } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
interface ProductosPageProps {
  nodes: DrupalNode[];
  count: number;
}
const PRODUCTS_PER_PAGE = 24;
export default function IndexPage({ nodes, count }: ProductosPageProps) {
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

  return (
    <Layout>
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
          showControls
          classNames={{
            cursor:
              "bg-darkBlue shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
          }}
          total={pages.length}
          initialPage={current + 1}
          onChange={(page: number) => {
            router.push("/productos?page=" + (page - 1).toString());
          }}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(
  context
): Promise<GetServerSidePropsResult<ProductosPageProps>> {
  var current = 0;
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
    // .addFields("taxonomy_term--product_brand", ["name", "path"])
    .addFilter("status", "1")
    // .addFilter("field_featured_product", "0")
    .addSort("created", "DESC");
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
  if (!result.data?.length) {
    return {
      notFound: true,
    };
  }
  const count = result.meta.count;
  const nodes = deserialize(result) as DrupalNode[];
  return {
    props: {
      nodes,
      count,
    },
  };
}
