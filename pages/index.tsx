import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode } from "next-drupal";

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"
import { NodeProductTeaser } from "components/products/node--product--teaser"
import FeaturedProducts from "components/products/featured--products"
import Brands from "components/brands-static/brands"
import Services from '@/components/homepage/Services'
interface IndexPageProps {
  featured: DrupalNode[];
}

export default function IndexPage({ featured }: IndexPageProps) {
  return (
    <Layout>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <Services/>
      <div>
        <Brands/>
      </div>
      <div>
        <FeaturedProducts
        products = {featured}/>
      </div>
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

  return {
    props: {
      featured,
    },
  };
}
