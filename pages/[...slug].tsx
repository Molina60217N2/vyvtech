import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"

import { drupal } from "lib/drupal"
import { NodeArticle } from "components/node--article"
import { NodeBasicPage } from "components/node--basic-page"
import { NodeProduct, NodeProductProps } from "components/products/node--product"
import { Layout } from "components/layout"
import { TaxonomyProductCategoryProps, TaxonomyProductCategory } from "@/components/products/taxonomy_term--product_categories"
import { PageProps } from "@/types"
import { getParams } from "@/lib/get-params"
import { absoluteUrl } from "@/lib/utils"


const RESOURCE_TYPES = [
  "node--page", 
  "node--article",
  "taxonomy_term--product_categories",
  "taxonomy_term--product_brands",
]

interface NodePageProps extends PageProps {
  resource: DrupalNode | DrupalTaxonomyTerm
}

export default function NodePage({ resource, additionalContent }: NodePageProps) {
  if (!resource) return null

  return (
    <Layout>
      <Head>
        <title>{resource.title || resource.name}</title>
        <meta name="description" content="A Next.js site powered by Drupal." />
      </Head>
      {/* {resource.type === "node--page" && <NodeBasicPage node={resource} />}
      {resource.type === "node--article" && <NodeArticle node={resource} />} */}
      {resource.type === "node--product" && <NodeProduct node={resource as DrupalNode} additionalContent = {additionalContent as NodeProductProps["additionalContent"]} />}
      {resource.type === "taxonomy_term--product_categories" && <TaxonomyProductCategory term={resource as DrupalTaxonomyTerm} additionalContent={additionalContent as TaxonomyProductCategoryProps["additionalContent"]}/>}
    </Layout>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context),
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context)

  if (!path) {
    return {
      notFound: true,
    }
  }

  const type = path.jsonapi.resourceName

  let params = {}
  if (type === "node--article") {
    params = {
      include: "field_image,uid",
    }
  }
  if (type === "node--product") {
    params = {
      include: "field_product_image,uid,field_product_brand,field_product_category",
    }
  }

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params,
    }
  )

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`)
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    }
  }
// Fetch additional content for pages.
let additionalContent: PageProps["additionalContent"] = {}

if (resource.type === "taxonomy_term--product_categories") {
  // Fetch the term content.
  // Tags can show both recipes and articles.
  additionalContent["termContent"] = [
    ...(await drupal.getResourceCollectionFromContext(
      "node--product",
      context,
      {
        params: getParams("node--product")
          .addSort("created", "DESC")
          .addFilter("field_product_category.id", resource.id, "IN")
          .getQueryObject(),
      }
    )),
  ]
}

if (resource.type === "node--product") {

 additionalContent["relatedProducts"] = [
  ...(await drupal.getResourceCollectionFromContext(
    "node--product",
    context,
    {
      params: getParams("node--product")
      .addFilter("id", resource.id, "<>")
      .addFilter("field_product_category.id", resource.field_product_category.id)
      .addPageLimit(12)
      .getQueryObject(),
    }
  )),
 ]
}



  return {
    props: {
      resource,
      additionalContent,
    },
  }
}
