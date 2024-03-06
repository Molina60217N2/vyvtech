import { DrupalTaxonomyTerm } from "next-drupal";
import { Layout } from "@/components/layout"
import Image from "next/image";
import AboutUs from "@/public/about-us.svg"
import { GetStaticPropsResult } from "next";
import { drupal } from "@/lib/drupal";
import Map from "@/components/Map";

interface PruebaAboutInterface {
    navbarCategories: DrupalTaxonomyTerm[];
}

export default function PruebaAboutUs({ navbarCategories }: PruebaAboutInterface) {

  return (
    <Layout navbarCategories={navbarCategories}>
      <div className="">
        <h1 className="text-center font-bold lg:text-6xl text-3xl text-darkBlue mt-10">
          Acerca de Nosotros
        </h1>
        <div className="max-w-[1200px] min-[1200px]:mt-32 mt-20 mx-auto grid min-[1200px]:grid-cols-2 grid-cols-1 min-[1200px]:divide-x-8 divide-x-none divide-darkBlue divide justify-center">
          <div className="my-auto max-[1199px]:mx-auto max-[1199px]:mb-20">
            <Image className="drop-shadow-[5px_10px_2px_rgb(16,90,139,60%)]" src={AboutUs} width={451} height={400} alt="Logo About" />
          </div>
          <div className="my-auto">
            <p className="font-medium text-xl text-darkBlue pl-[12rem] max-[1199px]:pl-0 max-[1199px]:text-center max-[1199px]:mx-auto max-[1199px]:max-w-[600px]">
              ¡Bienvenido a VyV Technologies, tu destino premium para accesorios
              y servicios tecnológicos de alta calidad, ubicado en Barranca,
              Puntarenas! En la era digital actual, entendemos la importancia de
              mantenerse conectado y disfrutar de la mejor experiencia con tus
              dispositivos. En VyV Technologies, nos enorgullece ser tus
              expertos de confianza, ofreciéndote una amplia gama de productos y
              servicios que elevan tu experiencia tecnológica a nuevos niveles.
            </p>
          </div>
        </div>
        <h2 className="text-center font-bold lg:text-5xl text-[28px] text-darkBlue mt-40  border-b-5 border-[#105A8B] min-[398px]:max-w-fit max-w-[265px] mx-auto">
          Puedes Localizarnos Justo Acá
        </h2>
        <section>
          <Map/>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps(
    context
  ): Promise<GetStaticPropsResult<PruebaAboutInterface>> {

    const navbarCategories = await drupal.getResourceCollectionFromContext<
      DrupalTaxonomyTerm[]
    >("taxonomy_term--product_categories", context, {
      deserialize: false,
      params: {
        "fields[taxonomy_term--product_categories]": "name, field_category_image",
        include: "field_category_image",
      },
    });

    return {
      props: {
        navbarCategories,
      },
    };
  }