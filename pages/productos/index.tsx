import { getParams } from "@/lib/get-params";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { GetStaticPropsResult } from "next";
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
interface ProductosPageProps {
  nodes: DrupalNode[];
  //   categories: DrupalTaxonomyTerm[];
}
const PRODUCTS_PER_PAGE = 10;
export default function IndexPage({ nodes }: ProductosPageProps) {
  console.log(nodes);
  return (
    <Layout>
      <h1>Pagina de producots</h1>
      {nodes.map((product) => (
        <div key={product.id}>
          <p>{product.title}</p>
        </div>
      ))}
    </Layout>
  );
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<ProductosPageProps>> {
  const result = await drupal.getResourceCollectionFromContext<JsonApiResponse>(
    "node--product",
    context,
    {
      deserialize: false,
      params: {
        "fields[node--product]":
          "title,path,field_product_image,uid,created,field_product_price,field_product_brand",
        include: "field_product_image,uid,field_product_brand",
        // "filter[status]":0,
      },
    }
  );
  const nodes = deserialize(result) as DrupalNode[];
  return {
    props: {
      nodes,
    },
  };
}
