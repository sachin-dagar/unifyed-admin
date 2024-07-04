import React, { useRef, useEffect } from "react";
import {
  CarouselArrow,
  CarouselArrowResponsive,
  LongArrowRight,
  MarketSideIcon,
  ResourceSideIcon,
  StartDisable,
  StartRating,
} from "../../../../AppIcons";
import { motion } from "framer-motion";
import InvolvFooter from "../../../shared/footer/InvolvFooter";
import InvolvHeader from "../../../shared/header/InvolvHeader";
import LayoutTransition from "../../../shared/LayoutTransition";
import { CalanderIcon } from "../../../../AppIcons";
import InvolvTopFooter from "../../../shared/footer/InvolvTopFooter";
import { CarouselProvider, Slide, Slider, ButtonBack, ButtonNext } from "pure-react-carousel";
import { useLocation } from "react-router-dom";

const InvolvResources = () => {
  const recommendedGadgetsRef = useRef(null);
  const successRef = useRef(null);
  const newsRef = useRef(null);
  const { search } = useLocation();

  function applyRef(curentRef) {
    curentRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  useEffect(
    function () {
      switch (search) {
        case "?recommended-gadgets":
          applyRef(recommendedGadgetsRef);
          break;
        case "?success":
          applyRef(successRef);
          break;
        case "?news":
          applyRef(newsRef);
        default:
          break;
      }
    },
    [search]
  );

  const NextPrevBtn = () => (
    <div className="flex ml-0 sm:ml-auto md:ml-0 lg:ml-[150px]">
      <div className="bg-[#623EDA] hidden w-[35px] md:w-[67px] lg:w-[70px] h-[35px] md:h-[67px] lg:h-[62px] md:flex items-center justify-center text-white rounded-[3px] rounded-r-none">
        <ButtonBack className="w-[70px] h-[62px] flex justify-center items-center">
          <div className="rotate-180">
            <CarouselArrow />
          </div>
        </ButtonBack>
      </div>
      <div className="bg-[#623EDA] w-[35px] md:w-[67px] lg:w-[70px] h-[35px] md:h-[67px] lg:h-[62px] hidden md:flex items-center justify-center ml-[20px] text-white rounded-[3px] rounded-l-none">
        <ButtonNext className="w-[70px] h-[62px] flex justify-center items-center">
          <CarouselArrow />
        </ButtonNext>
      </div>
      <div className="bg-[#623EDA] w-[35px] md:w-[67px] lg:w-[70px] h-[35px] md:h-[67px] lg:h-[62px] flex md:hidden items-center justify-center text-white rounded-[3px] rounded-r-none">
        <ButtonBack className="w-[70px] h-[62px] flex justify-center items-center">
          <div className="rotate-180">
            <CarouselArrowResponsive />
          </div>
        </ButtonBack>
      </div>
      <div className="bg-[#623EDA] w-[35px] md:w-[67px] lg:w-[70px] h-[35px] md:h-[67px] lg:h-[62px] flex md:hidden items-center justify-center ml-[20px] text-white rounded-[3px] rounded-l-none">
        <ButtonNext className="w-[70px] h-[62px] flex justify-center items-center">
          <CarouselArrowResponsive />
        </ButtonNext>
      </div>
    </div>
  );
  return (
    <LayoutTransition>
      <InvolvHeader />
      <div className="">
        <div>
          <div className="relative">
            <div
              className={` relative overflow-hidden h-[680px] sm:h-[685px] md:h-[759px] xl:h-[872px] bg-cover bg-no-repeat z-10 bg-resourceBannerMobile md:bg-resourcesBanneriPad  lg:bg-resourcesBgBanner`}
            >
              <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative ">
                <div className="flex items-center h-full">
                  <div className="w-full xl:w-[60%] pr-0 md:pr-10 text-white">
                    <div className="w-[50px] h-[4px] md:h-[6px] md:w-[60px] xl:w-20 xl:h-1.5 bg-white mb-2.5 md:mb-5"></div>
                    <div className="text-xl xl:text-2xl font-semibold md:font-medium mb-[15px] leading-35 md:mb-[30px]">
                      Resources
                    </div>

                    <div className="text-[28px] sm:text-4xl md:text-[2.25rem] xl:text-[2.37rem] 3xl:text-[2.37rem] font-medium  leading-[38px] sm:leading-[45px] md:leading-[45px] xl:leading-[65px] mt-5 w-full  xl:w-auto md:mt-[0px] xl:mt-auto">
                      Explore our Marketplace to find gadgets that meet your requirements, browse the News section to
                      stay updated with what's important & upcoming, and learn what people around the globe have to say
                      about us!
                    </div>

                    <div className="w-full xl:w-[90%] mt-10 mb-10 sm:mb-14 xl:mb-10 text-sm sm:text-xl md:text-xl sm:leading-[30px] lg:leading-[30px] xl:leading-[30px] md:leading-[30px]">
                      At Unite, we believe in building forever-living bonds with our clients.
                    </div>
                    <button className="bg-white text-indigo-900 rounded-full mr-4 py-2 p-3 xl:p-5 xl:py-2 leading-[54px] font-medium text-sm md:text-base xl:text-lg 3xl:text-xl flex items-center">
                      <span className="mr-3">Book a Demo</span> <LongArrowRight />
                    </button>
                  </div>
                  <div className="w-[40%] h-full hidden lg:flex items-center justify-center ml-auto mr-auto">
                    <img src="/images/Resource-desktop/bannerResource-bulb.png" className="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="md:flex xl:hidden w-full flex items-center justify-center py-10">
        <img src="images/Resources-iPad/bulb-resource-ipad.png" alt="" />
      </div> */}
      <div className="w-full max-w-[268px] mt-5 h-[473px] flex lg:hidden items-center justify-center ml-auto mr-auto">
        <img src="/images/Resource-desktop/bannerResource-bulb.png" className="" />
      </div>
      <div className="relative">
        <img
          src="/images/Resource-desktop/notification-resources.png"
          className="m-auto ml-[-400px] xl:ml-[-520px] h-[800px] xl:h-[1089px] absolute top-0 bottom-0 left-0 -z-20"
          alt=""
        />
        <div className="relative overflow-hidden z-10" ref={recommendedGadgetsRef}>
          <div className="text-[70px] md:text-[140px] lg:text-[11.175rem]  xl:text-[13.875rem] 2xl:text-[16.875rem] 3xl:text-[21.87rem] mt-10 whitespace-nowrap text-indigo-900 opacity-[0.07] font-semibold 3xl:ml-[-24px] leading-[0.4]">
            Recommended Gadgets
          </div>
          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto py-[100px] 3xl:mt-[-170px]">
            <div className="flex flex-wrap justify-between mt-[-50px] sm:mt-auto pb-[40px]">
              <div className="w-full xl:w-[50%] lg:w-full mt-[0px] 3xl:mt-[0px] lg:mt-[-110px] md:mt-[-90px]">
                <div className="w-[50px] h-[6px] xl:w-20 xl:h-1.5 mb-3 md:mb-3 bg-blueInvolv-700"></div>
                <div className="text-[20px] md:text-[26px] lg:text-[46px] 2xl:text-55 leading-83 text-blueInvolv-700 font-semibold mb-3 md:mb-1">
                  Recommended Gadgets
                </div>
                <div className="text-blueInvolv-800 text-[1rem] pr-[20rem] md:pr-0 2xl:p-0 3xl:p-0 xl:pr-[10rem] xl:pt-4 xl:pb-0 xl:pl-0 md:text-[1.37rem] lg:text-[1.62rem] font-medium w-[678px] leading-7 md:leading-[46px] mb-3 mt-6">
                  Unite’s target is to create an end-to-end support system for universities and campuses. Unite
                  Marketplace is highly recommended as it allows you to choose the gadget (Platform) as per your
                  requirement and integrate it with ease.
                </div>
              </div>
              <div className="w-full xl:w-[50%] lg:w-full flex justify-end sm:justify-center xl:justify-end md:mt-[50px] lg:mt-[50px]">
                <CarouselProvider naturalSlideWidth={100} nturalSlideHeight={125} totalSlides={1} isPlaying infinite>
                  <Slider className="h-[347px] sm:h-[489px] w-full">
                    <Slide index={0}>
                      <div className="flex justify-end lg:justify-end">
                        <div className="flex">
                          {/* <div className="relative pl-[100px]">
                            <div className="hidden sm:block absolute left-0 bottom-[-27px]">
                              <MarketSideIcon className="" />
                            </div>
                            <div className="absolute left-20 bottom-[30px]">
                              <ResourceSideIcon />
                            </div>
                            <div className="flex justify-end sm:justify-center">
                              <div className="w-[50%] pr-4 h-[400px] sm:h-auto">
                                <div className="bg-white p-0 border relative shadow-5xl">
                                  <motion.img src={"/images/bluebgImg.png"} className="" />
                                  <div className="text-[.25rem] md:text-[.56rem] lg:text-[.93rem] text-white absolute top-[15px] right-[20px]">
                                    Ver 11.0
                                  </div>
                                  <div className="text-[1rem] md:text-[2.188rem] lg:text-3xl 2xl:text-[3.06rem] text-white absolute top-[40px] sm:top-[70px] left-0 w-full text-center">
                                    Messenger
                                  </div>
                                  <div className="p-[10px] sm:p-[20px]">
                                    <div className="text-[.68rem] md:text-[1.12rem] lg:text-[1.31rem] text-blackInvolv-300 font-normal">
                                      Messenger
                                    </div>
                                    <div className="text-[8px] sm:text-lg lg:text-sm 2xl:text-lg font-normal mt-[15px]">
                                      A gadget that enables you to keep a track of various assignments/deliverables.
                                    </div>
                                    <div className="flex justify-between mt-[20px]">
                                      <div className="text-[.37rem] md:text-[.62rem] lg:text-sm font-normal">
                                        200+ installs
                                      </div>
                                      <div>
                                        <div className="flex">
                                          <StartRating />
                                          <StartRating />
                                          <StartRating />
                                          <StartRating />
                                          <StartDisable />
                                          <div className="text-gray-400 text-[.32rem] md:text-[.688rem] lg:text-[1rem] font-semibold italic ml-2">
                                            4.0
                                          </div>
                                        </div>
                                        <div className="text-gray-500  text-[#595959] text-[.62rem] md:text-[1.31rem] lg:text-[1.56rem] font-semibold">
                                          $55
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="w-[50%] pl-4 h-[200px] sm:h-auto">
                                <div className="bg-white p-0 border relative">
                                  <motion.img src={"/images/Feeds.svg"} className="" />

                                  <div className="text-[1rem] md:text-[2.18rem] lg:text-3xl 2xl:text-[3.06rem] text-white absolute top-[40px] sm:top-[70px] left-0 w-full text-center">
                                    Feeds
                                  </div>
                                  <div className="p-[10px] sm:p-[20px]">
                                    <div className="text-[.68rem] md:text-[1.12rem] lg:text-[1.31rem] text-blackInvolv-300 font-normal">
                                      Feeds
                                    </div>
                                    <div className="text-[8px] sm:text-lg lg:text-sm 2xl:text-lg font-normal mt-[15px]">
                                      A gadget that enables you to stay updated with posts from your peers.
                                    </div>
                                    <div className="flex justify-between mt-[20px]">
                                      <div className="text-[.37rem] md:text-[.62rem] lg:text-sm font-normal">
                                        200+ installs
                                      </div>
                                      <div>
                                        <div className="flex">
                                          <StartRating />
                                          <StartRating />
                                          <StartRating />
                                          <StartRating />
                                          <StartDisable />
                                          <div className="text-gray-400 text-[.31rem] md:text-[.688rem] lg:text-[1rem] font-semibold italic ml-2">
                                            4.0
                                          </div>
                                        </div>
                                        <div className="text-gray-500  text-[#595959] text-[.62rem] md:text-[1.31rem] lg:text-[1.56rem] font-semibold">
                                          $0
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          <div className="relative pl-[30px] sm:pl-[100px]">
                            <div className="hidden sm:block absolute left-[20px] sm:left-0 bottom-[-27px]">
                              <MarketSideIcon className="" />
                            </div>
                            <div className="block sm:hidden absolute left-0 bottom-[-60px]">
                              <ResourceSideIcon />
                            </div>
                            <div className="flex justify-center sm:justify-center w-full">
                              <div className="w-[60%] pr-4">
                                <div className="bg-white p-0 border relative shadow-5xl">
                                  <motion.img src={"/images/bluebgImg.png"} className="" />
                                  <div className="text-[.25rem] md:text-[.56rem] lg:text-[.93rem] text-white absolute top-[15px] right-[20px]">
                                    Ver 11.0
                                  </div>
                                  <div className="text-[1rem] md:text-[2.188rem] lg:text-3xl 2xl:text-[3.06rem] text-white absolute top-[40px] sm:top-[70px] left-0 w-full text-center">
                                    Messenger
                                  </div>
                                  <div className="p-[10px] sm:p-[20px]">
                                    <div className="text-[.68rem] md:text-[1.12rem] lg:text-[1.31rem] text-blackInvolv-300 font-normal">
                                      Messenger
                                    </div>
                                    <div className="text-[8px] sm:text-lg lg:text-sm 2xl:text-lg font-normal mt-[15px]">
                                      A gadget that enables you to keep a track of various assignments/ deliverables.
                                    </div>
                                    <div className="flex justify-between mt-[20px]">
                                      <div className="text-[.37rem] md:text-[.62rem] lg:text-sm font-normal">
                                        200+ installs
                                      </div>
                                      <div>
                                        <div className="flex">
                                          <StartRating />
                                          <StartRating />
                                          <StartRating />
                                          <StartRating />
                                          <StartDisable />
                                          <div className="text-gray-400 text-[.32rem] md:text-[.688rem] lg:text-[1rem] font-semibold italic ml-2">
                                            4.0
                                          </div>
                                        </div>
                                        <div className="text-gray-500  text-[#595959] text-[.62rem] md:text-[1.31rem] lg:text-[1.56rem] font-semibold">
                                          $55
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="w-[60%] pl-4">
                                <div className="bg-white p-0 border relative">
                                  <motion.img src={"/images/Feeds.svg"} className="" />

                                  <div className="text-[1rem] md:text-[2.18rem] lg:text-3xl 2xl:text-[3.06rem] text-white absolute top-[40px] sm:top-[70px] left-0 w-full text-center">
                                    Feeds
                                  </div>
                                  <div className="p-[10px] sm:p-[20px]">
                                    <div className="text-[.68rem] md:text-[1.12rem] lg:text-[1.31rem] text-blackInvolv-300 font-normal">
                                      Feeds
                                    </div>
                                    <div className="text-[8px] sm:text-lg lg:text-sm 2xl:text-lg font-normal mt-[15px]">
                                      A gadget that enables you to stay updated with posts from your peers.
                                    </div>
                                    <div className="flex justify-between mt-[20px]">
                                      <div className="text-[.37rem] md:text-[.62rem] lg:text-sm font-normal">
                                        200+ installs
                                      </div>
                                      <div>
                                        <div className="flex">
                                          <StartRating />
                                          <StartRating />
                                          <StartRating />
                                          <StartRating />
                                          <StartDisable />
                                          <div className="text-gray-400 text-[.31rem] md:text-[.688rem] lg:text-[1rem] font-semibold italic ml-2">
                                            4.0
                                          </div>
                                        </div>
                                        <div className="text-gray-500  text-[#595959] text-[.62rem] md:text-[1.31rem] lg:text-[1.56rem] font-semibold">
                                          $0
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Slide>
                  </Slider>
                  <div className="flex justify-center lg:justify-end">
                    <NextPrevBtn />
                  </div>
                </CarouselProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-full" ref={successRef}>
          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto">
            <div className="relative flex justify-center items-center flex-col ml-auto mr-auto">
              <div>
                <div className="bg-[#2C3652] w-[50px] h-[4px] md:w-[76px] md:h-[6px] ml-auto mr-auto mb-2 md:mb-5"></div>
                <div className="text-[#2C3652] text-xl md:text-[26px] lg:text-2xl font-semibold text-center leading-[36px] mb-10">
                  Success
                </div>
                <div className="text-[#2C3652] text-[26px] md:text-[34px] lg:text-[40px] 2xl:text-5xl text-center md:leading-[45px] xl:leading-72 font-semibold">
                  Every product has a vision and a journey to success. Know Unite’s product journey and success stories
                  from the experts
                  {/* <div className="!text-[#623EDA]">Come and be amazed.</div> */}
                </div>
              </div>
              <img
                src="/images/Resource-desktop/rounded-notification-resources.png"
                className="mt-[-121px] -z-10 w-[250px] sm:w-[367px] lg:w-auto"
                alt=""
              />
            </div>
            <div className="mt-[50px]">
              <div className="flex flex-row justify-center items-center ml-auto mr-auto">
                <CarouselProvider naturalSlideWidth={100} naturalSlideHeight={125} totalSlides={1} isPlaying infinite>
                  <Slider className="h-[1300px] md:h-[1200px] lg:h-[1100px] xl:h-[670px] 2xl:h-[700px] w-full">
                    <Slide index={0}>
                      <div className="flex flex-wrap">
                        <div className="w-full xl:w-[50%] xl:pr-5 mb-5 xl:mb-0">
                          <div className="rounded-lg border border-solid border-[#E2E2E2] shadow-sm bg-white">
                            <img
                              src="/images/Resource-desktop/dots.png"
                              className="p-8 md:p-10 lg:pb-0 pb-0 pt-8 w-auto h-auto"
                              alt=""
                            />
                            <div className="text-base md:text-xl leading-7 md:leading-9 text-[#2C3652] font-normal p-8">
                              Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                              of type and scrambled it to make. Simply dummy text of the printing and typesetting
                              industry.
                            </div>
                            <div className="bg-[#FAFBFF] p-4 md:p-8 pt-[30px] pb-[30px] rounded-b-lg flex flex-col md:flex-row">
                              <div className="flex w-full">
                                <div>
                                  <img src="/images/Resource-desktop/employee-resource-ui.png" alt="employee" />
                                </div>
                                <div className="ml-5 mt-0 md:mt-1 flex flex-col sm:flex-row">
                                  <div className="flex flex-col">
                                    <div className="text-[#2C3652] text-md md:text-xl mb-0 md:mb-2 font-semibold leading-9">
                                      Aaron Finch
                                    </div>
                                    <div className="text-[#8B91A9] text-[15px] leading-6 md:leading-7 md:text-xl2">
                                      Professor and Deputy Director <br /> UNIVERSITY OF CALIFORNIA, LOS ANGELES, USA
                                    </div>
                                  </div>
                                  <div className="flex item-center justify-start lg:justify-end ml-0 md:ml-[5.25rem] h-fit mt-3 w-[140px]">
                                    <img
                                      src="/images/Resource-desktop/calendar-resource.svg"
                                      className="w-[25px]"
                                      alt=""
                                    />
                                    <div className="text-[#2C3652] text-sm font-normal mt-1 ml-2">05 Jul, 2022</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full xl:w-[50%] xl:pl-5">
                          <div className="rounded-lg border border-solid border-[#E2E2E2] shadow-sm bg-white">
                            <img
                              src="/images/Resource-desktop/dots.png"
                              className="p-8 md:p-10 lg:pb-0 pb-0 pt-8 w-auto h-auto"
                              alt=""
                            />
                            <div className="text-base md:text-xl leading-7 md:leading-9 text-[#2C3652] font-normal p-8">
                              Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                              of type and scrambled it to make. Simply dummy text of the printing and typesetting
                              industry.
                            </div>
                            <div className="bg-[#FAFBFF] p-8 pt-[30px] pb-[30px] rounded-b-lg flex">
                              <div className="flex w-full">
                                <div>
                                  <img src="/images/Resource-desktop/lady-resource-ui.png" alt="employee" />
                                </div>
                                <div className="ml-5 mt-0 md:mt-1 flex flex-col sm:flex-row">
                                  <div className="flex flex-col">
                                    <div className="text-[#2C3652] text-md md:text-xl mb-0 md:mb-2 font-semibold leading-9">
                                      Veronica Williams
                                    </div>
                                    <div className="text-[#8B91A9] text-[15px] leading-6 md:leading-7 md:text-xl2">
                                      Pro-Vice-Chancellor <br /> UNIVERSITY OF MICHIGAN, ANN ARBOR, USA
                                    </div>
                                  </div>
                                  <div className="flex item-center justify-start lg:justify-end ml-0 md:ml-[5.25rem] h-fit mt-3 w-[140px]">
                                    <img
                                      src="/images/Resource-desktop/calendar-resource.svg"
                                      className="w-[25px]"
                                      alt=""
                                    />
                                    <div className="text-[#2C3652] text-sm font-normal mt-1 ml-2">12 Apr, 2022</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Slide>
                  </Slider>
                  <div className="flex justify-center lg:justify-end absolute left-0 right-0 bottom-[-50px] md:bottom-[-50px] lg:bottom-[47px]">
                    <NextPrevBtn />
                  </div>
                </CarouselProvider>
              </div>
              <div className="relative mt-[-6rem] ml-auto mr-auto flex items-center justify-center text-center">
                <div className="absolute left-0 top-10 sm:top-5 lg:static">
                  <img src="/images/Resource-desktop/dots-resource-ui.svg" className="w-[89px] sm:w-auto" alt="" />
                </div>
                <div className="ml-0 md:ml-[11rem] lg:ml-auto mt-0 lg:mt-0 mr-auto flex items-center w-full justify-center text-center">
                  <button className="border border-solid border-[#3246D3] mr-0 md:mr-44 h-[44px] rounded-xl4 pt-[8px] pb-[8px] pl-[18px] pr-[18px] w-auto text-xl font-medium text-[#3246D3]">
                    View All
                    {/* <LongArrowRight /> */}
                    <span class="inline-block ml-[30px] text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14.981"
                        height="14.587"
                        viewBox="0 0 17.981 14.587"
                      >
                        <g id="Layer_2" data-name="Layer 2" transform="translate(-12.06 -8.704)">
                          <path
                            id="Path_23329"
                            data-name="Path 23329"
                            d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H13.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,23.41,23l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z"
                            fill="#3246D3"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden 3xl:mt-[140px] mb-10" ref={newsRef}>
        <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative "></div>
      </div>
      <div className="overflow-hidden mt-20 -mb-20">
        <div className="text-white bg-newsBgResourcesUi bg-cover bg-no-repeat h-auto">
          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative ">
            <div className="flex items-center justify-center ml-auto mr-auto">
              <div className="w-full xl:w-[100%] mt-28 flex items-center justify-center text-white">
                <div className="flex flex-col justify-center items-center">
                  <div className="w-[50px] md:w-[73px] h-[4px] md:h-[6px] text-center bg-white mb-2.5 md:mb-5"></div>
                  <div className="text-center text-xl md:text-55 font-medium mb-[10px] md:mb-[30px]">News</div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row mt-20">
              <div className="md:w-[50%] lg:w-[50%] xl:w-[25%] bg-white rounded-tl-[36px] overflow-hidden rounded-br-[36px] relative pb-[52px]">
                <div>
                  <div className="w-full">
                    <img src="/images/Resource-desktop/news-boy-resource.png" className="w-full" alt="news-boy" />
                  </div>
                  <div className="mt-7 pl-[30px] pr-[40px]">
                    <div className="flex items-center justify-start">
                      <div className="mr-4">
                        <CalanderIcon />
                      </div>
                      <div className="flex flex-row items-center">
                        <div className="text-[#623EDA] text-3xl md:text-[27px] lg:text-3xl 2xl:text-4xl font-semibold">
                          10JULY
                          <span className="text-xl font-normal">, 2022</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[#2C3652] text-[16px] lg:text-lg leading-[22px] lg;leading-7 font-semibold lg:font-medium pt-5 pb-5">
                      Campus Announces New Head of Product
                    </div>
                    <div className="text-[#8B91A9] text-sm leading-6 pb-10 md:pb-0">
                      Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </div>
                    <div className="w-full flex text-[#623EDA] justify-end mt-10 md:mt-5 pb-7 mb-3 lg:pb-4 items-center absolute bottom-0 right-[35px]">
                      <button className="text-[#623EDA] text-[13px] md:text-xs lg:text-base font-semibold lg:font-medium">
                        Read more
                      </button>
                      <div className="ml-4 w-[19px] h-[12px] mr-[-15px]">
                        <LongArrowRight />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-0 md:ml-10 mt-5 md:mt-0 md:w-[50%] lg:w-[50%] xl:w-[25%] bg-white rounded-tl-[36px] overflow-hidden rounded-br-[36px] relative pb-[52px]">
                <div>
                  <div className="w-full">
                    <img src="/images/Resource-desktop/taj-mahal-news-resource.png" className="w-full" alt="news-boy" />
                  </div>
                  <div className="mt-7 pl-[30px] pr-[40px]">
                    <div className="flex items-center justify-start">
                      <div className="mr-4">
                        <CalanderIcon />
                      </div>
                      <div className="flex flex-row items-center">
                        <div className="text-[#623EDA] text-3xl md:text-[27px] lg:text-3xl 2xl:text-4xl font-semibold">
                          23JUN
                          <span className="text-xl font-normal">, 2022</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[#2C3652] text-[16px] lg:text-lg leading-[22px] lg;leading-7 font-semibold lg:font-medium pt-5 pb-5">
                      Campus Announces Partnership With Mark Scott College
                    </div>
                    <div className="text-[#8B91A9] text-sm leading-6 pb-10 md:pb-0">
                      Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's .
                    </div>
                    <div className="w-full flex text-[#623EDA] justify-end mt-10 md:mt-5 pb-7 mb-3 lg:pb-4 items-center absolute bottom-0 right-[35px]">
                      <button className="text-[#623EDA] text-[13px] md:text-xs lg:text-base font-semibold lg:font-medium">
                        Read more
                      </button>
                      <div className="ml-4 w-[19px] h-[12px] mr-[-15px]">
                        <LongArrowRight />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-10 md:w-[50%] lg:w-[50%] xl:w-[25%] bg-white rounded-tl-[36px] overflow-hidden rounded-br-[36px] relative pb-[52px] hidden xl:block">
                <div>
                  <div className="w-full">
                    <img src="/images/Resource-desktop/triangle-news-resource.png" className="w-full" alt="news-boy" />
                  </div>
                  <div className="mt-7 pl-[30px] pr-[40px]">
                    <div className="flex items-center justify-start">
                      <div className="mr-4">
                        <CalanderIcon />
                      </div>
                      <div className="flex flex-row items-center">
                        <div className="text-[#623EDA] text-3xl md:text-[27px] lg:text-3xl 2xl:text-4xl font-semibold">
                          26APR
                          <span className="text-xl font-normal">, 2022</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[#2C3652] text-[16px] lg:text-lg leading-[22px] lg;leading-7 font-semibold lg:font-medium pt-5 pb-5">
                      Unite Grows 60% in Q1 2022
                    </div>
                    <div className="text-[#8B91A9] text-sm leading-6 pb-10 md:pb-0">
                      Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.
                    </div>
                    <div className="w-full flex text-[#623EDA] justify-end mt-10 md:mt-5 pb-7 mb-3 lg:pb-4 items-center absolute bottom-0 right-[35px]">
                      <button className="text-[#623EDA] text-[13px] md:text-xs lg:text-base font-semibold lg:font-medium">
                        Read more
                      </button>
                      <div className="ml-4 w-[19px] h-[12px] mr-[-15px]">
                        <LongArrowRight />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-10  md:w-[50%] lg:w-[50%] xl:w-[25%] bg-white rounded-tl-[36px] overflow-hidden rounded-br-[36px] relative pb-[52px] hidden xl:block">
                <div>
                  <div className="w-full">
                    <img src="/images/Resource-desktop/tower-news-resource.png" className="w-full" alt="news-boy" />
                  </div>
                  <div className="mt-7 pl-[30px] pr-[40px]">
                    <div className="flex items-center justify-start">
                      <div className="mr-4">
                        <CalanderIcon />
                      </div>
                      <div className="flex flex-row items-center">
                        <div className="text-[#623EDA] text-3xl md:text-[27px] lg:text-3xl 2xl:text-4xl font-semibold">
                          12FEB
                          <span className="text-xl font-normal">, 2022</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[#2C3652] text-[16px] lg:text-lg leading-[22px] lg;leading-7 font-semibold lg:font-medium pt-5 pb-5">
                      Campus Announces Partnership With Max Law College
                    </div>
                    <div className="text-[#8B91A9] text-sm leading-6 pb-10 md:pb-0">
                      Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </div>
                    <div className="w-full flex text-[#623EDA] justify-end mt-10 md:mt-5 pb-7 mb-3 lg:pb-4 items-center absolute bottom-0 right-[35px]">
                      <button className="text-[#623EDA] text-[13px] md:text-xs lg:text-base font-semibold lg:font-medium">
                        Read more
                      </button>
                      <div className="ml-4 w-[19px] h-[12px] mr-[-15px]">
                        <LongArrowRight />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-20 pb-28 ml-auto mr-auto flex items-center justify-center text-center">
              <button className="border border-solid bg-white border-[#3246D3] w-[209px] h-[44px] rounded-xl4 pt-[8px] pb-[8px] pl-[18px] pr-[18px] text-xl font-medium text-[#3246D3]">
                Load More
                <span class="inline-block ml-[30px] text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14.981" height="14.587" viewBox="0 0 17.981 14.587">
                    <g id="Layer_2" data-name="Layer 2" transform="translate(-12.06 -8.704)">
                      <path
                        id="Path_23329"
                        data-name="Path 23329"
                        d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H13.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,23.41,23l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z"
                        fill="#3246D3"
                      ></path>
                    </g>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <InvolvTopFooter />
      <InvolvFooter />
    </LayoutTransition>
  );
};

export default InvolvResources;
