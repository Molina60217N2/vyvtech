import { getParams } from "@/lib/get-params";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { drupal } from "lib/drupal";
import {
  DrupalNode,
  DrupalTaxonomyTerm,
  JsonApiResponse,
  getResourceCollectionFromContext,
  deserialize,
} from "next-drupal";
import { Layout } from "@/components/layout";
import { NodeProductTeaser } from "@/components/products/node--product--teaser";
import { PagerProps, Pager } from "components/pager";
interface ProductosPageProps {
  nodes: DrupalNode[];
  page: Pick<PagerProps, "current" | "total">;
  //   categories: DrupalTaxonomyTerm[];
}
const PRODUCTS_PER_PAGE = 12;
export default function IndexPage({ nodes, page }: ProductosPageProps) {
  return (
    <Layout>
      <div className="pt-7 pb-7 md:pt-14">
        <h1>Pagina de producots</h1>
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

        <Pager
          current={page.current}
          total={page.total}
          href={(page) =>
            page === 0 ? `/productos` : `/productos/page/${page}`
          }
        />
      </div>
    </Layout>
  );
}
export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  const params = new DrupalJsonApiParams()
    .addFilter("status", "1")
    .addPageLimit(1);
  const result = await drupal.getResourceCollectionFromContext<JsonApiResponse>(
    "node--product",
    context,
    {
      deserialize: false,
      params: params.getQueryObject(),
    }
  );
  const totalPages = Math.ceil(result.meta.count / PRODUCTS_PER_PAGE);

  const paths = Array.from({ length: totalPages }, (_, page) => ({
    params: {
      page: `${page + 1}`,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<ProductosPageProps>> {
  const current = parseInt(context.params.page);
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
  const nodes = deserialize(result) as DrupalNode[];
  return {
    props: {
      nodes,
      page: {
        current,
        total: Math.ceil(result.meta.count / PRODUCTS_PER_PAGE),
      },
    },
  };
}
