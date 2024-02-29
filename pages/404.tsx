import { Layout } from "@/components/layout";
import Head from "next/head";
import Image from "next/image";
import Error from "@/public/404.jpg";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { DrupalTaxonomyTerm } from "next-drupal";
import { GetStaticPropsResult } from "next";
import { drupal } from "@/lib/drupal";

interface NotFoundInterface {
    navbarCategories: DrupalTaxonomyTerm[];
}

export default function NotFound({navbarCategories}: NotFoundInterface){
    return (
        <Layout navbarCategories={navbarCategories}>
            <Head>
            <title>Pagina no encontrada</title>
            <meta
            name="description"
            content="404 not found"
            />
            </Head>
            <section className="pb-10 pt-5">
            <div className="flex flex-col items-center justify-center">
                <div>
                <h2 className="text-center text-6xl font-bold text-[#0F5C9A]">Oops.</h2>
                </div>
                <div className="py-3">
                <h4 className="text-center text-xl">No podemos encontrar la pagina que estas buscando</h4>
                </div>
                <div className="pb-3">
                <p className="text-center text-sm">Es posible que haya caducado o que haya un error tipográfico. Tal vez puedas encontrar lo que necesitas en nuestra página de inicio.</p>
                </div>
                <div className="pt-3">
                <Button as={Link} href="/" className="bg-[#0F5C9A] tex-[18px] font-bold text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13 7.57371L7.5 2.37591L2 7.57371V12.6241H13V7.57371ZM6.81314 0.273208L0 6.712V14.6241H15V6.712L8.18686 0.273209C7.8014 -0.0910692 7.1986 -0.0910698 6.81314 0.273208Z" fill="white"/>
                </svg>
                    Volver al inicio
                    </Button>
                </div>
                <div className="pt-5">
                <Image
                className="rounded-3xl"
                src={Error}
                alt="error"
                width={600}
                height={600}
                placeholder="blur"
                />
                </div>
            </div>
            </section>
        </Layout>
    )
}

export async function getStaticProps(
    context
  ): Promise<GetStaticPropsResult<NotFoundInterface>> {

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