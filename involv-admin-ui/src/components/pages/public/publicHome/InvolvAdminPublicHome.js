import React, { useEffect } from "react";
import InvolvHeader from "../../../shared/header/InvolvHeader";
import LayoutTransition from "../../../shared/LayoutTransition";
import { LongArrowRight } from "../../../../AppIcons";
import InvolvFooter from "../../../shared/footer/InvolvFooter";
import { motion, useAnimation } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import useInvolvScreenSize from "../../../../hooks/useInvolvScreenSize";
import "pure-react-carousel/dist/react-carousel.es.css";
import InvolvTopFooter from "../../../shared/footer/InvolvTopFooter";
import { NavLink } from "react-router-dom";
import EngagementHub from "../shared/EngagementHub";

// import { useInView } from "react-intersection-observer";

function InvolvAdminPublicHome() {
  // const control = useAnimation();
  // const [ref, inView] = useInView();
  // const boxVariant = {
  //   visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  //   hidden: { opacity: 0, scale: 0 },
  // };

  // useEffect(() => {
  //   if (inView) {
  //     control.start("visible");
  //   } else {
  //     control.start("hidden");
  //   }
  // }, [control, inView]);
  const [isMobile, isTab] = useInvolvScreenSize();

  useEffect(function () {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <LayoutTransition>
      <InvolvHeader />
      <div className="overflow-hidden">
        <div>
          <div className="relative">
            <div
              className="bg-publicBanner relative overflow-hidden h-[346px] md:h-[386px] xl:h-[680px]  2xl:h-[820px] bg-cover bg-no-repeat"
              style={{
                backgroundImage: "url('/images/pulicBanner.png')",
              }}
            >
              <motion.img
                animate={{ y: 100 }}
                transition={{ ease: "easeIn", duration: 2 }}
                src={"/images/banner-img1.PNG"}
                className="hidden xl:block absolute right-[16%]  top-[-270px] 2xl:top-[-300px] 3xl:top-[-372px] w-[620px] 2xl:w-[720px] 3xl:w-[997px]"
              />

              <motion.img
                animate={{ x: ["100px", "0px", "0px"] }}
                transition={{ ease: "easeOut", duration: 1 }}
                src={"/images/banner-img2.png"}
                className="hidden xl:block absolute right-[-144px] 2xl:right-[-184px] w-[520px] 2xl:w-[662px] top-[-87px]"
                style={{ transition: "all .5s ease-in-out" }}
              />
              <motion.img
                animate={{ y: ["100px", "0px", "0px"] }}
                transition={{ ease: "easeOut", duration: 2 }}
                src={"/images/banner-img3.png"}
                className="hidden xl:block  absolute right-[13rem]  2xl:right-[18rem]  bottom-[-1px] 2xl:bottom-[-9px] w-[380px] 2xl:w-[436px]"
                style={{ transition: "all .5s ease-in-out" }}
              />
              <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative ">
                <div className="w-full xl:w-[60%] items-center  h-full relative xl:absolute top-0 left-0 pl-0 xl:pl-[30px]">
                  <div className="flex items-center h-full">
                    <div>
                      <div className="w-[50px] h-[4px] xl:w-20 xl:h-1.5 bg-white mb-5"></div>
                      <div className="text-[1.75rem] md:text-[2.25rem] xl:text-5xl 3xl:text-6xl md:w-[80%] xl:w-full leading-[38px] md:leading-45 xl:leading-[65px] text-white font-semibold">
                        Unite, a flawless student engagement portal
                      </div>
                      <div className="text-base md:text-xl 2xl:text-lg 3xl:text-xl leading-[26px] md:leading-[38px] xl:leading-[30px] text-grayInvolv-600 mt-6 w-full md:w-[85%] xl:w-full xl:w-1/2">
                        Exceptional student experience, evolved faculty management and Robust University Solution
                      </div>
                      <div className="flex  items-start mt-10">
                        <button className="bg-white text-indigo-900 rounded-full md:mr-8 xl:mr-4 py-2 p-0 w-[143px] md:w-[163px] md:h-[36px] xl:w-auto xl:h-[44px] xl:p-5 xl:py-2 font-medium text-sm md:text-base xl:text-lg 3xl:text-xl flex items-center">
                          <span className="mr-3 ml-3 md:leading-[43px] xl:leading-[54px]">Book a Demo</span>{" "}
                          <LongArrowRight width={isMobile ? "12px" : "17px"} />
                        </button>
                        <button className="bg-white text-indigo-900 rounded-full md:leading-[43px] xl:leading-[54px] mr-4 py-2 p-0 w-[143px] md:w-[153px] md:h-[36px] xl:w-auto xl:h-[44px] xl:p-5 xl:py-2 font-medium text-sm md:text-base xl:text-lg 3xl:text-xl flex items-center ml-2">
                          <span className="mr-3 ml-3 md:leading-[43px] xl:leading-[54px]">Take a Tour</span>{" "}
                          <LongArrowRight width={isMobile ? "12px" : "17px"} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="block relative w-[345px] md:w-[716px] xl:hidden h-[300px] md:h-[570px] my-[15px] mb-0 mx-auto">
              <motion.img
                animate={{ x: ["0px", "0px", "50px"] }}
                transition={{ ease: "easeOut", duration: 1 }}
                src={"/images/banner-img1-mob.png"}
                className="absolute left-[-50px]  top-[20px] 2xl:top-[-300px] 3xl:top-[-372px] w-[223px]  md:w-auto"
              />

              <motion.img
                animate={{ x: ["100px", "0px", "0px"] }}
                transition={{ ease: "easeOut", duration: 1 }}
                src={"/images/banner-img2-mob.png"}
                className="absolute right-[0] top-[70px] md:top-[112px] w-[162px] md:w-auto"
              />
              <motion.img
                animate={{ y: ["100px", "0px", "0px"] }}
                transition={{ ease: "easeOut", duration: 2 }}
                src={"/images/banner-img3-mob.png"}
                className="absolute right-0 left-0 m-auto   bottom-[0] w-[106px]  md:w-auto"
              />
            </div>

            <motion.div
              className="text-white relative xl:absolute w-full pr-0 xl:pr-32 text-center bottom-[-40px] 2xl:bottom-[-20px]"
              animate={{ y: ["100px", "0px", "0px"] }}
              transition={{ ease: "easeOut", duration: 3 }}
            >
              <div className="flex flex-col md:flex-row  items-center justify-center xl:justify-end flex-wrap px-[14px] md:px-[26px] xl:px-0">
                <div className="bg-indigo-700 w-[211px] xl:w-60 2xl:w-72 md:mr-10 xl:mr-14 p-5 rounded-xl h-[102px]  xl:h-[120px] 2xl:h-[139px] flex items-center justify-center mb-5 md:mb-0">
                  <div>
                    <div className="text-3xl xl:text-4xl md:font-normal xl:font-bold md:leading-46 xl:leading-[60px]">
                      64k+
                    </div>
                    <div className="text-sm xl:text-lg font-normal md:leading-[21px] xl:leading-[27px]">
                      Happy Students
                    </div>
                  </div>
                </div>
                <div className="bg-[#5030B9] w-[211px] xl:w-60 2xl:w-72 md:mr-10 xl:mr-14 p-5 rounded-xl h-[102px] xl:h-[120px] 2xl:h-[139px] flex items-center justify-center mb-5 md:mb-0">
                  <div>
                    <div className="text-3xl xl:text-4xl md:font-normal xl:font-bold md:leading-46 xl:leading-[60px]">
                      8k+
                    </div>
                    <div className="text-sm xl:text-lg font-normal md:leading-[21px] xl:leading-[27px]">
                      Satisfied Faculties
                    </div>
                  </div>
                </div>
                <div className="bg-[#391E94] w-[211px] xl:w-60 2xl:w-72 p-5 rounded-xl h-[102px] md:h-[102px] 2xl:h-[139px] flex items-center justify-center">
                  <div>
                    <div className="text-3xl xl:text-4xl md:font-normal xl:font-bold md:leading-46 xl:leading-[60px]">
                      1k+
                    </div>
                    <div className="text-sm xl:text-lg font-normal md:leading-[21px] xl:leading-[27px]">
                      Universities
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto mb-14 mt-20 xl:mt-0">
            <div className="flex py-6 md:mt-32 xl:mt-12 flex-wrap">
              <div className="w-full xl:w-[40%] mb-5 xl:mb-0">
                <div className="w-[50px] h-[4px] xl:w-20 xl:h-1.5 bg-gray-900 mb-5"></div>
                <div className="text-xl md:text-[26px] xl:text-[24px] md:leading-[40px] xl:leading-[35px] font-semibold">
                  Partners
                </div>
                <div className="md:text-[24px] xl:text-[20px] md:leading-[26px] xl:leading-[30px] text-grayInvolv-600 mt-3">
                  Unite the latest choice of Higher Ed Institutes
                </div>
              </div>
              <div className="w-full xl:w-[60%]">
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                    <div className="flex items-center justify-center mb-5 xl:mb-0">
                      <img src="/images/partner1.png" />
                    </div>
                    <div className="flex items-center justify-center mb-5 xl:mb-0">
                      <img src="/images/partner2.png" />
                    </div>

                    <div className="flex items-center justify-center mb-5 xl:mb-0">
                      <img src="/images/partner3.png" />
                    </div>

                    <div className="flex items-center justify-center mb-5 xl:mb-0">
                      <img src="/images/partner4.png" />
                    </div>
                    <div className="flex items-center justify-center">
                      <img src="/images/partner5.png" />
                    </div>
                    <div className="flex items-center justify-center">
                      <img src="/images/partner6.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <motion.div
          className="relative mt h-[1100px] "
          ref={ref}
          variants={boxVariant}
          initial="hidden"
          animate={control}
        > */}

          <div className="xl:block relative mt h-auto xl:h-[900px] 3xl:h-[1100px] ">
            <div className="h-[770px] md:h-[1200px] lg:h-[1250px] relative xl:static xl:h-auto">
              <img
                src={"/images/hub1.png"}
                className="z-10 absolute left-0 top-0 w-[200px] md:w-[450px] lg:w-[531px] xl:w-[300px] 3xl:w-[531px]"
                animation="fade-right"
                data-aos="fade-right"
              />
              <img
                src={"/images/hub2.png"}
                className="z-10 absolute top-0 right-[-20px] lg:right-[50px] xl:right-auto xl:left-[24%] w-[150px] md:w-[240px] xl:w-[180px] 3xl:w-[191px]"
                animation="fade-right"
                data-aos="fade-right"
              />
              <img
                src={"/images/hub3.png"}
                className="hidden xl:block absolute top-0 left-[39%] w-[278px] 3xl:w-[378px]"
                animation="fade-right"
                data-aos="fade-right"
              />
              <img
                src={"/images/hub4.png"}
                className="md:hidden xl:block z-10 absolute bottom-0 xl:bottom-auto xl:top-0 right-[-10px] xl:right-[28%] w-[150px] 3xl:w-[206px]"
                animation="fade-left"
                data-aos="fade-left"
              />
              <img
                src={"/images/hub5.png"}
                className="md:hidden xl:block z-10 absolute bottom-[75px] xl:bottom-auto xl:top-0 left-[-70px] xl:left-0 xl:left-auto xl:right-[2%] w-[278px] 3xl:w-[378px]"
                animation="fade-left"
                data-aos="fade-left"
              />
              <img
                src={"/images/hub6.png"}
                className="hidden xl:block  absolute top-[207px] xl:top-[190px] 3xl:top-[207px] right-[6%] w-[278px] 3xl:w-[378px]"
                animation="fade-left"
                data-aos="fade-left"
              />
              <img
                src={"/images/hub7.png"}
                className="z-10 hidden md:block  absolute md:right-[-30%] lg:right-[-2%] xl:right-0 bottom-[240px] 3xl:bottom-[200px]  xl:w-[390px] 3xl:w-[533px]"
              />
              <img
                src={"/images/hub8.png"}
                className="z-10 absolute right-[-100px] lg:right-0 xl:right-[33%] top-[41%] md:top-auto md:bottom-[0]  w-[278px] md:w-[378px] xl:w-[278px] 3xl:w-[378px]"
              />
              <img
                src={"/images/hub9.png"}
                className="hidden xl:block  z-10 absolute left-[31%] bottom-[-70px] 3xl:bottom-[-150px] w-[150px] 3xl:w-[206px]"
              />
              <img
                src={"/images/hub10.png"}
                className="absolute left-[-80px] md:left-[-130px] lg:left-[-70px] xl:left-[-70px] top-[200px] md:top-auto md:bottom-0  xl:bottom-[-70px] 3xl:bottom-[-160px] w-[300px] md:w-[604px] xl:w-[520px] 3xl:w-[604px]"
              />
            </div>
            <div className="flex justify-center items-baseline xl:items-center h-full text-center flex-wrap mt-10 xl:mt-0 px-[14px] md:px-[26px] xl:p-0">
              <div className="xl:w-2/6 text-base md:text-xl  3xl:text-xl">
                <img src={"/images/scholarhub.png"} className="m-auto mb-10 3xl:mb-16 w-[200px] 3xl:w-[365px]" />
                <div className="text-[#3A3B3C] md:text-[24px] xl:text-[20px] md:leading-[38px] xl:leading-[30px] font-normal">
                  An epicenter of higher education designed for student engagement that brings students, faculties, and
                  technology, to communicate via a single platform
                </div>
                <div className="flex justify-center mt-0 3xl:mt-10">
                  <NavLink to="scholar-hub">
                    <button className="bg-white text-red-300 rounded-full mr-4 py-2 p-5 font-medium text-sm md:text-base xl:text-xl flex items-center border mt-5 border-red-300  w-[142px]xl:w-[181px] justify-between">
                      <span className="mr-3 md:text-[16px] md:mr-16 xl:mr-0">Explore</span>{" "}
                      <LongArrowRight width={isMobile ? "12px" : "17px"} />
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>

            {/* </motion.div> */}
          </div>
          <div
            className="mt-[60px] xl:mt-56 z-10 w-full h-[502px] md:h-[680px] xl:h-[870px] relative bg-no-repeat bg-cover"
            style={{
              backgroundImage: isMobile
                ? "url('/images/mentorhubbgmob.png')"
                : isTab
                ? "url('/images/mentorhubgTab.png')"
                : "url('/images/mentorhubbg.png')",
            }}
          >
            <div className="bg-[#00402C] bg-opacity-50 w-full md:w-1/2 h-full absolute top-0 left-0"></div>
            <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative">
              <div className="w-full md:w-1/2 items-center  h-full">
                <div className="flex items-center h-full">
                  <div>
                    <div className="w-[50px] h-[4px] xl:w-20 xl:h-1.5 bg-white mb-5"></div>
                    <div className="text-xl md:text-[1.62rem] xl:text-2xl md:leading-[38px] xl:leading-[35px] md:font-semibold xl:font-normal text-white mb-9">
                      Mentor Hub
                    </div>
                    <div className="text-white text-[28px] md:text-[36px] xl:text-[60px] font-semibold leading-[37px] md:leading-45 xl:leading-[65px] text-left">
                      Bridging the gap between students and mentors
                    </div>
                    <div className="text-[1.75rem] md:text-4xl xl:text-5xl 3xl:text-6xl text-white font-semibold"></div>
                    <div className="text-base md:text-[24px] 3xl:text-[20px] md:leading-[38px] xl:leading-[30px] font-normal text-white mt-6 md:w=[39px] xl:w-[707px]">
                      Faculty and student communication inside and outside the class gives a lift to more effective
                      interactions and boost student engagement
                    </div>
                    <div className="flex mt-16">
                      <NavLink to="mentor-hub">
                        <button className="bg-white text-indigo-900 rounded-full mr-4 py-2 p-5 font-medium text-sm md:text-base xl:text-xl flex items-center">
                          <span className="mr-3">Book a Demo</span>{" "}
                          <LongArrowRight width={isMobile ? "12px" : "17px"} />
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="z-10 w-full md:bg-contain md:bg-[-50% 100%] xl:bg-cover bg-no-repeat relative"
          style={{
            backgroundImage: "url('/images/Unite-cloud-only-white.svg')",
          }}
        >
          <div className="flex items-center text-center justify-center pt-24 xl:pt-24">
            <div>
              <div className="w-[50px] h-[4px] xl:w-[73px] xl:h-1.5 bg-blackInvolv-900 m-auto mb-5"></div>
              <div className="text-xl md:text-[26px] xl:text-[24px] md:leading-[38px] xl:leading-[35px] text-blackInvolv-900 font-semibold">
                Nerve center
              </div>
              <div className="text-[1.75rem] md:text-[36px] xl:text-[60px] leading-[37px] w-[345px] md:w-full md:leading-45 xl:leading-[65px] text-[#2C3652] font-semibold mt-7">
                One solitary system for students, faculties, and universities Unite for all
              </div>
            </div>
          </div>

          <div className="px-[14px] md:px-0 xl:px-[30px] xl:container 3xl:w-[1650px] m-auto ">
            <div className="grid xl:grid-cols-2 gap-6 m-auto xl:mt-36 xl:mt-20 relative">
              <div className="hidden xl:block">
                <img src="/images/nerve-center.png" />
              </div>
              <div className="xl:pl-10 xl:pr-10">
                <div className="pt-16">
                  <div className="ml-auto mr-auto md:ml-auto md:mr-auto xl:ml-0 w-[50px] h-[4px] xl:w-20 xl:h-1.5 bg-blackInvolv-900   mb-5"></div>
                  <div className="text-center xl:text-left md:leading-[38px] xl:leading-[35px] text-[20px] md:text-[26px] xl:text-[24px] text-blackInvolv-900 font-semibold">
                    Integration
                  </div>
                  <div className="block text-base md:text-xl text-grayInvolv-600 mt-6 xl:w-[90%] relative">
                    <div className="w-[250px] md:w-[577px] xl:w-full m-auto xl:m-0 text-[16px] md:text-[24px] xl:text-[20px] md:leading-[34px] xl:leading-[30px] text-center xl:text-left">
                      Unite Nerve Centre is a centralized and secure system that provides a cloud-based student
                      engagement platform with seamless navigation and faster accessibility on the web and mobile. It
                      provides effortless integration with various major platforms and solutions like SIS & LMS
                    </div>
                    <NavLink to="/nerve-centre">
                      <div
                        className="bg-[#3A3B3C] rounded-full w-[50px] h-[50px] md:w-[74px] md:h-[74px] xl:w-[144px] xl:h-[144px] text-white  flex items-center justify-center absolute top-0 right-[-5px] md:right-5 xl:right-[-220px] md:top-[80px] xl:top-[50px] "
                        animation="slide-right"
                        data-aos="slide-right"
                      >
                        <LongArrowRight width={isMobile ? "17px" : "51"} height={isMobile ? "14px" : "25px"} />
                      </div>
                    </NavLink>
                  </div>

                  <div
                    className="relative py-[20px] px-[20px] md:px-0 xl:px-[40px] rounded-xl xl:p-0 mt-7 md:mt-7 xl:mt-0 shadow-lg md:shadow-none xl:shadow-none xl:absolute right-0 xl:w-[70%] md:h-[400px] lg:h-[600px] xl:h-[536px] bg-[length:100%_100%] bg-white md:bg-transparent xl:bg-transparent"
                    animation="flip-left"
                    data-aos="flip-left"
                    // style={{
                    //   backgroundImage: "url('/images/nerve-card.svg')",
                    // }}
                  >
                    <div className="relative">
                      <img src="/images/nerve-card.svg" className="hidden md:block xl:block" />
                      {/* className="relative xl:absolute bottom-0 2xl:bottom-auto 2xl:top-0 left-0 xl:p-[133px] 3xl:p-[115px]"  */}
                      <div className="relative xl:absolute bottom-0 md:bottom-[370px] lg:bottom-[440px] xl:bottom-[40px] 2xl:bottom-auto 2xl:top-0 left-0 md:px-[60px] lg:px-[80px] xl:p-[95px] 3xl:p-[115px]">
                        <div className="md:flex xl:flex mb-10 text-center md:text-left">
                          <img
                            src="/images/nerveImg1.png"
                            className="h-[99px] xl:h-23 md:mt-[-10px] m-auto mb-5 md:mb-0 md:m-0"
                          />
                          <div className="md:pl-10 text-sm md:text-base xl:text-lg md:mb-[-20px] xl:mb-[-30px] 2xl:mb-0">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia. Duis
                            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
                            <button className="md:hidden bg-white text-indigo-900 border border-indigo-900 rounded-full  py-2 p-5 font-medium text-base xl:text-xl 3xl:text-xl flex xl:hidden items-center h-max m-auto mt-5">
                              <span className="mr-3">Read More</span> <LongArrowRight />
                            </button>
                          </div>
                        </div>

                        <div className="w-full flex justify-between">
                          <div className="text-center md:text-left md:flex xl:flex w-full xl:w-auto">
                            <img src="/images/nerveAvatar.png" className="m-auto xl:m-0 w-20 h-20 3xl:w-24 3xl:h-24" />
                            <div className="text-blackInvolv-900 text-base xl:text-lg 3xl:text-xl md:pl-10 w-full">
                              <div className="font-semibold">Jack Post </div>
                              <div>Chief Information Officer,</div>
                              <div>Camden County College</div>
                            </div>
                          </div>
                          <button className="hidden bg-white text-indigo-900 w-64 xl:w-52 border border-indigo-900 rounded-full mr-4 py-2 p-5 font-medium text-base 3xl:text-xl md:flex items-center md:text-left justify-between h-max">
                            <span className="mr-3">Read More</span>{" "}
                            <LongArrowRight width={isMobile ? "12px" : "17px"} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EngagementHub />
        <InvolvTopFooter />
      </div>
      <InvolvFooter />
    </LayoutTransition>
  );
}

export default InvolvAdminPublicHome;
