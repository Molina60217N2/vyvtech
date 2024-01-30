import { DrupalNode } from "next-drupal";
import { NodeProductTeaser } from "./node--product--teaser";
import Carousel from '@itseasy21/react-elastic-carousel';

export default function FeaturedProducts({products, ...props}) {
    console.log(products)
    return(
        <Carousel>
        {products.map((product) => (
          <div key={product.id}>
            <NodeProductTeaser node={product} />
          </div>
        ))}
        </Carousel>
       
    )
}