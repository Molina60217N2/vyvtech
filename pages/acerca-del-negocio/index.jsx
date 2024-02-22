import { Layout } from "@/components/layout";
import Image from "next/image";
import Map from "@/components/Map";
import Head from "next/head";

export default function AboutUs() {
  return (
    <Layout>
      <Head>
        <title>Acerca de V&V Technologies</title>
        <meta
          name="description"
          content="V&V Technologies, encuentra tus productos de mejor calidad al mejor precio."
        />
        <meta
          property="og:image"
          content="https://www.vyvtechnologies.com/logo.png"
        />
        <meta property="og:title" content="Acerca de V&V Technologies" />
        <meta
          property="og:description"
          content="V&V Technologies, encuentra tus productos de mejor calidad al mejor precio."
        />
        <meta property="og:url" content="https://www.vyvtechnologies.com/" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </Head>
      <div>
        <h1 className="text-center font-bold lg:text-6xl text-[28px] text-darkBlue lg:my-14 my-7">
          Acerca de VyV Technologies
        </h1>
        <Image
          className="w-full "
          src="/about-us.png"
          alt="Imagen de Acerca de VyV Technologies"
          width={1440}
          height={371}
        />
        <p className="text-darkBlue font-medium lg:text-2xl text-lg lg:max-w-[810px] max-w-[950px] max-[1024px]:mx-8 flex justify-center mx-auto text-center lg:my-20 my-10">
          ¡Bienvenido a VyV Technologies, tu destino premium para accesorios y
          servicios tecnológicos de alta calidad, ubicado en Barranca,
          Puntarenas! En la era digital actual, entendemos la importancia de
          mantenerse conectado y disfrutar de la mejor experiencia con tus
          dispositivos. En VyV Technologies, nos enorgullece ser tus expertos de
          confianza, ofreciéndote una amplia gama de productos y servicios que
          elevan tu experiencia tecnológica a nuevos niveles.
        </p>
        <div>
          <Map />
        </div>
      </div>
    </Layout>
  );
}
