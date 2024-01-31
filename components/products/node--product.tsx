import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface NodeProductProps {
  node: DrupalNode
}

export function NodeProduct({ node, ...props }: NodeProductProps) {
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
      <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>
            Posted by{" "}
            <span className="font-semibold">{node.uid?.display_name}</span>
          </span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div>
      {node.field_product_image && (
        <figure>
          <Image
            src={absoluteUrl(node.field_product_image.uri.url)}
            width={768}
            height={400}
            alt={node.field_product_image.resourceIdObjMeta.alt}
            priority
          />
          {node.field_product_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_product_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {node.field_product_description?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.field_product_description?.processed }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}
    </article>
  )
}
