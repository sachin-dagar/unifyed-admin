import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const AuthLayout = ({
  carouselData = [{}],
  LogOutMenuComponent,
  childContainerPosition = "justify-center",
  overFlowYScroll = "overflow-y-auto",
  children,
}) => {
  const [currentStepIndx, setCurrentStepIndx] = useState(0);

  const setCurrentStepHandler = () => {
    setCurrentStepIndx((prev) => (prev + 1) % carouselData.length);
  };

  useEffect(() => {
    /**
     * Run this Line of code only when carosuole data length is more than one.
     */
    if (carouselData?.length > 1) {
      let interval = setInterval(() => {
        setCurrentStepHandler();
      }, 6000);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div className="min-h-full flex  items-center divide-x-2 ">
      <div className="hidden md:block relative  w-1/2">
        <Carousel
          autoPlay={true}
          transitionTime={300}
          showStatus={false}
          showArrows={false}
          showThumbs={false}
          infiniteLoop={true}
          renderIndicator={(onClickHandler, isSelected, index) => {
            return (
              <>
                {carouselData.length > 1 && (
                  <span
                    className={`w-3 h-3 inline-block ml-4 rounded-full align-middle ${
                      isSelected ? "w-4 h-4 bg-indigo-900" : "bg-gray-200"
                    } cursor-pointer`}
                    onClick={onClickHandler}
                    onKeyDown={onClickHandler}
                    value={index}
                    key={index}
                    role="button"
                    tabIndex={0}
                  ></span>
                )}
              </>
            );
          }}
          children={carouselData.map((carousel) => (
            <div className="max-w-lg mx-auto pb-20">
              <div className="flex items-center justify-center flex-col max-h-500 min-h-500 2xl:max-h-572 2xl:min-h-572">
                <div className="max-h-400 min-h-400">
                  <img src={carousel?.image} className="object-cover h-350" />
                </div>
                <div className="space-y-4">
                  <h1 className="text-2xl 2xl:text-3xl text-center font-semibold ">
                    {carousel?.mainText}
                  </h1>
                  <h3 className="text-sm 2xl:text-base text-center text-black">
                    {carousel?.subText}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        />
      </div>
      <div
        className={` flex flex-col ${childContainerPosition} h-screen w-full md:w-1/2`}
      >
        <div className={`w-full p-3 md:p-0 ${overFlowYScroll}`}>
          <div className="mx-auto md:max-w-2/3 w-2/3  md:min-w-2/3">
            <div className="w-full p-1">
              <div className="mb-5 flex justify-between">
                <Link to="/">
                  <img
                    className="h-12 2xl:h-16 mx-auto md:m-0 w-auto object-contain"
                    src="data:image/png;base64,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"
                    alt="Involv"
                  />
                </Link>
                {LogOutMenuComponent}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
