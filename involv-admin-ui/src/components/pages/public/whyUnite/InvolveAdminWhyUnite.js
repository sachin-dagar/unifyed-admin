import React, { useEffect, useState } from "react";
import InvolvHeader from "../../../shared/header/InvolvHeader";
import LayoutTransition from "../../../shared/LayoutTransition";
import { LongArrowRight, CircleImg, MarketSideIcon } from "../../../../AppIcons";
import InvolvFooter from "../../../shared/footer/InvolvFooter";
import { motion, useAnimation } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import useInvolvScreenSize from "../../../../hooks/useInvolvScreenSize";
import { StartRating, StartDisable, GaryDotes } from "../../../../AppIcons";
import { CarouselProvider, Dot, Slide, Slider, ButtonBack, ButtonNext } from "pure-react-carousel";
import InvolvAdminPlanModal from "./InvolvAdminPlanModal";
import PlanTable from "./PlanTable";
import { planData } from "./planData";
import InvolvTopFooter from "../../../shared/footer/InvolvTopFooter";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { useRef } from "react";

function InvolveAdminWhyUnite() {
  const [isMobile, isTabTwo] = useInvolvScreenSize();
  const [openModal, setOpenModal] = useState(false);
  const [activePlan, setActivePlan] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileActive, setMobileActive] = useState(false);
  const sliderRef = useRef(null);
  const pricingRef = useRef(null);
  const { search } = useLocation();

  const activePlanClass = () => {
    setActivePlan(!activePlan);
  };
  const activeMobileClass = () => {
    setMobileActive(!mobileActive);
  };
  useEffect(function () {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(
    function () {
      if (search == "?pricing") {
        pricingRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      if (
        search == "?Integrations" ||
        search == "?data-security" ||
        search == "?advance-analytics" ||
        search == "?gamification" ||
        search == "?governance" ||
        search == "?hyper-personalization" ||
        search == "?mobile" ||
        search == "?notification" ||
        search == "?yoda"
      ) {
        sliderRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      switch (search) {
        case "?Integrations":
          setActiveSlide(0);
          break;

        case "?data-security":
          setActiveSlide(1);
          break;

        case "?advance-analytics":
          setActiveSlide(2);
          break;

        case "?gamification":
          setActiveSlide(3);
          break;
        case "?governance":
          setActiveSlide(4);
          break;

        case "?hyper-personalization":
          setActiveSlide(5);
          break;

        case "?mobile":
          setActiveSlide(6);
          break;

        case "?notification":
          setActiveSlide(7);
          break;

        case "?yoda":
          setActiveSlide(8);
          break;

        default:
          setActiveSlide(0);
      }
    },
    [search]
  );

  // console.log("qwerty", search);
  const NextPrevBtn = () => (
    <div className="flex ml-[150px] sm:ml-auto">
      <div className="bg-[#623EDA] w-[35px] md:w-[67px] lg:w-[70px] h-[35px] md:h-[67px] lg:h-[62px] flex items-center justify-center text-white rounded-[3px] rounded-r-none">
        <ButtonBack className="w-[70px] h-[62px] flex justify-center items-center">
          <div className="rotate-180">
            <LongArrowRight />
          </div>
        </ButtonBack>
      </div>
      <div className="bg-[#623EDA] w-[35px] md:w-[67px] lg:w-[70px] h-[35px] md:h-[67px] lg:h-[62px] flex items-center justify-center ml-[20px] text-white rounded-[3px] rounded-l-none">
        <ButtonNext className="w-[70px] h-[62px] flex justify-center items-center">
          <LongArrowRight />
        </ButtonNext>
      </div>
    </div>
  );

  return (
    <LayoutTransition>
      <InvolvHeader />
      <div className="overflow-hidden">
        <div>
          <div className="relative">
            <div
              className="bg-publicBanner relative overflow-hidden h-[593px] lg:h-[480px] xl:h-[645px]  2xl:h-[740px] 3xl:h-[743px] bg-cover bg-no-repeat z-10"
              style={
                isMobile
                  ? {
                      backgroundImage: "url('/images/mobile-banner-background.png')",
                    }
                  : isTabTwo
                  ? {
                      backgroundImage: "url('/images/tab-banner-background.png')",
                    }
                  : {
                      backgroundImage: "url('/images/whyUniteBanner.png')",
                    }
              }
            >
              <motion.img
                animate={{ y: 100 }}
                transition={{ ease: "easeIn", duration: 2 }}
                src={"/images/why-unite-banner-first.png"}
                className="hidden lg:block absolute right-[28.5%] top-[-220px] xl:top-[-260px] 2xl:top-[-270px] 3xl:top-[-340px] w-[310px] xl:w-[420px] 2xl:w-[480px] 3xl:w-[536px]"
              />
              <motion.img
                animate={{ x: ["100px", "0px", "0px"] }}
                transition={{ ease: "easeOut", duration: 1 }}
                src={"/images/why-unite-banner-second.png"}
                className="hidden lg:block absolute right-[10px] 2xl:right-[20px] 3xl:right-[40px] top-[-1px] xl:top-[0px] 3xl:top-[-48px] w-[310px] xl:w-[420px] 2xl:w-[480px] 3xl:w-[536px]"
                style={{ transition: "all .5s ease-in-out" }}
              />
              <motion.img
                animate={{ y: ["100px", "0px", "0px"] }}
                transition={{ ease: "easeOut", duration: 2 }}
                src={"/images/why-unite-banner-third.png"}
                className="hidden lg:block absolute right-[19.5%] 2xl:right-[19%] 3xl:right-[19%] top-[150px] xl:top-[200px] 2xl:top-[230px] 3xl:top-[205px] w-[310px] xl:w-[420px] 2xl:w-[480px] 3xl:w-[536px]"
                style={{ transition: "all .5s ease-in-out" }}
              />
              <motion.img
                animate={{ y: ["100px", "0px", "0px"] }}
                transition={{ ease: "easeOut", duration: 2 }}
                src={"/images/why-unite-banner-fourth.png"}
                className="hidden lg:block absolute right-[-170px] xl:right-[-220px] 2xl:right-[-240px] 3xl:right-[-280px] top-[160px] xl:top-[210px] 2xl:top-[245px] 3xl:top-[210px] w-[310px] xl:w-[420px] 2xl:w-[480px] 3xl:w-[536px]"
                style={{ transition: "all .5s ease-in-out" }}
              />
              <motion.img
                animate={{ y: ["100px", "0px", "0px"] }}
                transition={{ ease: "easeOut", duration: 2 }}
                src={"/images/why-unite-banner-fifth.png"}
                className="hidden lg:block  absolute right-[2%] xl:right-[1.7%] 2xl:right-[2.5%] 3xl:right-[3.5%] bottom-[-1px] xl:bottom-[-2px] 3xl:bottom-[-2px] w-[310px] xl:w-[420px] 2xl:w-[480px] 3xl:w-[476px]"
                style={{ transition: "all .5s ease-in-out" }}
              />
              <div className="text-[.875rem] sm:text-[1.12rem] md:text-[20px] lg:text-[1.06rem] xl:text-[1.25rem] md:leading-[30px] text-white mt-6 w-[90%] lg:w-1/2 bg-[#15144E] absolute left-0 bottom-[30px] sm:bottom-[30px] md:bottom-[40px] xl:bottom-[60px] 2xl:bottom-[80px] 3xl:bottom-[30px] pr-[10px] lg:pr-auto pl-[15px] xl:pl-[32px] 2xl:pl-[35px] 3xl:pl-[185px] py-[20px] rounded-r-[50px] bg-opacity-50 md:w-[750px] xl:w-[1006px]">
                <div>
                  With Unite, fill the vacuum and single out a centralized system and unconventional solution for your
                  university.
                </div>
              </div>
              <div className="px-[14px] xl:px-[30px] xl:container 3xl:w-[1600px] m-auto h-full relative">
                <div className="w-full lg:w-[60%] items-center h-full relative xl:absolute top-0 left-0 pl-0 xl:pl-[30px] mt-[-50px] sm:mt-[-50px] vmd:mt-[-50px] lg:mt-[-50px] xl:mt-[-70px] 2xl:mt-[-70px] 3xl:mt-[-70px]">
                  <div className="flex items-center h-full pr-[120px]">
                    <div>
                      <div className="md:mb-[8px] lg:mb-[20px] 2xl:mb-[30px]">
                        <div className="w-[50px] h-[4px] md:w-[60px] md:h-[6px] xl:w-20 xl:h-1.5 bg-white mb-5"></div>
                        <div className="text-[1.25rem] md:text-[20px] md:leading-[30px] lg:text-[1.31rem] text-white font-medium 3xl:mb-[5px]">
                          Why Unite
                        </div>
                      </div>
                      <div className="text-[1.37rem] sm:text-[1.87rem] md:text-[2.25rem] lg:text-[1.43rem] xl:text-[1.87rem] 3xl:text-[38px] md:leading-45 text-white font-medium mt-5 w-[340px] sm:w-[620px] md:w-[760px] lg:w-auto md:mt-[0px] lg:mt-auto xl:leading-[65px]">
                        Universities are willing to spend on various technology to avail the best solution for students
                        – but is there any solution in the market that offers all, an Intuitive UI/UX for students,
                        collaborative and communicative dashboard, and seamless integration technology.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-[100%] block lg:hidden h-[330px] sm:h-[600px] md:h-[650px] my-[15px] mb-0 mx-auto">
            <motion.img
              animate={{ y: 100 }}
              transition={{ ease: "easeIn", duration: 2 }}
              src={"/images/ipad-img-one.png"}
              className="absolute left-[-38px] sm:left-[-80px] top-[-140px] sm:top-[-200px] w-[185px] sm:w-[348px] md:w-[380px]"
            />
            <motion.img
              animate={{ x: ["100px", "0px", "0px"] }}
              transition={{ ease: "easeOut", duration: 1 }}
              src={"/images/ipad-img-two.png"}
              className="absolute top-[0px] right-[35px] sm:right-[10px] md:right-[100px] md:top-[0px] w-[208px] sm:w-[380px] md:w-[412px]"
              style={{ transition: "all .5s ease-in-out" }}
            />
            <motion.img
              animate={{ y: ["100px", "0px", "0px"] }}
              transition={{ ease: "easeOut", duration: 2 }}
              src={"/images/ipad-img-three.png"}
              className="absolute top-[115px] sm:top-[220px] md:top-[230px] left-[10px] w-[208px] sm:w-[380px] md:w-[412px]"
              style={{ transition: "all .5s ease-in-out" }}
            />
            <motion.img
              animate={{ y: ["100px", "0px", "0px"] }}
              transition={{ ease: "easeOut", duration: 2 }}
              src={"/images/ipad-img-four.png"}
              className="absolute top-[130px] sm:top-[260px] md:top-[240px] right-[-80px] sm:right-[-140px] w-[208px] sm:w-[323px] md:w-[419px]"
              style={{ transition: "all .5s ease-in-out" }}
            />
            <motion.img
              animate={{ y: ["100px", "0px", "0px"] }}
              transition={{ ease: "easeOut", duration: 2 }}
              src={"/images/ipad-img-five.png"}
              className=" absolute bottom-0 right-[60px] sm:right-[50px] md:right-[140px] w-[181px] sm:w-[326px] md:w-[358px]"
              style={{ transition: "all .5s ease-in-out" }}
            />
          </div>
        </div>
        <div className="mt-[50px] relative">
          {/* <img src="/images/Bitmap.png" className="absolute left-0 top-0"/> */}
          <div className="text-[4.37rem] sm:text-[7.18rem] md:text-[8.75rem] lg:text-[15.62rem] 2xl:text-[18.75rem] 3xl:text-[21.87rem] text-indigo-900 opacity-[0.07] font-semibold sm:ml-[-10px] ml-[-5px] md:ml-[-15px] 3xl:ml-[-24px] absolute top-[-23px] md:top-[-100px] lg:top-[-20px] 3xl:top-[-540px] left-0 md:leading-[210px] xl:leading-[526px]">
            Marketplace
          </div>
          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto py-[100px] 3xl:mt-[400px]">
            <div className="flex flex-col sm:flex-col xl:flex-row 3xl:justify-between sm:mt-auto md:mt-[-50px] xl:mt-[-50px]">
              <div className="w-[100%] md:w-[100%] xl:w-[45%] mt-[0px] lg:mt-[-50px] 3xl:mt-[-300px]">
                <div className="w-[50px] h-[4px] md:h-[6px] xl:w-20 xl:h-1.5 bg-blueInvolv-700"></div>
                <div className="text-[1.25rem] md:text-[26px] lg:text-[55px] md:leading-10 xl:leading-83 text-blueInvolv-700 font-semibold md:mt-2 md:mb-3 xl:mb-1">
                  Marketplace
                </div>
                <div className="text-[#2C3652] text-[1rem] md:text-[22px] lg:text-[26px] md:leading-9 xl:leading-46 font-medium min-h-[195px] mb-3">
                  Offers wide-ranging and comprehensive ed-tech solutions under one roof.
                </div>
                <NavLink to="/gadget">
                  <button className="text-[.87rem] md:text-[16px] lg:text-[1.25rem] text-blueInvolv-700 border-[1px] border-[#3246D3] rounded-[50px] px-[20px] py-[6px] flex items-center mt-[-100px] md:mt-[-70px] lg:mt-[0px] 3xl:mt-[30px] md:leading-[38px] md:w-[221px] xl:w-[231px] md:h-[36px] xl:h-[44px] xl:leading-[54px]">
                    <span className="md:mr-8 xl:mr-0">Marketplace</span>
                    <span className="inline-block ml-[30px]">
                      <LongArrowRight />
                    </span>
                  </button>
                </NavLink>
                <div className="mt-[40px]">
                  <div className="sm:hidden lg:block">
                    <GaryDotes />
                  </div>
                </div>
              </div>
              <div className="w-[100%] md:w-[100%] xl:w-[65%] flex justify-center xl:justify-end md:mt-[50px] lg:mt-[0px] 3xl:mt-[-300px]">
                <div className="flex sm:flex-row relative">
                  <div className="absolute left-[-69px] bottom-[-27px]">
                    <MarketSideIcon className="" />
                  </div>
                  <div className="bg-white p-0 border w-[160px] sm:w-[270px] md:w-[342px] lg:w-[350px] block relative shadow-7xl sm:shadow-7xl xl:shadow-5xl mr-[20px] sm:mr-[30px] lg:mr-[55px]">
                    <motion.img src={"/images/bluebgImg.png"} className="" />
                    <div className="text-[.25rem] md:text-[.56rem] lg:text-[.93rem] text-white absolute top-[15px] right-[20px]">
                      Ver 11.0
                    </div>
                    <div className="text-[1rem] md:text-[2.188rem] lg:text-[3.06rem] text-white absolute top-[40px] sm:top-[70px] left-0 w-full text-center">
                      To-Dos
                    </div>
                    <div className="p-[20px]">
                      <div className="text-[.68rem] md:text-[1.12rem] lg:text-[1.31rem] text-blackInvolv-300 font-normal">
                        To-Dos
                      </div>
                      <div className="text-[.62rem] sm:text-lg font-normal mt-[15px]">
                        A gadget that enables you to keep a track of various assignments/deliverables.
                      </div>
                      <div className="flex justify-between mt-[20px]">
                        <div className="text-[.37rem] md:text-[.62rem] lg:text-sm font-normal">200+ installs</div>
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
                          <div className="text-gray-500  text-[#595959] text-[1.31rem] md:text-[1.31rem] lg:text-[1.56rem] font-semibold">
                            $50
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-0 border w-[160px] sm:w-[270px] md:w-[342px] lg:w-[350px] block relative shadow-7xl sm:shadow-7xl xl:shadow-5xl">
                    <motion.img src={"/images/Feeds.svg"} className="" />

                    <div className="text-[1rem] md:text-[2.18rem] lg:text-[3.06rem] text-white absolute top-[40px] sm:top-[70px] left-0 w-full text-center">
                      Feeds
                    </div>
                    <div className="p-[20px]">
                      <div className="text-[.68rem] md:text-[1.12rem] lg:text-[1.31rem] text-blackInvolv-300 font-normal">
                        Feeds
                      </div>
                      <div className="text-[.62rem] sm:text-lg font-normal mt-[15px]">
                        A gadget that enables you to stay updated with posts from your peers.
                      </div>
                      <div className="flex justify-between mt-[20px]">
                        <div className="text-[.37rem] md:text-[.62rem] lg:text-sm font-normal">200+ installs</div>
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
        <div className="bg-[#FAF9FF] p-0 pb-10" ref={sliderRef}>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={9}
            currentSlide={activeSlide}
            // isPlaying
          >
            <Slider className="h-[850px] sm:h-[600px] md:h-[680px] lg:h-[900px] xl:h-[1100px] 2xl:h-[1100px] 3xl:h-[890px] w-full">
              <Slide index={0}>
                <div className="relative overflow-hidden">
                  <div className="flex flex-col-reverse sm:flex-col-reverse lg:flex-row left-0 right-0 px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto pt-[175px]">
                    <div className="mt-[-170px] sm:mt-[-70px] md:mt-[-170px] lg:mt-[-50px] xl:mt-[-80px] w-[100%] md:w-[100%] lg:w-[57%] hidden lg:block">
                      <motion.img
                        src={"/images/IntegrationImg.png"}
                        className="w-[78%] md:w-[645px] lg:w-[78%] block mx-auto sm:block sm:mx-auto"
                      />
                    </div>
                    <div className="sm:w-[100%] lg:w-[43%] mt-[-110px] sm:mt-[-52px] md:mt-[-78px] lg:mt-[-20px] xl:mt-[0px]">
                      <div className="w-[50px] h-[4px] xl:w-20 xl:h-1.5 bg-indigo-700"></div>
                      <div className="text-[1.25rem] md:text-[1.62rem] lg:text-[2.5rem] xl:text-[3.4rem] text-indigo-700 text-normal font-semibold md:mt-3">
                        Integration
                      </div>
                      <div className="text-[1rem] md:text-[1.37rem] lg:text-[1.37rem] xl:text-[1.62rem] text-[#2C3652] h-[401px] leading-46 overflow-hidden pb-5 font-medium mt-[10px] sm:mt-auto md:mt-[10px]">
                        Larger the Universities, the more the challenges to create a cohesive environment with other
                        inbuilt software. Unite helps you overcome integration issues with ease, its smooth and fast
                        integration process connects with other higher-end products seamlessly.
                      </div>
                      <div className="mt-[-3rem] md:mt-[-7rem] xl:mt-[0rem] 2xl:mt-[-4rem] flex items-center justify-evenly border border-solid border-[#3246D3] w-[137px] h-[31px] md:w-[153px] md:h-[36px] xl:w-[199px] xl:h-[44px] rounded-xl4 text-[14px] xl:text-xl font-medium text-[#3246D3]">
                        Read More
                        <LongArrowRight />
                      </div>
                    </div>
                  </div>
                  <div className="text-[4.37rem] sm:text-[7.5rem] md:text-[140px] lg:text-[12.18rem] xl:text-[18.75rem] 3xl:text-[350px] font-semibold text-indigo-700 opacity-[0.08] md:mt-[-85px] xl:mt-[-100px] ml-[-4px] md:ml-[0px] 3xl:ml-[-25px] absolute top-[-20px] sm:top-[-40px] md:top-[40px] xl:top-[-7px] md:leading-[210px] xl:leading-[526px] whitespace-nowrap z-[-1]">
                    Integration
                  </div>
                  <div className="hidden sm:hidden xl:block xl:w-[110px] 3xl:w-[150px] absolute right-0 bottom-0">
                    <motion.img src={"/images/firstSlidSideIcon.png"} />
                  </div>
                </div>
              </Slide>
              <Slide index={1}>
                <div className="relative overflow-hidden">
                  <div className="flex flex-col-reverse sm:flex-col-reverse lg:flex-row left-0 right-0 px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto pt-[175px]">
                    <div className="mt-[-160px] sm:mt-[-70px] md:mt-[-150px] lg:mt-[-20px] xl:mt-[0px] md:lg-[0px] w-[100%] md:w-[100%] lg:w-[57%] hidden lg:block">
                      <motion.img
                        src={"/images/secondSlider2.png"}
                        className="w-[100%] md:w-[100%] lg:w-[78%] block mx-auto sm:block sm:mx-auto"
                      />
                    </div>
                    <div className="sm:w-[100%] lg:w-[43%] mt-[-92px] sm:mt-[-52px] lg:mt-[-20px] xl:mt-[0px]">
                      <div className="w-[50px] h-[4px] xl:w-20 xl:h-1.5 bg-indigo-700"></div>
                      <div className="text-[1.25rem] md:text-[1.62rem] lg:text-[2.5rem] xl:text-[3.4rem] text-indigo-700 text-normal font-semibold">
                        Data Security
                      </div>
                      <div className="text-[1rem] md:text-[1.37rem] lg:text-[1.37rem] xl:text-[1.62rem] text-[#2C3652] leading-46 h-[401px] overflow-hidden pb-5 font-medium mt-[10px] sm:mt-auto">
                        Unite data security protects your data from unauthorized access, corruption, & theft from the
                        beginning to the end of its life cycle.
                      </div>
                    </div>
                  </div>
                  <div className="text-[4.37rem] sm:text-[7.5rem] md:text-[8.75rem] lg:text-[12.18rem] xl:text-[18.75rem] 3xl:text-[21.87rem] font-semibold text-indigo-700 opacity-[0.08] md:mt-[-85px] xl:mt-[-100px] ml-[-4px] md:ml-[-14px] 3xl:ml-[-25px] absolute top-[-20px] sm:top-[-40px] md:top-[40px] xl:top-[-7px] whitespace-nowrap z-[-1]">
                    Data Security
                  </div>
                  <div className="hidden sm:hidden absolute right-0 bottom-[28%] rotate-180">
                    <GaryDotes color="#c5b8f2" />
                  </div>
                </div>
              </Slide>

              <Slide index={2}>
                <div className="relative overflow-hidden">
                  <div className="md:w-[100%] lg:w-[85%] absolute md:top-[600px] lg:top-[0px]  z-[-1]  hidden lg:block">
                    <motion.img src={"/images/Dotted-Line.svg"} />
                  </div>
                  <div className="flex flex-col-reverse sm:flex-col-reverse lg:flex-row left-0 right-0 px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto pt-[175px]">
                    <div className="mt-[-160px] sm:mt-[-70px] md:mt-[-100px] lg:mt-[0px] xl:mt-[50px] w-[100%] md:w-[100%] lg:w-[57%]">
                      <div className="absolute left-[-40px] 3xl:left-[120px] lg:bottom-[190px] xl:bottom-[70px] 2xl:bottom-0 z-[-1]  hidden lg:block">
                        <MarketSideIcon />
                      </div>
                      <motion.img src={"/images/thirtSlider2.png"} className="w-[97%]  hidden lg:block" />
                    </div>
                    <div className="sm:w-[100%] lg:w-[43%] mt-[-92px] sm:mt-[-52px] lg:mt-[0px] xl:mt-[0px]">
                      <div className="w-[50px] h-[4px] xl:w-20 xl:h-1.5 bg-indigo-700"></div>
                      <div className="text-[1.25rem] md:text-[1.62rem] lg:text-[2.5] xl:text-[3.43rem] text-indigo-700 text-normal font-semibold">
                        Advance Analytics
                      </div>
                      <div className="text-[1rem] md:text-[1.37rem] lg:text-[1.37rem] xl:text-[1.62rem] text-[#2C3652] leading-46 h-[401px] overflow-hidden pb-5 font-medium mt-[10px] sm:mt-auto">
                        Identifying the proper steps and apt business decisions in today’s competitive and data-driven
                        world is a challenge. With Unite Advanced Analytics follow real-time study trends, supervise
                        grades, and regulate your student engagement process
                      </div>
                    </div>
                  </div>
                  <div className="text-[4.37rem] sm:text-[7.5rem] md:text-[8.7rem] lg:text-[12.18rem] xl:text-[18.75rem] 3xl:text-[21.87rem] font-semibold text-indigo-700 opacity-[0.08] md:mt-[-85px] xl:mt-[-100px] ml-[-4px] md:ml-[-14px] 3xl:ml-[-25px] absolute top-[-20px] sm:top-[-40px] md:top-[40px] xl:top-[-7px] whitespace-nowrap z-[-1]">
                    Advance Analytics
                  </div>
                  <div className="absolute right-0 bottom-[10%] rotate-180 hidden sm:hidden xl:block">
                    <GaryDotes color="#c5b8f2" />
                  </div>
                </div>
              </Slide>
              <Slide index={3}>
                <div className="relative overflow-hidden">
                  <div className="w-[100%] absolute  z-[-1] bottom-[10%] left-0 hidden sm:hidden lg:block">
                    <img src={"/images/curveLine.png"} />
                  </div>

                  <div className="flex flex-col-reverse sm:flex-col-reverse lg:flex-row left-0 right-0 px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto pt-[175px]">
                    <div className="mt-[-250px] sm:mt-[-70px] md:mt-[-100px] lg:mt-[-30px] xl:mt-[0px] w-[100%] md:w-[100%] lg:w-[57%] h-[300px] md:h-[550px] 3xl:h-[550px] lg:h-auto">
                      <div className="relative hidden lg:block">
                        <img src={"/images/fourthSlider.png"} className="w-[95%]" />
                        <img
                          src="/images/your-badges.png"
                          className="absolute bottom-[-56px] right-0 w-[200px] sm:w-[366px]"
                        />
                      </div>
                    </div>
                    <div className="sm:w-[100%] lg:w-[43%] mt-[-92px] sm:mt-[-52px] lg:mt-[-30px] xl:mt-[0px]">
                      <div className="w-[50px] h-[4px] xl:w-20 xl:h-1.5 bg-indigo-700"></div>
                      <div className="text-[1.25rem] md:text-[1.62rem] lg:text-[2.5rem] xl:text-[3.4rem] text-indigo-700 text-normal font-semibold">
                        Gamification
                      </div>
                      <div className="text-[1rem] md:text-[1.37rem] lg:text-[1.37rem] xl:text-[1.62rem] text-[#2C3652] leading-46 h-[401px] overflow-hidden pb-5 font-medium mt-[10px] sm:mt-auto">
                        Implement Unite gamification to motivate and engage students, faculty, and staff to increase
                        your retention rate.
                      </div>
                    </div>
                  </div>
                  <div className="text-[4.37rem] sm:text-[7.5rem] md:text-[8.75rem] lg:text-[12.18rem] xl:text-[18.75rem] 3xl:text-[21.87rem] font-semibold text-indigo-700 opacity-[0.08] md:mt-[-85px] xl:mt-[-100px] ml-[-4px] md:ml-[-14px] 3xl:ml-[-25px] absolute top-[-20px] sm:top-[-40px] md:top-[40px] xl:top-[-7px] whitespace-nowrap z-[-1]">
                    Gamification
                  </div>
                  <div className="absolute right-[30px] sm:right-[30px] md:right-[40px] lg:right-0 bottom-[0px] md:bottom-[0px] lg:bottom-[10%] rotate-180 hidden lg:block">
                    <GaryDotes color="#c5b8f2" />
                  </div>
                </div>
              </Slide>

              <Slide index={4}>
                <div className="relative overflow-hidden">
                  <div className="flex flex-col-reverse sm:flex-col-reverse lg:flex-row left-0 right-0 px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto pt-[175px]">
                    <div className="mt-[-220px] sm:mt-[-70px] md:mt-[-100px] lg:mt-[-30px] xl:mt-[0px] w-[100%] md:w-[100%] lg:w-[57%] h-[300px] sm:h-auto hidden lg:block">
                      <motion.img src={"/images/fifthSlider2.png"} className="md:w-[100%] lg:w-[78%]" />
                    </div>
                    <div className="sm:w-[100%] lg:w-[43%] mt-[-92px] sm:mt-[-52px] lg:mt-[-30px] xl:mt-[0px]">
                      <div className="w-[50px] h-[4px] xl:w-20 xl:h-1.5 bg-indigo-700"></div>
                      <div className="text-[1.25rem] md:text-[1.62rem] lg:text-[2.5rem] xl:text-[3.43rem] text-indigo-700 text-normal font-semibold">
                        Governance
                      </div>
                      <div className="text-[1rem] md:text-[1.37rem] lg:text-[1.37rem] xl:text-[1.62rem] text-[#2C3652] leading-46 h-[401px] overflow-hidden pb-5 font-medium mt-[10px] sm:mt-auto">
                        Governance can be a task that requires monitoring minute yet highly critical issues at a low
                        level. Unite governance features such as profanity filter, automated reporting feature, and
                        role-based access set you free and allow you to manage daily tasks peacefully.
                      </div>
                    </div>
                  </div>
                  <div className="text-[4.37rem] sm:text-[7.5rem] md:text-[8.75rem] lg:text-[12.188rem] xl:text-[18.75rem] 3xl:text-[21.87rem] font-semibold text-indigo-700 opacity-[0.08] md:mt-[-85px] xl:mt-[-100px] ml-[-4px] md:ml-[-14px] 3xl:ml-[-25px] absolute top-[-20px] sm:top-[-40px] md:top-[40px] xl:top-[-7px] whitespace-nowrap z-[-1]">
                    Governance
                  </div>
                  <div className="absolute right-0 bottom-[10%] rotate-180 hidden sm:hidden lg:block">
                    <GaryDotes color="#c5b8f2" />
                  </div>
                </div>
              </Slide>

              <Slide index={5}>
                <div className="relative overflow-hidden">
                  <div className="w-[85%] absolute md:top-[400px] lg:top-[0px] z-[-1] hidden lg:block">
                    <motion.img src={"/images/Dotted-Line.svg"} />
                  </div>

                  <div className="flex flex-col-reverse sm:flex-col-reverse lg:flex-row left-0 right-0 px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto pt-[175px]">
                    <div className="mt-[-220px] sm:mt-[-70px] md:mt-[-100px] lg:mt-[-30px] xl:mt-[40px] w-[100%] md:w-[100%] lg:w-[57%] h-[300px] sm:h-auto">
                      <div className="absolute left-[-40px] 3xl:left-[120px] lg:bottom-[180px] xl:bottom-[100px] 2xl:bottom-0 z-[-1] hidden lg:block">
                        <MarketSideIcon />
                      </div>
                      <motion.img src={"/images/sixthSlider.svg"} className="w-[97%] hidden lg:block" />
                    </div>
                    <div className="sm:w-[100%] lg:w-[43%] mt-[-92px] lg:mt-[-30px] xl:mt-[0px] sm:mt-[-52px]">
                      <div className="w-[50px] h-[4px] xl:w-20 xl:h-1.5 bg-indigo-700"></div>
                      <div className="text-[1.25rem] md:text-[1.62rem] lg:text-[2.5rem] xl:text-[3.43rem] text-indigo-700 text-normal font-semibold">
                        Hyper-Personalization
                      </div>
                      <div className="text-[1rem] md:text-[1.37rem] xl:text-[1.62rem] text-[#2C3652] leading-46 h-[401px] overflow-hidden pb-5 font-medium mt-[10px] sm:mt-auto">
                        View relevant feeds, suggestions, and posts as per your liking. Unite AI-based
                        Hyper-Personalization feature fetches real-time information and provides an enriched user
                        experience.
                      </div>
                    </div>
                  </div>
                  <div className="text-[4.37rem] sm:text-[7.5rem] md:text-[8.75rem] lg:text-[12.188rem] xl:text-[18.75] 3xl:text-[21.87rem] font-semibold text-indigo-700 opacity-[0.08] md:mt-[-85px] xl:mt-[-100px] ml-[-4px] md:ml-[-14px] 3xl:ml-[-25px] absolute top-[-20px] sm:top-[-40px] md:top-[40px] xl:top-[-7px] whitespace-nowrap z-[-1]">
                    Hyper-Personalization
                  </div>
                  <div className="absolute right-0 bottom-[10%] rotate-180 hidden sm:hidden lg:block">
                    <GaryDotes color="#c5b8f2" />
                  </div>
                </div>
              </Slide>
              <Slide index={6}>
                <div className="relative overflow-hidden">
                  <div className="flex flex-col-reverse sm:flex-col-reverse lg:flex-row left-0 right-0 px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto pt-[175px]">
                    <div className="mt-[-220px] sm:mt-[-70px] md:mt-[-100px] lg:mt-[-30px] xl:mt-[30px] w-[100%] md:w-[100%] lg:w-[57%] h-[300px] sm:h-auto hidden lg:block">
                      <motion.img src={"/images/seventhSlider2.png"} className="w-[78%]" />
                    </div>
                    <div className="sm:w-[100%] lg:w-[43%] mt-[-92px] sm:mt-[-52px] lg:mt-[-30px] xl:mt-[0px]">
                      <div className="w-[50px] h-[4px] xl:w-20 xl:h-1.5 bg-indigo-700"></div>
                      <div className="text-[1.25rem] md:text-[1.62rem] lg:text-[2.5rem] xl:text-[3.43rem] text-indigo-700 text-normal font-semibold">
                        Mobile First
                      </div>
                      <div className="text-[1rem] md:text-[1.37rem] lg:text-[1.37rem] xl:text-[1.62rem] text-[#2C3652] leading-46 h-[401px] overflow-hidden pb-5 font-medium mt-[10px] sm:mt-auto">
                        We are trend creators; in Unite’s mobile-first approach. We don’t just meet expectations but
                        offer more than expected. With Unite’s multiple features on a mobile app, get everything at your
                        fingertips with super easy accessibility.
                      </div>
                    </div>
                  </div>
                  <div className="text-[4.37rem] sm:text-[7.5rem] md:text-[8.75rem] lg:text-[12.18rem] xl:text-[18.75rem] 3xl:text-[21.87rem] font-semibold text-indigo-700 opacity-[0.08] md:mt-[-85px] xl:mt-[-100px] ml-[-4px] md:ml-[-14px] 3xl:ml-[-25px] absolute top-[-20px] sm:top-[-40px] md:top-[40px] xl:top-[-7px] whitespace-nowrap z-[-1]">
                    Mobile First
                  </div>
                </div>
              </Slide>

              <Slide index={7}>
                <div className="relative overflow-hidden">
                  <div className="w-[100%] absolute  z-[-1] bottom-[10%] hidden sm:hidden left-0 hidden lg:block">
                    <img src={"/images/curveLine.png"} />
                  </div>

                  <div className="flex flex-col-reverse sm:flex-col-reverse lg:flex-row left-0 right-0 px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto pt-[175px]">
                    <div className="mt-[-220px] sm:mt-[-70px] md:mt-[-100px] lg:mt-[-30px] xl:mt-[30px] w-[100%] md:w-[100%] lg:w-[57%] h-[300px] sm:h-auto hidden lg:block">
                      <motion.img src={"/images/eighthSlider.png"} className="w-[95%]" />
                    </div>
                    <div className="sm:w-[100%] lg:w-[43%] mt-[-92px] sm:mt-[-52px] lg:mt-[-30px] xl:mt-[0px]">
                      <div className="w-[50px] h-[4px] xl:w-20 xl:h-1.5 bg-indigo-700"></div>
                      <div className="text-[1.25rem] md:text-[1.62rem] lg:text-[2.5rem] xl:text-[3.43rem] text-indigo-700 text-normal font-semibold">
                        Notifications
                      </div>
                      <div className="text-[1rem] md:text-[1.37rem] lg:text-[1.37rem] xl:text-[1.62rem] text-[#2C3652] leading-46 h-[401px] overflow-hidden pb-5 font-medium mt-[10px] sm:mt-auto">
                        Untimely and unwanted notifications irritate. Say bye to old technology, manage your
                        notifications on your own in real-time with relevant and valuable alerts, and set your
                        notification schedule at your convenience.
                      </div>
                    </div>
                  </div>
                  <div className="text-[4.37rem] sm:text-[7.5rem] md:text-[8.75rem] lg:text-[12.188rem] xl:text-[18.75rem] 3xl:text-[21.87rem] font-semibold text-indigo-700 opacity-[0.08] md:mt-[-85px] xl:mt-[-100px] ml-[-4px] md:ml-[-14px] 3xl:ml-[-25px] absolute top-[-20px] sm:top-[-40px] md:top-[40px] xl:top-[-7px] whitespace-nowrap z-[-1]">
                    Notification
                  </div>
                  <div className="absolute right-0 bottom-[5%] rotate-180 hidden lg:block">
                    <GaryDotes color="#c5b8f2" />
                  </div>
                </div>
              </Slide>

              <Slide index={8}>
                <div className="relative overflow-hidden">
                  <div className="flex flex-col-reverse sm:flex-col-reverse lg:flex-row left-0 right-0 px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto pt-[175px]">
                    <div className="mt-[-220px] sm:mt-[-70px] md:mt-[-100px] lg:mt-[-30px] xl:mt-[40px] w-[100%] md:w-[100%] lg:w-[57%] h-[300px] sm:h-auto">
                      <div className="absolute left-[-40px] 3xl:left-[100px] bottom-0 lg:bottom-[100px] xl:bottom-0 z-[-1] MarketSideIcon hidden lg:block">
                        <MarketSideIcon />
                      </div>
                      <motion.img src={"/images/ninthSlider.png"} className="w-[97%] hidden lg:block" />
                    </div>
                    <div className="sm:w-[100%] lg:w-[43%] mt-[-92px] sm:mt-[-52px] lg:mt-[-30px] xl:mt-auto">
                      <div className="w-[50px] h-[4px] xl:w-20 xl:h-1.5 bg-indigo-700"></div>
                      <div className="text-[1.25rem] md:text-[1.625rem] lg:text-[2.5rem] xl:text-[3.43rem] text-indigo-700 text-normal font-semibold">
                        Yoda
                      </div>
                      <div className="text-[1rem] md:text-[1.37rem] lg:text-[1.37rem] xl:text-[1.62rem] text-[#2C3652] leading-46 h-[401px] overflow-hidden pb-5 font-medium mt-[10px] sm:mt-auto">
                        Since instant messaging is inherent to our daily routine, chatting with a bot seems like a
                        natural extension of existing habits. Try Yoda, an AI-based chatbot ready to answer all your
                        queries 24*7.
                      </div>
                    </div>
                  </div>
                  <div className="text-[4.37rem] sm:text-[7.5rem] md:text-[8.75rem] lg:text-[12.188rem] xl:text-[18.75rem] 3xl:text-[21.87rem] font-semibold text-indigo-700 opacity-[0.08] md:mt-[-85px] xl:mt-[-100px] ml-[-4px] md:ml-[-14px] 3xl:ml-[-25px] absolute top-[-20px] sm:top-[-40px] md:top-[40px] xl:top-[-7px] whitespace-nowrap z-[-1]">
                    Yoda
                  </div>
                  <div className="w-[400px] absolute top-[100px] right-[-120px] hidden sm:hidden">
                    <motion.img src={"/images/yoda.svg"} />
                  </div>
                </div>
              </Slide>
            </Slider>
            {/* <div className="flex justify-between mt-[-228px]">
              <div className="w-[57%] "></div>
              <div className="w-[43%] "><NextPrevBtn /></div>
            </div>
             */}
            <div className="absolute left-0 bottom-[100px] sm:bottom-[110px] md:bottom-[90px] lg:bottom-[70px] xl:bottom-[150 px] 2xl:bottom-[200px] lg:top-auto w-full bg-red sm:flex sm:justify-between">
              <div className="w-[40%] xl:w-[57%]"></div>
              <div className="w-[60%] xl:w-[43%]">
                <NextPrevBtn />
              </div>
            </div>
            <div className="sm:overflow-x-auto left-0 right-0 px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] mt-[-160px] sm:mt-[-200px] md:mt-[0px] lg:mt-[-150px] 3xl:mt-[100px] m-auto">
              <div className=" flex  2xl:justify-center lg:mt-10 overflow-x-auto border-class relative z-10">
                <Dot slide={0}>
                  <div className="px-[10px] whitespace-nowrap sm:whitespace-nowrap lg:text-[.875rem] 2xl:text-[1.31rem] xl:text-[1.37rem] font-medium pt-[10px] text-blueInvolv-800 ml-[0px] border-t-[3px] border-inherit border-[#8B91A9]">
                    Integration
                  </div>
                </Dot>
                <Dot slide={1}>
                  <div className="px-[10px] whitespace-nowrap sm:whitespace-nowrap lg:text-[.875rem] 2xl:text-[1.31rem] xl:text-[1.37rem] font-medium pt-[10px] text-blueInvolv-800 border-t-[3px] border-inherit border-[#8B91A9]">
                    Data Security
                  </div>
                </Dot>
                <Dot slide={2}>
                  <div className="px-[10px] whitespace-nowrap sm:whitespace-nowrap lg:text-[.875rem] 2xl:text-[1.31rem] xl:text-[1.37rem] font-medium pt-[10px] text-blueInvolv-800 border-t-[3px] border-inherit border-[#8B91A9]">
                    Advance Analytics
                  </div>
                </Dot>
                <Dot slide={3}>
                  <div className="px-[10px] whitespace-nowrap sm:whitespace-nowrap lg:text-[.875rem] 2xl:text-[1.31rem] xl:text-[1.37rem] font-medium pt-[10px] text-blueInvolv-800 border-t-[3px] border-inherit border-[#8B91A9]">
                    Gamification
                  </div>
                </Dot>
                <Dot slide={4}>
                  <div className="px-[10px] whitespace-nowrap sm:whitespace-nowrap lg:text-[.875rem] 2xl:text-[1.31rem] xl:text-[1.37rem] font-medium pt-[10px] text-blueInvolv-800 border-t-[3px] border-inherit border-[#8B91A9]">
                    Governance
                  </div>
                </Dot>
                <Dot slide={5}>
                  <div className="px-[10px] whitespace-nowrap sm:whitespace-nowrap lg:text-[.875rem] 2xl:text-[1.31rem] xl:text-[1.37rem] font-medium pt-[10px] text-blueInvolv-800 border-t-[3px] border-inherit border-[#8B91A9]">
                    Hyper Personalization
                  </div>
                </Dot>
                <Dot slide={6}>
                  <div className="px-[10px] whitespace-nowrap sm:whitespace-nowrap lg:text-[.875rem] 2xl:text-[1.31rem] xl:text-[1.37rem] font-medium pt-[10px] text-blueInvolv-800 border-t-[3px] border-inherit border-[#8B91A9]">
                    Mobile First
                  </div>
                </Dot>
                <Dot slide={7}>
                  <div className="px-[10px] whitespace-nowrap sm:whitespace-nowrap lg:text-[.875rem] 2xl:text-[1.31rem] xl:text-[1.37rem] font-medium pt-[10px] text-blueInvolv-800 border-t-[3px] border-inherit border-[#8B91A9]">
                    Notification
                  </div>
                </Dot>
                <Dot slide={8}>
                  <div className="px-[10px] whitespace-nowrap sm:whitespace-nowrap lg:text-[.875rem] 2xl:text-[1.31rem] xl:text-[1.37rem] font-medium pt-[10px] text-blueInvolv-800 mr-[0px] border-t-[3px] border-inherit border-[#8B91A9]">
                    Yoda
                  </div>
                </Dot>
              </div>
            </div>
          </CarouselProvider>
        </div>

        <div className="" ref={pricingRef}>
          <div className="w-[90%] sm:w-[50%] md:w-full mt-5 md:mt-0 xl:w-[50%] 3xl:w-[60%] ml-[-150px] sm:ml-[-180px] md:ml-[-261px] lg:ml-[-280px] xl:ml-[-350px] 2xl:ml-[-500px] 3xl:ml-[-600px] xl:mt-[50px]">
            <motion.img src={"/images/Unite-cloud-only-white-bg.svg"} />
          </div>
          <div className="sm:mt-[-250px] mt-[-200px] md:mt-[-442px] lg:mt-[-360px] xl:mt-[-400px] 2xl:mt-[-500px] 3xl:mt-[-700px] xl:container 3xl:w-[1650px] block mx-auto">
            <div className="text-[1.25rem] md:text-[1.62rem] lg:text-[3.43rem] text-center leading-10 xl:leading-[65px] font-semibold text-[#2C3652]">
              Pricing
            </div>
            <div className="text:[16px] md:text-[1.37rem] lg:text-[1.62rem] text-center font-medium leading-7 md:leading-[38px] xl:leading-46 md:w-[593px] xl:w-full md:ml-auto md:mr-auto md:mt-7 xl:mt-3 xl:ml-0 xl:mr-0 text-[#8B91A9]">
              Unite is a student engagement portal that unscrambles student management solutions for you. It delivers
              everything you need. Now stop searching for more solutions and{" "}
              <span className="text-[#FF725E] underline">sign up</span> to choose a suitable package for your
              university.
            </div>
            <div className="flex justify-center md:mt-16 xl:mt-20">
              <div className="mt-[30px] mr-[-20px]">
                <motion.img src={"/images/why-arrow.svg"} />
              </div>
              <button className="text-[.813rem] sm:text-[1rem] text-[#FF725E] bg-[#FFF5F4] rounded-[50px] h-[50px] px-[20px] mt-[25px] ml-[30px]">
                Save 20%
              </button>
            </div>
            <div className="bg-[#F4F5FE] xl:w-[410px] xl:h-[92px] w-fit px-[10px] py-[10px] flex items-center mx-auto rounded-[50px] mt-[25px]">
              <button
                // key={id}
                className={` ${
                  activePlan === false ? "text-[#FF725E] shadow-6xl bg-[#FFFFFF] " : "text-[#656BA2]"
                } w-[116px] h-[46px] hidden lg:block sm:w-[194px] sm:h-[78px] text-[.875rem] sm:text-[1.25rem] transition-all duration-1000 ease-in-out py-[10px] px-[10px] rounded-[50px]`}
                onClick={() => activePlanClass(activePlan)}
              >
                Yearly
              </button>
              <button
                className={` ${
                  activePlan === true ? "text-[#FF725E] shadow-6xl bg-[#FFFFFF] " : "text-[#656BA2]"
                } w-[116px] h-[46px] hidden lg:block sm:w-[194px] sm:h-[78px] text-[.875rem] sm:text-[1.25rem] py-[10px] px-[10px] rounded-[50px] transition-all duration-1000 ease-in-out `}
                onClick={() => activePlanClass(!activePlan)}
              >
                Monthly
              </button>
              <button
                className={` ${
                  mobileActive === false ? "text-[#FF725E] shadow-6xl bg-[#FFFFFF] " : "text-[#656BA2]"
                } w-[116px] h-[46px] sm:w-[194px] block lg:hidden sm:h-[78px] text-[.875rem] sm:text-[1.25rem] transition-all duration-1000 ease-in-out py-[10px] px-[10px] rounded-[50px]`}
                onClick={() => activeMobileClass(mobileActive)}
              >
                Yearly
              </button>
              <button
                className={` ${
                  mobileActive === true ? "text-[#FF725E] shadow-6xl bg-[#FFFFFF] " : "text-[#656BA2]"
                } w-[116px] h-[46px] sm:w-[194px] sm:h-[78px] block lg:hidden text-[.875rem] sm:text-[1.25rem] py-[10px] px-[10px] rounded-[50px] transition-all duration-1000 ease-in-out `}
                onClick={() => activeMobileClass(!mobileActive)}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="3xl:container lg:w-[1000px] xl:w-[1250px] 3xl:w-[1650px] block mx-auto relative top-[150px] hidden lg:block">
            <div className="flex justify-center z-[100]">
              {!activePlan ? (
                <div className="flex">
                  <div className="flex justify-center z-[10] transition-all duration-1000 ease-in-out">
                    <div className="bg-[#fff] w-[417px] lg:p-[20px] 3xl:p-[50px] lg:h-[322px] xl:h-[417px] 3xl:h-[433px] border border-[#E3E3E3]">
                      <div className="text-[2rem] text-[#2C3652] text-center">Free</div>
                      <div className="lg:text-[2.81rem] 3xl:text-[4.06rem] text-medium text-[#2C3652] text-center mt-[20px]">
                        $0
                      </div>
                      <div className="text-[1.25rem] text-normal text-[#8B91A9] text-center">Lorem</div>
                      <button className="text-[1.12rem] text-normal text-[#FF725E] bg-[#FFF5F4] block mx-auto rounded-full px-[25px] py-[14px] mt-[30px]">
                        Get Started
                      </button>
                    </div>
                  </div>
                  <div className="mx-[20px] transition-all duration-1000 ease-in-out">
                    <motion.img src={"/images/preminum-blue-img.svg"} className="w-[417px]" />
                    <div className="mx-[15px] lg:mt-[-280px] 3xl:mt-[-350px] z-999">
                      <div className="text-[2rem] text-[#FFFFFF] text-normal text-center">Premium</div>
                      <div className="lg:text-[2.81rem] 3xl:text-[4.06rem] text-[#FFFFFF] text-medium text-center">
                        $39
                      </div>
                      <div className="text-[1.25rem] text-[#E5E6E6] text-normal text-center">Lorem</div>
                      <button className="text-[1.12rem] text-normal text-[#FFFFFF] bg-[#FF725E] block mx-auto rounded-full px-[25px] py-[14px] mt-[30px]">
                        Get Started
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#fff] w-[417px] lg:p-[20px] 3xl:p-[50px] lg:h-[322px] xl:h-[417px] 3xl:h-[433px] border border-[#E3E3E3]">
                    <div className="text-[2rem] text-[#2C3652] text-center">Custom</div>
                    <div className="lg:text-[2.81rem] 3xl:text-[4.06rem] text-medium text-[#2C3652] text-center mt-[20px]">
                      $100
                    </div>
                    <div className="text-[1.25rem] text-normal text-[#8B91A9] text-center">Lorem</div>
                    <button className="text-[1.12rem] text-normal text-[#FFF] bg-[#00ABFF] block mx-auto rounded-full px-[25px] py-[14px] mt-[30px]">
                      Contact Us
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex">
                  <div className="flex justify-center z-[10]">
                    <div className="bg-[#fff] w-[417px] lg:p-[20px] 3xl:p-[50px] lg:h-[322px] xl:h-[417px] 3xl:h-[433px] transition-all duration-1000 ease-in-out border border-[#E3E3E3]">
                      <div className="text-[2rem] text-[#2C3652] text-center">Free</div>
                      <div className="lg:text-[2.81rem] 3xl:text-[4.06rem] text-medium text-[#2C3652] text-center mt-[20px]">
                        $0
                      </div>
                      <div className="text-[1.25rem] text-normal text-[#8B91A9] text-center">Lorem</div>
                      <button className="text-[1.12rem] text-normal text-[#FF725E] bg-[#FFF5F4] block mx-auto rounded-full px-[25px] py-[14px] mt-[30px]">
                        Get Started
                      </button>
                    </div>
                  </div>
                  <div className="mx-[20px] transition-all duration-1000 ease-in-out">
                    <motion.img src={"/images/preminum-blue-img.svg"} className="w-[417px]" />
                    <div className="mx-[15px] lg:mt-[-280px] 3xl:mt-[-350px] z-999">
                      <div className="text-[2rem] text-[#FFFFFF] text-normal text-center">Premium</div>
                      <div className="lg:text-[2.81rem] 3xl:text-[4.06rem] text-[#FFFFFF] text-medium text-center">
                        $24
                      </div>
                      <div className="text-[1.25rem] text-[#E5E6E6] text-normal text-center">Lorem</div>
                      <button className="text-[1.12rem] text-normal text-[#FFFFFF] bg-[#FF725E] block mx-auto rounded-full px-[25px] py-[14px] mt-[30px]">
                        Get Started
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#fff] w-[417px] lg:p-[20px] 3xl:p-[50px] lg:h-[322px] xl:h-[417px] 3xl:h-[433px] transition-all duration-1000 ease-in-out border border-[#E3E3E3]">
                    <div className="text-[2rem] text-[#2C3652] text-center">Custom</div>
                    <div className="lg:text-[2.81rem] 3xl:text-[4.06rem] text-medium text-[#2C3652] text-center mt-[20px]">
                      $80
                    </div>
                    <div className="text-[1.25rem] text-normal text-[#8B91A9] text-center">Lorem</div>
                    <button className="text-[1.12rem] text-normal text-[#FFF] bg-[#00ABFF] block mx-auto rounded-full px-[25px] py-[14px] mt-[30px]">
                      Contact Us
                    </button>
                  </div>
                </div>
              )}
            </div>
            <motion.img
              src={"/images/primium-img.png"}
              className="absolute lg:top-[60px] xl:top-auto xl:bottom-[-100px] 3xl:top-auto 3xl:bottom-[-130px] left-0 z-[-1]"
            />
            <button
              className="text-[1.5rem] text-[#fff] bg-[#3246D3] rounded-full w-[305px] py-[15px] absolute bottom-[-190px] left-0 right-0 mx-auto"
              onClick={() => setOpenModal(true)}
            >
              Compare Plans
            </button>
            <InvolvAdminPlanModal openModal={openModal} setOpenModal={setOpenModal}>
              <PlanTable activePlan={activePlan} />
            </InvolvAdminPlanModal>
          </div>
          <div className="md:block lg:hidden overflow-x-scroll mt-[50px] md:mt=[20px] lg:mt-auto">
            <PlanTable className="md:w-[800px]" mobileActive={mobileActive} />
          </div>

          {/* {premiumData.map((item) =>
            <div className="xl:container 3xl:w-[1650px] block mx-auto relative top-[150px]">
            <div className="flex justify-center z-[100]">
              <div className="bg-[#fff] w-[417px] p-[50px] h-[433px]">
                <div className="text-[32px] text-[#2C3652] text-center">{item.heading}</div>
                <div className="text-[65px] text-medium text-[#2C3652] text-center mt-[20px]">{item.amount}</div>
                <div className="text-[20px] text-normal text-[#8B91A9] text-center">{item.text}</div>
                <button className="text-[18px] text-normal text-[#FF725E] bg-[#FFF5F4] block mx-auto rounded-full px-[25px] py-[14px] mt-[30px]" >{item.button}</button>
              </div>
              <div className="mx-[20px]">
                <motion.img src={"/images/preminum-blue-img.svg"} className="w-[417px]"/>
                <div className="mx-[15px] mt-[-350px] z-999">
                  <div className="text-[32px] text-[#FFFFFF] text-normal text-center">Premium</div>
                  <div className="text-[65px] text-[#FFFFFF] text-medium text-center">$39</div>
                  <div className="text-[20px] text-[#E5E6E6] text-normal text-center">Lorem</div>
                  <button className="text-[18px] text-normal text-[#FFFFFF] bg-[#FF725E] block mx-auto rounded-full px-[25px] py-[14px] mt-[30px]">Get Started</button>
                  
                </div>
              </div>
              <div className="bg-[#fff] w-[417px] p-[50px] h-[433px]">
                <div className="text-[32px] text-[#2C3652] text-center">Custom</div>
                <div className="text-[65px] text-medium text-[#2C3652] text-center mt-[20px]">$100</div>
                <div className="text-[20px] text-normal text-[#8B91A9] text-center">Lorem</div>
                <button className="text-[18px] text-normal text-[#FFF] bg-[#00ABFF] block mx-auto rounded-full px-[25px] py-[14px] mt-[30px]">Contact Us</button>
              </div>
            </div>
            <motion.img src={"/images/primium-img.png"} className="mt-[-400px] absolute bottom-[-120px] left-0 z-[-1]"/>
          </div>
          )} */}
        </div>
        <div className="lg:mt-[450px] xl:mt-[450px] 2xl:mt-[450px] 3xl:mt-[450px]   ">
          <InvolvTopFooter />
        </div>

        {/* <div className="lg:mt-[450px] xl:mt-[450px] 2xl:mt-[450px] 3xl:mt-[450px] bg-[#F8F8F8] py-[90px] mb-[80px] xl:mb-[123px]">
          <div className="px-[14px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto">
            <div className="text-center xl:text-left xl:flex">
              <img
                src="/images/cult.svg"
                className="m-auto xl:m-0 w-[185px] h-[140px] xl:w-[297px] xl:h-[225px]"
              />
              <div className="xl:pl-5">
                <div className="text-[26px] xl:text-3xl 3xl:text-[2.5rem] text-[#3A3B3C] font-semibold mt-5 xl:mt-2 mb-5 xl:mb-10">
                  With Unite, celebrate transformation, and create a cult
                </div>
                <div className="relative xl:w-[90%]">
                  <input
                    type="text"
                    placeholder="Institution Email Address*"
                    className="w-full border border-[#A5A0A0] rounded-full h-[50px] xl:h-[83px] pr-[110px] pl-[20px] xl:pl-[33px] text-sm xl:text-xl placeholder:text-[#A3A5A7]"
                  />
                  <button className="bg-indigo-900 w-[102px] xl:w-[248px] h-[42px]  xl:h-[66px] rounded-full text-white text-sm xl:text-2xl absolute right-[4px] top-[4px]">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <img src="/images/uniteLogo.svg" className="m-auto" />
          <div className="text-indigo-900 text-xl xl:text-4xl font-semibold mt-5 mb-[110px] xl:mb-[177px]">
            The journey from a student to alumni via a single dashboard
          </div>
        </div> */}
      </div>
      <InvolvFooter />
    </LayoutTransition>
  );
}

export default InvolveAdminWhyUnite;
