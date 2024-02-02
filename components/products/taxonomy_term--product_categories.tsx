import * as React from 'react'
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"
import {NodeProductTeaser} from "./node--product--teaser"

export interface TaxonomyProductCategoryProps {
    term: DrupalTaxonomyTerm
    additionalContent: {
        termContent: DrupalNode[]
    }
}

export function TaxonomyProductCategory({
    term,
    additionalContent,
}: TaxonomyProductCategoryProps){
    return(
        <div className="bg-[#EEEDED] pt-7 pb-7 md:pt-1">
        <div className="ml-10 mt-10 max-[768px]:ml-3 max-[768px]:mt-0 max-[768px]:mb-8">
        </div>
      <div className=" flex w-[100%] justify-center text-center font-bold text-5xl pb-10 max-[768px]:text-2xl">
        Categoría:
        <h1 className="text-[#C93400] pl-2">{term.name}</h1>
      </div>
      <div className="grid justify-items-center grid-cols-1 justify-center w-auto md:grid-cols-2 lg:grid-cols-3 md:col-auto md:gap-3 2xl:grid-cols-4">
        {additionalContent?.termContent.map((node) => (
          <React.Fragment key={node.id}>
            {node.type === "node--product" && <NodeProductTeaser node={node} />}
          </React.Fragment>
        ))}
      </div>
    </div> 
    )
}
