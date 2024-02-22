import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode, deserialize } from "next-drupal";

import { drupal } from "lib/drupal";
import { Layout } from "components/layout";
import { NodeProductTeaser } from "components/products/node--product--teaser";
import FeaturedProducts from "components/products/featured--products";
import Brands from "components/brands-static/brands";
import Services from "@/components/homepage/Services";
interface IndexPageProps {
  featured: DrupalNode[];
  nodes: DrupalNode[];
}

export default function IndexPage({ featured, nodes }: IndexPageProps) {
  return (
    <Layout>
      <Head>
        <title>V&V Technologies</title>
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
      <div>
        <Brands />
      </div>
      <Services />
      <div>
        <FeaturedProducts products={featured} />
      </div>
      <div className="bg-[#E4EAEE] pb-20">
        <h2 className="text-4xl text-darkBlue border-[#0F5C9A] border-b-4 font-bold mb-14 xl:ml-[315px] pt-14 max-[767px]:text-center md:w-[445px] max-[1024px]:max-w-[300px] max-[767px]:mx-auto max-[1024px]:text-2xl max-[636px]:max-w-[150px] max-[636px]:pt-12 max-[636px]:mb-9 md:ml-[255px] min-[769px]:ml-[155px]">
          PRODUCTOS MÁS NUEVOS
        </h2>
        <div className="grid min-[1279px]:grid-cols-4 grid-cols-2 justify-items-center max-[1365px]:mx-3 max-[1279px]:mx-20 gap-y-5 max-[800px]:mx-3 min-[1025px]:gap-5 max-[1024px]:gap-10 max-[600px]:gap-3">
          {nodes.map((node) => (
            <div key={node.id}>
              <NodeProductTeaser node={node} />
            </div>
          ))}
        </div>
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

  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--product",
    context,
    {
      params: {
        "fields[node--product]":
          "title,path,field_product_image,uid,created,field_product_price,field_product_brand",
        include: "field_product_image,uid,field_product_brand",
        "page[limit]": 24,
      },
    }
  );

  return {
    props: {
      featured,
      nodes,
    },
  };
}
