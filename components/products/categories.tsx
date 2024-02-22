import { DrupalTaxonomyTerm } from "next-drupal";
import Image from "next/image";
import { absoluteUrl } from "lib/utils";
interface CategoriesInterface {
  categories: DrupalTaxonomyTerm[];
}

export default function Categories({
  categories,
  ...props
}: CategoriesInterface) {
  const categoriesDescription = categories["data"];
  const categoriesImages = categories["included"];
  //   console.log("DESDE EL CATEGORIES XD");
  //   console.log(categoriesDescription);
  //   console.log(categoriesImages);
  return (
    <div className="bg-slate-500">
      <h1>Categorias</h1>
      {categoriesDescription.map((category, key) => (
        <div key={key}>
          <p>{category.attributes.name}</p>
          <div>
            <Image
              src={absoluteUrl(categoriesImages[key].attributes.uri.url)}
              width={100}
              height={100}
              alt="jeje"
            ></Image>
          </div>
        </div>
      ))}
    </div>
  );
}
