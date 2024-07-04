import React from "react"


export default function HeroSection() {
  const headLine = (
    <div>
      <h1 className="text-xl md:text-3xl 2xl:text-4xl sm:text-base text-gray-700 font-semibold tracking-tight mb-3">
        The Gadgets you love. <br />
        From a Place you can trust.
      </h1>
      <span className="text-gray-600 text-sm md:text-base 2xl:text-xl font-normal">
        A Place, with all that you'll ever need that fulfils all your camps
        needs.
      </span>
    </div>
  );

  const backgroundUrl =
    "https://www.cellmax.eu/wp-content/uploads/2020/01/Hero-Banner-Placeholder-Dark-1024x480-1.png";

  return(
    <div
      className="relative overflow-hidden bg-no-repeat bg-cover"
      style={{ backgroundPosition: "50%", backgroundImage: `url('${backgroundUrl}')`, height: 250 }}
    >
      <div
        className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
      >
        <div className="mx-auto container 3xl:w-[1650px] py-16">
          <div>
            {headLine}
          </div>
        </div>
      </div>
    </div>
  )
}