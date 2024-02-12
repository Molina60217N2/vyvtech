import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { NextApiRequest, NextApiResponse } from "next"

import { drupal } from "lib/drupal"
import {
  DrupalNode, JsonApiResponse, deserialize,
} from "next-drupal";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const PRODUCTS_PER_PAGE = 24;
  try {
    // Only accept POST requests.
    if (req.method !== "POST") {
      return res.status(405).end()
    }

    // The body field will contain the filter params.
    const body = JSON.parse(req.body)
    const params = new DrupalJsonApiParams()
      .addFields("node--product", [
        "title",
        "field_product_body",
        "uid",
        "created",
        "field_product_image",
        "path",
        "field_product_brand",
        "field_product_category"
      ])
      .addFields("taxonomy_term--product_brands", ["name", "path"])
      .addFields("taxonomy_term--product_categories", ["name", "path"])
      .addInclude(["uid", "field_product_image", "field_product_category", "field_product_brand"])
      // .addFilter("field_product_brand.name", body.brand, "IN")
      // .addFilter("field_product_category.name", body.category, "IN")
      .addPageLimit(PRODUCTS_PER_PAGE)
      .addPageOffset(body.current ? PRODUCTS_PER_PAGE * body.current : 0)
    if (body.brand) {
      params.addFilter("field_product_brand.name", body.brand, "IN")
    }
    if (body.category) {
      params.addFilter("field_product_category.name", body.category, "IN")
    }
    // 1. Filter all products with the filter params.
    const result = await drupal.getResourceCollection<JsonApiResponse>("node--product", {
      locale: body.locale,
      defaultLocale: body.defaultLocale,
      deserialize: false,
      params: params.getQueryObject()
    })
    const products = deserialize(result) as DrupalNode[]
    const total = result.meta.count
    res.json([...products, total, body.current])
  } catch (error) {
    res.status(500).end(error)
  }
}
