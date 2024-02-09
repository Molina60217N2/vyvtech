import Image from "next/image";

export default function Brands() {
  return(
  <>
    <main className="min-[1440px]:inline-flex grid mx-auto grid-cols-6 items-center w-full justify-center gap-10 max-[820px]:gap-3 bg-[#EEF4F8] max-[420px]:gap-2 min-[1440px]:gap-[150px] min-[1440px]:pr-5 pb-5 min-[1440px]:pt-5 pt-3">
      <div className="justify-center col-start-1 mx-auto col-end-3 flex max-[820px]:w-[150px] max-[575px]:w-[125px] max-[480px]:w-[110px] max-[820px]:mt-1.5">
        <Image
          src="/brands/samsung-logo.png"
          alt="Samgsung Logo"
          width={245}
          height={136}
        />
      </div>
      <div className="mb-3 justify-center mx-auto col-start-3 col-end-5 flex max-[820px]:w-[150px] max-[820px]:mb-2 max-[575px]:w-[125px] max-[480px]:w-[110px] max-[820px]:mt-2">
        <Image
          src="/brands/microsoft-logo.png"
          alt="Microsoft Logo"
          width={245}
          height={136}
          className="max-[820px]:ml-3"
        />
      </div>
      <div className="pt-7 min-[820px]:pt-7 min-[1450px]:pt-4 min-[1600px]:pt-7 justify-center mx-auto flex col-start-5 col-end-7 max-[820px]:w-[150px] max-[820px]:pt-5 max-[575px]:w-[125px] max-[480px]:w-[110px] max-[360px]:pr-2 min-[910px]:pr-[35px]">
        <Image
          src="/brands/kingston-logo.png"
          alt="Kingston Logo"
          width={245}
          height={120}
        />
      </div>
      <div className="mb-3 flex jusitfy-center col-start-2 col-end-4 max-[820px]:w-[150px] max-[575px]:w-[125px] max-[480px]:w-[110px]">
        <Image
          src="/brands/apple-logo.png"
          alt="Apple Logo"
          width={245}
          height={120}
        />
      </div>
      <div className="flex min-[821px]:col-start-4 min-[821px]:col-end-6 col-start-5 justify-end max-[820px]:w-[150px] max-[575px]:w-[125px] max-[480px]:w-[110px] max-[580px]:mb-1">
        <Image
          src="/brands/sony-logo.png"
          alt="Sony Logo"
          width={245}
          height={55.74}
          className="max-[820px]:mr-[20px] max-[460px]:mr-[43px]"
        />
      </div>
    </main>
  </>
  )
}