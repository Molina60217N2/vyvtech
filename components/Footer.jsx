import Image from "next/image";
import Link from "next/link";
import styles from "@/components/Footer.module.css";
import { useState } from "react";

export default function Footer() {
  const footerItems = ["Productos", "Acerca del Negocio"];
  const currentYear = new Date().getFullYear();
  const [hoverFacebook, setHoverFacebook] = useState(false);
  const [hoverWhatsApp, setHoverWhatsApp] = useState(false);
  const [hoverEmail, setHoverEmail] = useState(false);

  return (
    <>
      <footer>
        <div className="bg-[#105A8B] min-[1130px]:grid min-[1600px]:grid-cols-[588px,441px] min-[1281px]:grid-cols-[400px,441px] min-[1130px]:grid-cols-[300px,441px] flex-col py-16 min-[1281px]:px-36 min-[1130px]:px-[122px] max-[471px]:px-0">
          <div className="flex min-[1130px]:justify-start justify-center">
            <Link href="/">
              <Image
                src="/vyv-logo.png"
                alt="Footer logo"
                width={180}
                height={104.93}
              />
            </Link>
          </div>
          <div className="flex-col flex min-[1130px]:mt-0 mt-12">
            <ul className="min-[1130px]:inline-flex min-[1130px]:flex-none gap-14 justify-center text-center">
              <li>
                <Link href="/" className={`${styles.underline_style}`}>
                  Inicio
                </Link>
              </li>
              {footerItems.map((item, index) => (
                <li key={`${item}-${index}`} className="min-[1130px]:mt-0 mt-6">
                  <Link
                    href={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                    className={`${styles.underline_style}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="gap-10 inline-flex justify-center mt-10">
              <li>
                <Link
                  href="https://www.facebook.com/vyvtechnologies"
                  aria-label="Página de Facebook"
                  onMouseEnter={() => setHoverFacebook(true)}
                  onMouseLeave={() => setHoverFacebook(false)}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    style={
                      hoverFacebook
                        ? {
                            filter:
                              "drop-shadow(0px 0px 10px rgb(235,235,235,235))",
                            transitionDuration: "300ms",
                            transitionTimingFunction: "ease-in-out",
                          }
                        : { filter: "none" }
                    }
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_42_181)">
                      <path
                        d="M30 15C30 6.7158 23.2842 0 15 0C6.7158 0 0 6.7158 0 15C0 22.0344 4.8432 27.9372 11.3766 29.5584V19.584H8.2836V15H11.3766V13.0248C11.3766 7.9194 13.6872 5.553 18.6996 5.553C19.65 5.553 21.2898 5.7396 21.9606 5.9256V10.0806C21.6066 10.0434 20.9916 10.0248 20.2278 10.0248C17.7684 10.0248 16.818 10.9566 16.818 13.3788V15H21.7176L20.8758 19.584H16.818V29.8902C24.2454 28.9932 30.0006 22.6692 30.0006 15H30Z"
                        className={
                          hoverFacebook
                            ? "fill-[#09385F] duration-300 ease-out"
                            : "fill-white duration-300 ease-out"
                        }
                      />
                      <path
                        d="M20.8752 19.584L21.717 15H16.8174V13.3788C16.8174 10.9566 17.7678 10.0248 20.2272 10.0248C20.991 10.0248 21.606 10.0434 21.96 10.0806V5.92558C21.2892 5.73898 19.6494 5.55298 18.699 5.55298C13.6866 5.55298 11.376 7.91938 11.376 13.0248V15H8.28296V19.584H11.376V29.5584C12.5364 29.8464 13.7502 30 14.9994 30C15.6144 30 16.221 29.9622 16.8168 29.8902V19.584H20.8746H20.8752Z"
                        className={
                          hoverFacebook
                            ? "fill-white duration-200 ease-out"
                            : "fill-[#105A8B] duration-200 ease-out"
                        }
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_42_181">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola, ¡Me interesa un producto del catálogo!`}
                  aria-label="Contacto por WhatsApp"
                  onMouseEnter={() => setHoverWhatsApp(true)}
                  onMouseLeave={() => setHoverWhatsApp(false)}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={
                      hoverWhatsApp
                        ? {
                            filter: "drop-shadow(0px 0px 10px rgb(37,211,102))",
                            transitionDuration: "300ms",
                            transitionTimingFunction: "ease-in-out",
                          }
                        : { filter: "none" }
                    }
                  >
                    <g clip-path="url(#clip0_42_184)">
                      <path
                        d="M0.696685 30C0.528228 30 0.364349 29.9334 0.242813 29.8105C0.0825961 29.6484 0.0207981 29.4131 0.0809939 29.1932L2.03129 22.0713C0.817077 19.8756 0.176895 17.3918 0.177811 14.8705C0.181244 6.67076 6.85405 0 15.053 0C19.0299 0.00160218 22.7666 1.55067 25.5752 4.36134C28.3833 7.17224 29.9292 10.9087 29.9281 14.8824C29.9244 23.0823 23.2516 29.7535 15.053 29.7535C15.053 29.7535 15.0469 29.7535 15.0466 29.7535C12.6519 29.7526 10.2777 29.1689 8.16371 28.0634L0.858504 29.9792C0.804946 29.9931 0.750472 30 0.696685 30Z"
                        className={
                          hoverWhatsApp
                            ? "fill-[#25d366] ease-in-out duration-300"
                            : "fill-[#E5E5E5] ease-in-out duration-300"
                        }
                      />
                      <path
                        d="M0.696899 29.3617L2.71656 21.9864C1.47075 19.8278 0.81546 17.3793 0.816376 14.8707C0.81958 7.02307 7.20585 0.638428 15.0533 0.638428C18.8614 0.64003 22.4359 2.12226 25.1239 4.81253C27.8117 7.5028 29.2914 11.0788 29.29 14.8822C29.2866 22.7296 22.8994 29.1151 15.0533 29.1151C15.0528 29.1151 15.0535 29.1151 15.0533 29.1151H15.0471C12.6645 29.1142 10.3235 28.5166 8.24406 27.3825L0.696899 29.3617ZM8.59356 24.806L9.02592 25.0621C10.8423 26.1401 12.9249 26.7103 15.0487 26.7114H15.0533C21.5751 26.7114 26.8833 21.4041 26.8861 14.8812C26.8872 11.7202 25.6576 8.74769 23.4235 6.51175C21.1892 4.27581 18.2185 3.04374 15.0577 3.04237C8.53062 3.04237 3.22261 8.34898 3.2201 14.8716C3.21918 17.1069 3.84449 19.2836 5.02918 21.1672L5.31071 21.6149L4.11503 25.9802L8.59356 24.806Z"
                        className={
                          hoverWhatsApp
                            ? "fill-[#25d366] ease-in-out duration-300"
                            : "fill-white ease-in-out duration-300"
                        }
                      />
                      <path
                        d="M1.19202 28.8648L3.14186 21.7445C1.93886 19.6608 1.30646 17.2966 1.30714 14.8753C1.31012 7.2993 7.4755 1.13574 15.0508 1.13574C18.7276 1.13734 22.1784 2.56831 24.7728 5.16544C27.3678 7.76256 28.7961 11.2148 28.7947 14.886C28.7915 22.4623 22.6259 28.6265 15.0515 28.6265C15.0508 28.6265 15.0517 28.6265 15.0515 28.6265H15.0453C12.7453 28.6256 10.4851 28.0484 8.47778 26.9543L1.19202 28.8648Z"
                        fill="#0F5C9A"
                        className={
                          hoverWhatsApp
                            ? "fill-[#075e54] ease-in-out duration-300"
                            : "fill-[#0F5C9A] ease-in-out duration-300"
                        }
                      />
                      <path
                        d="M0.696899 29.3617L2.71656 21.9864C1.47075 19.8278 0.81546 17.3793 0.816376 14.8707C0.81958 7.02307 7.20585 0.638428 15.0533 0.638428C18.8614 0.64003 22.4359 2.12226 25.1239 4.81253C27.8117 7.5028 29.2914 11.0788 29.29 14.8822C29.2866 22.7296 22.8994 29.1151 15.0533 29.1151C15.0528 29.1151 15.0535 29.1151 15.0533 29.1151H15.0471C12.6645 29.1142 10.3235 28.5166 8.24406 27.3825L0.696899 29.3617ZM8.59356 24.806L9.02592 25.0621C10.8423 26.1401 12.9249 26.7103 15.0487 26.7114H15.0533C21.5751 26.7114 26.8833 21.4041 26.8861 14.8812C26.8872 11.7202 25.6576 8.74769 23.4235 6.51175C21.1892 4.27581 18.2185 3.04374 15.0577 3.04237C8.53062 3.04237 3.22261 8.34898 3.2201 14.8716C3.21918 17.1069 3.84449 19.2836 5.02918 21.1672L5.31071 21.6149L4.11503 25.9802L8.59356 24.806Z"
                        className={
                          hoverWhatsApp
                            ? "fill-[#25d366] ease-in-out duration-300"
                            : "fill-white ease-in-out duration-300"
                        }
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.495 8.92063C11.2286 8.32828 10.948 8.31638 10.6944 8.30608C10.487 8.29715 10.2497 8.29761 10.0128 8.29761C9.77568 8.29761 9.39024 8.38688 9.06431 8.74279C8.73816 9.0987 7.81897 9.9593 7.81897 11.7096C7.81897 13.4601 9.09384 15.1513 9.27168 15.3889C9.44952 15.6262 11.7326 19.3327 15.3482 20.7587C18.3532 21.9438 18.9646 21.7081 19.6169 21.6488C20.2692 21.5895 21.7214 20.7882 22.0178 19.9576C22.3145 19.127 22.3145 18.4152 22.2254 18.2662C22.1364 18.1181 21.8993 18.029 21.5436 17.8512C21.1879 17.6733 19.439 16.8125 19.1129 16.694C18.7867 16.5752 18.5496 16.5161 18.3125 16.8723C18.0751 17.2279 17.394 18.029 17.1864 18.2662C16.9788 18.504 16.7712 18.5337 16.4155 18.3556C16.0598 18.1773 14.9141 17.802 13.555 16.59C12.4975 15.6473 11.7834 14.4827 11.5758 14.1266C11.3685 13.7709 11.5724 13.5951 11.7322 13.4008C12.0199 13.0508 12.5026 12.4216 12.6211 12.1845C12.7397 11.9469 12.6804 11.7393 12.5916 11.5613C12.5026 11.3834 11.8111 9.62422 11.495 8.92063Z"
                        className={
                          hoverWhatsApp
                            ? "fill-[#25d366] ease-in-out duration-300"
                            : "fill-white ease-in-out duration-300"
                        }
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_42_184">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </li>
              <li className="my-auto">
                <Link
                  href="mailto:
                  videovyc@hotmail.com"
                  aria-label="Contacto por correo electrónico"
                  onMouseEnter={() => setHoverEmail(true)}
                  onMouseLeave={() => setHoverEmail(false)}
                >
                  <svg
                    width="30"
                    height="24"
                    viewBox="0 0 30 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={
                      hoverEmail
                        ? {
                            filter:
                              "drop-shadow(0px 0px 10px rgb(227, 120, 106))",
                            transitionDuration: "300ms",
                            transitionTimingFunction: "ease-in-out",
                          }
                        : { filter: "none" }
                    }
                  >
                    <path
                      d="M29.4316 7.925C29.6602 7.73125 30 7.9125 30 8.21875V21C30 22.6562 28.7402 24 27.1875 24H2.8125C1.25977 24 0 22.6562 0 21V8.225C0 7.9125 0.333984 7.7375 0.568359 7.93125C1.88086 9.01875 3.62109 10.4 9.59766 15.0312C10.834 15.9937 12.9199 18.0188 15 18.0063C17.0918 18.025 19.2188 15.9563 20.4082 15.0312C26.3848 10.4 28.1191 9.0125 29.4316 7.925ZM15 16C16.3594 16.025 18.3164 14.175 19.3008 13.4125C27.0762 7.39375 27.668 6.86875 29.4609 5.36875C29.8008 5.0875 30 4.65 30 4.1875V3C30 1.34375 28.7402 0 27.1875 0H2.8125C1.25977 0 0 1.34375 0 3V4.1875C0 4.65 0.199219 5.08125 0.539062 5.36875C2.33203 6.8625 2.92383 7.39375 10.6992 13.4125C11.6836 14.175 13.6406 16.025 15 16Z"
                      className={
                        hoverEmail
                          ? "fill-[#dd4b39] ease-in-out duration-300"
                          : "fill-white ease-in-out duration-300"
                      }
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-[#09385F] py-4">
          <p className="text-center text-white text-lg font-semibold]">
            © VyV Technologies {currentYear} - All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
}
