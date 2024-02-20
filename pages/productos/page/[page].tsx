import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { drupal } from "lib/drupal";
import {
  DrupalNode,
  DrupalTaxonomyTerm,
  JsonApiResponse,
  deserialize,
} from "next-drupal";
import { Layout } from "@/components/layout";
import { NodeProductTeaser } from "@/components/products/node--product--teaser";
import FilterBtns from "@/components/products/filters-btns";
import React from "react";
import { PagerProps, Pager } from "components/pager";
interface ProductosPageProps {
  nodes: DrupalNode[];
  brands: DrupalTaxonomyTerm[];
  categories: DrupalTaxonomyTerm[];
  page: Pick<PagerProps, "current" | "total">;
}
const PRODUCTS_PER_PAGE = 24;
export default function IndexPage({
  nodes,
  page,
  brands,
  categories,
}: ProductosPageProps) {
  return (
    <Layout>
      <div className="pt-7 pb-7 md:pt-14">
        <div className="grid bg-[#EEF4F8] p-10 align-center justify-center">
          <h1 className="text-center mb-6 text-2xl font-bold text-darkBlue md:text-6xl">
            Nuestros Productos
          </h1>
          <FilterBtns categories={categories} brands={brands} />
        </div>

        <div
          className={`grid justify-items-center grid-cols-1 justify-center w-auto md:grid-cols-2 md:col-auto lg:grid-cols-4 gap-4`}
        >
          {nodes?.length ? (
            nodes.map((node) => <NodeProductTeaser node={node} key={node.id} />)
          ) : (
            <p className="py-4">No nodes found</p>
          )}
        </div>
      </div>
      {/*  Paginator */}
      <div className="flex items-center justify-center mt-8 mb-8">
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
    .addFields("taxonomy_term--product_brand", ["name", "path"])
    .addFilter("status", "1")
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

  const categoriesParams = new DrupalJsonApiParams().addFields(
    "taxonomy_term--product_categories",
    ["name", "path", "id"]
  );
  const categoriesResult =
    await drupal.getResourceCollectionFromContext<JsonApiResponse>(
      "taxonomy_term--product_categories",
      context,
      {
        deserialize: false,
        params: {
          ...categoriesParams.getQueryObject(),
        },
      }
    );
  if (!result.data?.length) {
    return {
      notFound: true,
    };
  }
  const count = Math.ceil(result.meta.count / PRODUCTS_PER_PAGE);
  const nodes = deserialize(result) as DrupalNode[];
  const brands = deserialize(brandsResult) as DrupalTaxonomyTerm[];
  const categories = deserialize(categoriesResult) as DrupalTaxonomyTerm[];
  return {
    props: {
      nodes,
      brands,
      categories,
      page: {
        current,
        total: count,
      },
    },
  };
}
