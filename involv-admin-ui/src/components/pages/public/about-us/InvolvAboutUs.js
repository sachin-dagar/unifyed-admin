import React, { useRef, useEffect } from "react";
import InvolvHeader from "../../../shared/header/InvolvHeader";
import LayoutTransition from "../../../shared/LayoutTransition";
import {
  CarouselArrow,
  CarouselArrowResponsive,
  FormLongArrowRight,
  GaryDotes,
  LongArrowRight,
  MarketSideAboutIpadIcon,
} from "../../../../AppIcons";
import InvolvFooter from "../../../shared/footer/InvolvFooter";
import { motion } from "framer-motion";
import EngagementHub from "../shared/EngagementHub";
import InvolvTopFooter from "../../../shared/footer/InvolvTopFooter";
import { MarketSideIcon } from "../../../../AppIcons";
import { CarouselProvider, Slide, Slider, ButtonBack, ButtonNext } from "pure-react-carousel";
import { BigPlayButton, Player } from "video-react";
import "video-react/dist/video-react.css";
import { useLocation } from "react-router-dom";

function InvolvAboutUs() {
  const whoWeAreRef = useRef(null);
  const whatWeDoRef = useRef(null);
  const makesDiffRef = useRef(null);
  const clientMattersRef = useRef(null);
  const contactRef = useRef(null);
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
        case "?who-we-are":
          applyRef(whoWeAreRef);
          break;
        case "?what-we-do":
          applyRef(whatWeDoRef);
          break;
        case "?makes-diff":
          applyRef(makesDiffRef);
          break;
        case "?client-matters":
          applyRef(clientMattersRef);
          break;
        case "?contact":
          applyRef(contactRef);
          break;
        default:
          break;
      }
    },
    [search]
  );
  const NextPrevBtn = () => (
    <div className="flex ml-0 sm:ml-auto md:ml-0 lg:ml-[0px] xl:ml-[150px]">
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
      <div className="overflow-x-hidden">
        <div>
          <div className="relative">
            <div
              className={`relative h-[700px] md:h-[686px] xl:h-[1000px] 2xl:h-[931px] bg-cover xl:bg-contain 3xl:bg-cover bg-no-repeat z-10 bg-bannerAboutMobile md:bg-bannerAboutIpad  xl:bg-aboutUsDesktop`}
            >
              <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative ">
                <div className="flex items-center h-full">
                  <div className="w-full xl:mt-[-360px] 2xl:mt-[-200px] 3xl:mt-0 lg:w-[100%] xl:w-[65%] 3xl:w-[52%] pr-0 md:pr-10 text-white">
                    <div>
                      <div className="w-[50px] h-[4px] md:h-[6px] xl:w-[73px] xl:h-1.5 bg-white mb-2.5 md:mb-5"></div>
                      <div className="text-xl md:text-[20px] xl:text-[24px] md:leading-6 xl:leading-35 font-medium mb-[10px] md:mb-[30px]">
                        About Us
                      </div>

                      <div className="text-[1.62rem] md:text-[2.25rem] xl:text-[2.17rem] 3xl:text-[2.37rem] font-medium leading-[38px] md:leading-[45px] xl:leading-[65px] mt-5 w-full xl:w-auto md:mt-[0px] xl:mt-auto">
                        With twelve years of affluent industry experience, Unifyed has served numerous clients
                        worldwide, and now we are <span className="text-[#FFDF60]">proud to launch Unite</span>, a
                        high-end product that offers advanced Student Engagement.
                      </div>
                    </div>

                    <div className="w-full xl:w-[93%] mt-8 mb-8 xl:mb-10 md:w-[720px] text-sm md:text-[20px] lg:leading-[30px] xl:leading-[30px] md:leading-[30px]">
                      Unite’s exclusivity and exceptional marketplace gadgets are designed for universities to ensure
                      every need is taken care of to enhance the rich student experience.
                    </div>
                    <button className="bg-white md:w-[169px] xl:w-[219px] md:h-9 xl:h-[44px] text-indigo-900 rounded-full mr-4 py-2 p-3 xl:p-5 xl:py-2 font-medium text-sm md:text-base xl:text-lg 3xl:text-xl flex items-center">
                      <span className="mr-3">Book a Demo</span> <LongArrowRight />
                    </button>
                  </div>
                </div>
              </div>
              <motion.img
                animate={{ x: ["100px", "0px", "0px"] }}
                transition={{ ease: "easeIn", duration: 2 }}
                src="/images/about-us/about-us-banner-emp.png"
                className="hidden xl:block absolute xl:right-[-120px] xl:top-[-330px] 2xl:right-[-120px] 2xl:top-[-120px] 3xl:right-[-50px] 3xl:top-[104px] bottom-0 z-10 m-auto w-[51%]"
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block xl:hidden mt-10">
          <img
            src="/images/about-us-ipad/who-we-are-ipad.png"
            className="hidden md:block xl:hidden w-full"
            alt="about-us-ipad"
          />
        </div>
        <div className="block xl:hidden mt-10">
          <img src="/images/about-us-mobile/who-we-are-mobile.png" className="block md:hidden w-full" alt="" />
        </div>
        <div className="relative lg:py-0 3xl:py-20 pt-0 md:pt-[6rem] pb-[6rem]">
          <div className="relative  pb-10 lg:pb-36 pt-0 xl:pt-16">
            <img
              src="/images/about-us/who-we-are-bg.png"
              className="m-auto hidden xl:block ml-[-600px] xl:h-[1022px] 3xl:h-[1089px] absolute top-0 xl:bottom-[1418px] 3xl:bottom-[50%] left-0 -z-20"
              alt="rounded-circles"
            />
            <div
              className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative 3xl:py-5 md:mt-2"
              ref={whoWeAreRef}
            >
              <div className="flex flex-wrap lg:flex-col xl:flex-row lg:flex-nowrap">
                <div className="w-full xl:w-[55%] mt-18 lg:mt-0 3xl:mt-10">
                  <img src="/images/about-us/who-we-are.png" className="hidden xl:block xl:w-[90%] 3xl:w-[80%]" />
                </div>
                <div className="w-full xl:w-[40%]">
                  <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-3 mt-10"></div>
                  <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] md:leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-2">
                    Who we are
                  </div>
                  <div className="text-[#2C3652] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] md:leading-9 xl:leading-46 font-medium">
                    Unifyed is the only AI-first, microservice-based, cloud-native student information system provider
                    and serves more than 1050 colleges and Universities worldwide. Unifyed product range and intuitive
                    solutions designed to help partner colleges and universities recruit, engage, educate, and retain
                    students.
                  </div>
                </div>
                <div className="hidden md:block xl:hidden w-full xl:w-[55%] mt-22 lg:mt-0 3xl:mt-10 !m-0">
                  <img
                    src="/images/about-us-ipad/who-we-aer-lady-ipad.png"
                    className="block xl:hidden mt-7 w-full 3xl:w-[80%]"
                  />
                </div>
                <div className="block md:hidden w-full xl:w-[55%] mt-22 lg:mt-0 3xl:mt-10 !m-0">
                  <img
                    src="/images/about-us-mobile/who-we-are-lady-mobile.png"
                    className="block xl:hidden mt-7 w-full 3xl:w-[80%]"
                  />
                </div>
              </div>
            </div>
            <div
              className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative py-5 md:mt-2"
              ref={whatWeDoRef}
            >
              <div className="w-[50px] xl:w-[73px] h-[6px] lg:w-[73px] lg:h-[6px] bg-[#2C3652] mb-[25px] mt-10 ml-auto mr-auto"></div>
              <div className="text-[#2C3652] text-center text-[1.25rem] md:text-[1.625rem]  xl:text-[24px] md:leading-10 xl:leading-35 font-semibold mb-2">
                What we do
              </div>
              <div className="text-[#2C3652] md:text-[34px] text-[26px] leading-9 md:leading-45 xl:leading-72 xl:text-[60px] text-center mt-[32px] font-semibold">
                We design and develop high-end industry products for universities, colleges, and schools. Unifyed
                launches Unite, experience True – AI and the next level technology for Student Engagement. <br />
                <span className="text-[#623EDA]"> Unite at glimpse</span>
              </div>
              <div>
                <img
                  src="/images/about-us/rounded-notification-about.png"
                  className="absolute hidden xl:block xl:top-[25%] 3xl:top-[20%] xl:left-[27%] 3xl:left-[32%] z-[-2]"
                  alt="rounded"
                />
              </div>
              <div className="w-full flex justify-center mt-14 lg:mt-[100px] relative player-section">
                <img src="/images/about-us/video-play.png" className="w-full md:w-[80%] h-full min-h-[230px] z-10" />
                <div className="absolute md:bottom-[-65px] lg:bottom-[-78px] xl:bottom-[-100px] 2xl:bottom-[-130px]">
                  <img src="/images/about-us/bg-tv-about-us.png" className="z-0" alt="tv" />
                </div>
                {/* <Player
                  playsInline
                  poster="/images/about-us/video-play.png"
                  src="/images/teaser.mp4"
                  fluid={false}   
                  height={620}
                >
                  <BigPlayButton position="center" />
                </Player> */}
                <div className="absolute top-[40%] md:top-[45%] bottom-[0%] z-10">
                  <img
                    src="/images/about-us/who-we-are-video-icon-sm.png"
                    className="w-[45px] h-[45px] md:w-[62px] md:h-[62px] xl:w-auto xl:h-auto"
                    alt="video-icon"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative overflow-hidden h-[419px] md:h-[518px] lg:h-[500px] xl:h-[698px] bg-cover bg-no-repeat z-10 bg-whatMakeDifferentMobile md:bg-whatMakeDifferentBgIpad xl:bg-whatMakeDifferentBg mt-0 md:mt-[100px]"
            ref={makesDiffRef}
          >
            <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative">
              <div className="w-full md:w-[99%] xl:w-[54%] 2xl:w-[56%] 3xl:w-1/2 h-full absolute top-0 left-0 2xl:pl-[120px] 3xl:pl-[40px] pl-[15px] md:pl-[30px] flex flex-col justify-center">
                <div className="w-[50px] h-[4px] xl:w-[76px] md:h-[6px] bg-white mb-3 md:mb-0 xl:mb-5"></div>
                <div className="text-[20px] md:text-[26px] lg:text-[30px] xl:text-[48px] 2xl:text-[55px] leading-[48px] md:leading-[83px] font-semibold text-[#fff] mb-0 xl:mb-3">
                  What makes us different
                </div>
                <div className="text-[16px] md:text-[24px] w-[93%] md:w-full xl:pr-0 2xl:pr-20 lg:text-[26px] text-[#fff] font-medium leading-[26px] md:leading-[46px] mt-[0px] md:mt-[0px]">
                  We have been the industry leader when it comes to offering a wide range of solutions to Universities &
                  Campuses. The succeeding market also taught us how rapidly the industry has changed, with exorbitant
                  features being “the new market trend,” and that our brand new offering is all about “Unite,” an
                  AI-based student engagement platform.
                </div>
              </div>
            </div>
          </div>
          <div className="relative xl:pb-0 3xl:pb-10 lg:pb-20 " ref={clientMattersRef}>
            <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto relative py-0 mt-[60px] md:mt-[120px] xl:mt-[100px]`">
              <div className="w-full">
                <div className="w-full lg:w-[100%] order-1 lg:order-2 pt-0 xl:pt-32">
                  <div className="w-[50px] h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-1 md:mb-0 xl:mb-3 mt-10 ml-0 xl:ml-auto mr-auto"></div>
                  <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] leading-[48px] md:leading-10 md:mt-3 xl:mt-0 md:mb-3 xl:leading-[83px] xl:text-[3.438rem] text-left xl:text-center font-semibold mb-0 xl:mb-2">
                    Client Matters
                  </div>
                  <div className="text-[#2C3652] xl:text-[#3A3B3C] leading-[26px] md:leading-9 xl:leading-[46px] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] font-medium text-left xl:text-center">
                    Our Unique Partnership Strategy and Marketplace are our value proposition for our clients and make
                    us stand out from the crowd. Our invention aims to nurture and help universities and campuses
                    achieve their goals.
                  </div>
                </div>
                <div className="md:w-[100%] lg:w-[100%] absolute hidden md:block md:top-[-110px] xl:top-[270px] xl:bottom-[-80px] md:left-[-100px] xl:left-[-150px] z-[-20]">
                  <motion.img src={"/images/Dotted-Line.svg"} />
                </div>
                <div className="mt-8 md:mt-16 xl:mt-[250px]">
                  <div className="flex flex-row justify-center relative items-center ml-auto mr-auto">
                    <div className="absolute top-16 md:top-16 xl:top-[-130px] right-0 xl:left-[50%]">
                      <img
                        src="images/about-us/double-quote-client-matters.png"
                        className="w-[36px] h-[228px] md:w-[60px] md:h-[380px] xl:w-[72px] xl:h-[456px]"
                        alt="double-quote-client-matters"
                      />
                    </div>
                    <CarouselProvider
                      naturalSlideWidth={100}
                      naturalSlideHeight={125}
                      totalSlides={1}
                      isPlaying
                      infinite
                    >
                      <Slider className="h-[400px] md:h-[700px] xl:h-[600px] 2xl:h-[500px] w-full">
                        <Slide index={0}>
                          <div className="flex flex-wrap items-start flex-col-reverse xl:flex-row">
                            <div className="w-full xl:w-[50%] mt-10 xl:mt-0 xl:pr-5 mb-5 xl:mb-0">
                              <div className="text-[#2C3652] text-[22px] md:text-3xl leading-[26px] md:leading-9 font-semibold mb-4">
                                Lorem Ipsum
                              </div>
                              <div className="text-[#8B91A9] text-base md:text-xl3 font-normal w-full md:w-[90%] xl:w-full 3xl:w-[83%] leading-7 md:leading-9">
                                Lorem Ipsum is a dummy text used in typing industry. It has survived not only five
                                centuries, but also the leap into electronic five centuries, but also the leap into
                                electronic. But also the leap into electronic five centuries. Lorem Ipsum is a dummy
                                text used in typing industry.
                              </div>
                            </div>

                            <div className="w-full xl:w-[50%] xl:mt-20 3xl:mt-[64px] flex justify-start xl:justify-end items-start xl:items-end">
                              <div className="w-[544px] flex justify-end items-end mb-5 xl:mb-0">
                                <img
                                  src="/images/about-us/college-lake-client-matters.png"
                                  alt="college-lake-client-matters"
                                />
                              </div>
                            </div>
                          </div>
                        </Slide>
                      </Slider>
                      <div className="flex justify-center absolute left-0 right-0 bottom-[-30px] md:bottom-[210px] font-bold lg:bottom-[220px]">
                        <NextPrevBtn />
                      </div>
                    </CarouselProvider>
                  </div>
                </div>
              </div>
            </div>
            <img
              src="/images/Unite-cloud-only-white-bg.svg"
              className="absolute xl:left-[-353px] 2xl:left-[-373px] left-[-130px] sm:left-[-200px] md:left-[-260px] lg:left-[-280px]  top-[-40px] md:top-[360px] xl:top-[-120px] 3xl:left-[-421px] z-[-1] 2xl:w-[90%] 3xl:w-[75%]"
            />
          </div>
        </div>
      </div>
      <div
        className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto relative py-0 md:mt-[-123px] lg:mt-[0px] xl:mt-[-100px] flex flex-col xl:flex-row z-0"
        ref={contactRef}
      >
        <div className="w-[100%]">
          <div className="w-[50px] h-[4px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-3 lg:mb-5 xl:mb-3"></div>
          <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] leading-[40px] xl:leading-[83px] xl:text-[3.438rem] font-semibold mb-3">
            Contact Us
          </div>
          <div className="text-base md:text-[22px] leading-7 md:leading-9 xl:leading-[46px] xl:text-[26px] pr-0 xl:pr-20 font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          </div>
          <div className="flex flex-col md:flex-row mt-[40px]">
            <div className=" w-[35%] text-[22px] md:text-[30px] xl:text-[34px] leading-52 text-[#2C3652] font-[600]">
              India
            </div>
            <div className="">
              <div className="text-[18px] md:text-[24px] text-[#2C3652] font-medium w-[40%] leading-52 mb-0 md:mb-2">
                Gurugram
              </div>
              <div>
                <div className="text-base md:text-[20px] text-[#8B91A9] w-[64%] md:w-1/2 xl:pr-0 xl:w-[93%] 3xl:w-[60%] font-normal mb-2 leading-7 md:leading-35">
                  Infocity II, D5, Phase 2, Info Technology Park, Sector 33, Gurugram, Haryana 122001
                </div>
                <div className="flex items-center">
                  <div>
                    <img src="/images/about-us/google-map-about-us.svg" alt="google-map" />
                  </div>
                  <div className="font-medium ml-3 underline text-[#3246D3] leading-52 text-base md:text-lg">
                    Get Direction
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-[40px] items-start justify-center">
            <div className=" w-[28%] text-[22px] md:text-[30px] xl:text-[34px] text-[#2C3652] leading-52 font-[600]">
              USA
            </div>
            <div className="">
              <div className="text-[18px] md:text-[24px] text-[#2C3652] w-[40%] font-medium leading-45 xl:leading-52 mb-0 md:mb-2">
                Miami
              </div>
              <div>
                <div className="text-base md:text-[20px] text-[#8B91A9] w-[64%] leading-7 md:leading-35 md:w-1/2 xl:w-[82%] xl:pr-0 3xl:w-[50%] font-normal 3xl:pr-5 mb-2">
                  Lorem Ipsum Phase 2, Ipsum Technology Park, Miami, Florida 33101
                </div>
                <div className="flex items-center">
                  <div>
                    <img src="/images/about-us/google-map-about-us.svg" alt="google-map" />
                  </div>
                  <div className="font-medium ml-3 underline text-[#3246D3] leading-52 text-base md:text-lg">
                    Get Direction
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-[82px] hidden xl:flex">
            <div className="w-[44%]">
              <div className="w-[25px] h-[3px] bg-indigo-900 mb-2"></div>
              <div className="text-[24px] text-[#2C3652] font-medium leading-52">General Inquiries</div>
              <div className="text-[20px] text-[#8B91A9] mt-[10px] leading-35">
                <div>Email: abc@unite.com </div>
                <div>Phone: +1(844)566-5452(187)</div>
                <div>Fax: 555-123-4567</div>
              </div>
            </div>
            <div className="w-[44%]">
              <div className="w-[25px] h-[3px] bg-indigo-900 mb-2"></div>
              <div className="text-[24px] text-[#2C3652] font-medium leading-52">Careers</div>
              <div className="text-[20px] text-[#8B91A9] mt-[10px] leading-35">
                <div>Email: xyz@unite.com</div>
                <div>Phone: +1(844)566-5452(187)</div>
                <div>Fax: 555-123-4567</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full relative mt-20 xl:mt-0">
          <div className="hidden xl:block absolute md:left-[-49px] md:bottom-[-92px] xl:left-[-50px] 3xl:left-[-70px] xl:bottom-[-110px] 3xl:bottom-[-52px] z-[-1]">
            <MarketSideIcon />
          </div>

          <div className="block xl:hidden absolute left-[-59px] bottom-[-72px] xl:left-[-50px] 3xl:left-[-70px] xl:bottom-[-110px] 3xl:bottom-[-27px] z-[-1]">
            <MarketSideAboutIpadIcon />
          </div>
          <div className="shadow-8xl w-full p-5 md:p-[58px] ml-auto mr-auto z-10 bg-white">
            <div className="relative text-base w-[272px] md:w-full md:text-[26px] xl:text-[30px] leading-[25px] md:leading-[46px] text-[#3A3B3C] ml-8 mb-0 md:mb-16 font-medium text-medium">
              <div className="absolute left-[-45px] top-1 md:top-[14px] leading-46 xl:top-[12px]">
                <FormLongArrowRight />
              </div>
              Let's level up your university, together
            </div>

            <form className="w-full">
              <div className="my-[20px]">
                <input
                  className="w-full h-[35px] md:h-[50px] xl:h-[60px] border border-[#DFDDEA] text-[#8B91A9] text-[16px] focus:border-x-[#3246D3] focus:border-[#3246D3] focus:border-x-[1px] rounded-[5px]"
                  type="text"
                  autoComplete="off"
                  placeholder="Felicia Williams"
                />
              </div>
              <div className="my-[20px]">
                <input
                  className="w-[100%] h-[35px] md:h-[50px] xl:h-[60px] border border-[#DFDDEA] text-[#2C3652] text-[16px] focus:border-x-[#3246D3] focus:border-[#3246D3] focus:border-x-[1px] rounded-[5px]"
                  type="text"
                  autoComplete="off"
                  placeholder="University of Michigan"
                />
              </div>
              <div className="my-[20px]">
                <input
                  className="w-[100%] h-[35px] md:h-[50px] xl:h-[60px] border border-[#DFDDEA] text-[#8B91A9] text-[16px] focus:border-x-[#3246D3] focus:border-[#3246D3] focus:border-x-[1px] rounded-[5px]"
                  type="text"
                  autoComplete="off"
                  placeholder="Title*"
                />
              </div>
              <div className="my-[20px]">
                <input
                  className="w-[100%] h-[35px] md:h-[50px] xl:h-[60px] border border-[#DFDDEA] text-[#8B91A9] text-[16px] focus:border-x-[#3246D3] focus:border-[#3246D3] focus:border-x-[1px] rounded-[5px]"
                  type="email"
                  autoComplete="off"
                  placeholder="Email*"
                />
              </div>
              <div className="my-[20px]">
                <input
                  className="w-[100%] h-[35px] md:h-[50px] xl:h-[60px] border border-[#DFDDEA] text-[#8B91A9] text-[16px] focus:border-x-[#3246D3] focus:border-[#3246D3] focus:border-x-[1px] rounded-[5px]"
                  type="text"
                  autoComplete="off"
                  placeholder="Phone*"
                />
              </div>
              <div className="my-[20px]">
                <textarea
                  className="w-full h-[94px] md:h-[99px] xl:h-[112px] border border-[#DFDDEA] text-[#8B91A9] text-[16px] focus:border-x-[#3246D3] focus:border-[#3246D3] focus:border-x-[1px] rounded-[5px]"
                  name="textarea"
                >
                  Message
                </textarea>
              </div>
              <div className="mt-[31px]">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                  className="w-[20px] h-[20px]"
                  // checked
                />
                <label for="vehicle1" className="text-[#2C3652] text-[14px] ml-[10px]">
                  Join our mailing list and be the first to get news and updates
                </label>
                <br></br>
              </div>
              <input
                type="submit"
                className="bg-[#3246D3] w-full h-[40px] md:h-[53px] xl:h-[60px] rounded-[6px] mt-[62px] text-[18px] text-[#fff] "
              />
            </form>
          </div>
        </div>
        <div className="absolute z-[-2] left-[70px] bottom-[-70px] md:bottom-[-70px] md:left-[200px] xl:bottom-[-100px] xl:left-[500px] 2xl:bottom-[-150px] 2xl:left-[600px] w-auto overflow-x-hidden">
          <motion.img src={"/images/about-us/dotted-line-about-us.png"} className="overflow-hidden w-full " />
        </div>
      </div>
      <div className="mt-[100px] lg:mt-[200px]"></div>
      <InvolvTopFooter />
      <InvolvFooter />
    </LayoutTransition>
  );
}

export default InvolvAboutUs;
