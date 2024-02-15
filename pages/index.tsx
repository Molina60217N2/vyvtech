import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode, DrupalTaxonomyTerm, deserialize, getResourceCollectionFromContext, JsonApiResponse } from "next-drupal";

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeProductTeaser } from "components/products/node--product--teaser"
import FeaturedProducts from "components/products/featured--products"
import Brands from "components/brands-static/brands"
import Services from '@/components/homepage/Services'
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import Category from "@/components/homepage/Category";

interface IndexPageProps {
  featured: DrupalNode[];
  nodes: DrupalNode[];
  tags: DrupalTaxonomyTerm[];
}

export default function IndexPage({ featured, nodes, tags }: IndexPageProps) {
  return (
    <Layout>
      <Head>
        <title>VyV Technology</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div>
        <Brands/>
      </div>
      <Services/>
      <div>
        <FeaturedProducts
        products = {featured}/>
      </div>
      <div className="bg-[#E4EAEE] pb-20">
        <h2 className="text-4xl text-darkBlue border-[#0F5C9A] border-b-4 font-bold mb-14 xl:ml-[315px] pt-14 max-[767px]:text-center md:w-[445px] max-[1024px]:max-w-[300px] max-[767px]:mx-auto max-[1024px]:text-2xl max-[636px]:max-w-[150px] max-[636px]:pt-12 max-[636px]:mb-9 md:ml-[255px] min-[769px]:ml-[155px]">PRODUCTOS MÁS NUEVOS</h2>
        <div className="grid min-[1279px]:grid-cols-4 grid-cols-2 justify-items-center max-[1365px]:mx-3 max-[1279px]:mx-20 gap-y-5 max-[800px]:mx-3 min-[1025px]:gap-5 max-[1024px]:gap-10 max-[600px]:gap-3">
          {nodes.map((node) =>(
            <div key={node.id}>
              <NodeProductTeaser node={node} />
            </div>
          ))}
        </div>
      </div>
      <Category tags={tags}/>
    </Layout>
  );
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const featured = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--product",
    context,
    {
      params: {
        "filter[field_featured_product]": 1, //1 es true XD
        "fields[node--product]":
          "title,path,field_product_image,uid,created,field_product_price,field_product_brand",
        include: "field_product_image,uid,field_product_brand",
        // "filter[status]":0,
      },
    }
  );

  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--product",
    context,
    {
      params: {
        "fields[node--product]":
          "title,path,field_product_image,uid,created,field_product_price,field_product_brand,field_product_category",
        include: "field_product_image,uid,field_product_brand,field_product_category",
        "page[limit]": 24,
      },
    }
  );

const tagParams = new DrupalJsonApiParams()
  .addFields("taxonomy_term--product_categories", ["name","path",])

const tagsResult = await getResourceCollectionFromContext<JsonApiResponse>(
  "taxonomy_term--product_categories",
  context,
  {
    params: {
      ...tagParams.getQueryObject(),
    }
  }
)
const tags = deserialize(tagsResult) as DrupalTaxonomyTerm[]



  return {
    props: {
      featured,
      nodes,
      tags,
    },
  };
}
