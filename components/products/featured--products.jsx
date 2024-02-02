import { DrupalNode } from "next-drupal";
import { NodeProductTeaser } from "./node--product--teaser";
import Carousel from "@itseasy21/react-elastic-carousel";
import styles from "./featured--products.module.css";

export default function FeaturedProducts({ products, ...props }) {
  const breakPoints = [
    { width: 550, itemsToShow: 1, itemsToScroll: 1, itemPadding: [0, 30] },
    { width: 600, itemsToShow: 3, itemsToScroll: 2 },
  ];
  return (
    <div className="p-5 h-max bg-featuredSection mb-4">
      <div className={`md:w-4/5 m-auto`}>
        <h2
          className={`text-darkBlue text-center text-2xl font-bold w-1/2 mx-auto mb-4 pb-2 md:text-start md:mx-10 md:w-auto md:inline-block lg:mx-32 lg:text-4xl  ${styles.section_title}`}
        >
          PRODUCTOS DESTACADOS
        </h2>

        <Carousel itemsToShow={3} breakPoints={breakPoints}>
          {products.map((product) => (
            <div key={product.id}>
              <NodeProductTeaser node={product} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
