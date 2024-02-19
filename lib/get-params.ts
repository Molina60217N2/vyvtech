import { DrupalJsonApiParams } from "drupal-jsonapi-params"

export function getParams(
    name: string,
    mode: string = null
): DrupalJsonApiParams {
    const params = new DrupalJsonApiParams()

    name = mode ? `${name}--${mode}` : name

    if (name === "node--product"){
        return params
        .addInclude(["uid","field_product_image","field_product_category","field_product_brand"])
        .addFields("node--product",[
            "title",
            "field_product_description",
            "field_product_price",
            "uid",
            "created",
            "field_product_image",
            "path",
            "field_product_category",
            "field_product_brand"
        ])
        .addFields("taxonomy_term--product_categories", ["name", "patch", "uri", "url"])
        .addFields("taxonomy_term--product_brands", ["name", "patch"])
    }

    if(name === "taxonomy_term--product_categories"){
        return params
        .addInclude(["field_category_image","uid"])
        .addFields("taxonomy_term--product_categories", ["name", "patch", "uri", "url"])
    }
    if(name === "taxonomy_term--product_brands"){
        return params
        .addFields("taxonomy_term--product_brands", ["name", "patch"])
    }
}