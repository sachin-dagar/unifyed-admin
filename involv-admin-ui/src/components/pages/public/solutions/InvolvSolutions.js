import React from "react";
import InvolvHeader from "../../../shared/header/InvolvHeader";
import LayoutTransition from "../../../shared/LayoutTransition";
import { GaryDotes, LongArrowRight } from "../../../../AppIcons";
import InvolvFooter from "../../../shared/footer/InvolvFooter";
import { motion } from "framer-motion";
import EngagementHub from "../shared/EngagementHub";
import InvolvTopFooter from "../../../shared/footer/InvolvTopFooter";

function InvolvSolutions() {
  return (
    <LayoutTransition>
      <InvolvHeader />
      <div className="overflow-hidden">
        <div>
          <div className="relative">
            <div
              className={`relative overflow-hidden h-[785px] md:h-[759px] xl:h-[1000px] 2xl:h-[926px] bg-cover bg-no-repeat z-10 bg-solutionsBannerMobile md:bg-solutionsBanneriPad  lg:bg-solutionsBanner`}
              // className={` relative overflow-hidden py-[79px] md:py-[58px] lg:py-[25px] bg-cover bg-no-repeat z-10 bg-scholarBannerMobile md:bg-scholarBannerTab  lg:bg-scholarBanner`}
            >
              <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative ">
                <div className="flex items-center h-full">
                  <div className="w-full xl:w-[60%] pr-0 md:pr-10 text-white">
                    <div>
                      <div className="w-[50px] h-[4px] md:w-[60px] md:h-[6px] xl:w-20 xl:h-1.5 bg-white mb-2.5 md:mb-5"></div>
                      <div className="text-xl md:text-[20px] xl:text-[24px] font-medium mb-[10px] md:leading-[30px] xl:leading-35 md:mb-[30px]">
                        Nerve Center
                      </div>

                      <div className="text-[1.62rem] md:text-[2.25rem] 2xl:w-[780px] xl:text-[2.37rem] 3xl:text-[2.37rem] font-medium leading-[38px] md:leading-[45px] xl:leading-[65px] mt-5 w-full  xl:w-auto md:mt-[0px] xl:mt-auto">
                        IT departments are the Nervous System of Universities, and the challenge they face is to find
                        the perfect IT solutions even after spending millions of dollars. With Unite’s Nerve Center, the
                        hunt for identifying the right solution is over.
                      </div>
                    </div>

                    <div className="w-full xl:w-[85%] mt-8 mb-8 xl:mb-10 text-sm md:text-[20px] lg:leading-[30px] xl:leading-[30px] md:leading-[30px]">
                      One Solution, Multiple Integrations <br /> From Integration to seamless technology and from
                      database management to branding, experience next-level technology with Unit Nerve Centre
                    </div>
                    <button className="bg-white md:w-[169px] xl:w-[219px] md:h-9 xl:h-[44px] text-indigo-900 rounded-full mr-4 py-2 p-3 xl:p-5 xl:py-2 font-medium text-sm md:text-base xl:text-lg 3xl:text-xl flex items-center">
                      <span className="mr-3">Book a Demo</span> <LongArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative py-20 pt-[6rem] pb-[6rem]">
        <img src="/images/scholar-hub/feed-bg.png" className="w-full absolute left-0 right-0 top-10 sm:top-25" />
        <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative mb-5 md:mb-5 lg:mb-20">
          <div className="w-[85%] m-auto">
            <div className="text-blackInvolv-900 text-center lg:mb-28">
              <div className="w-[50px] md:w-[50px] xl:w-[73px] h-[4px] md:h-[6px] bg-blackInvolv-900 mb-5 m-auto"></div>
              <div className="text-xl md:text-[1.625rem] xl:text-[24px] md:leading-10 xl:leading-35 font-semibold mb-5">
                Features
              </div>
              <div className="text-[1rem] md:text-[1.625rem] md:leading-[35px] xl:leading-72 xl:text-[60px] font-normal xl:font-semibold">
                Unite’s Nerve Centre - solution structured and designed for universities. An AI-based sole solution for
                all your technology needs
              </div>
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap flex-col-reverse xl:flex-row py-5 xl:mt-[0px] 2xl:mt-[300px]">
            <div className="w-full xl:w-[45%] order-2 lg:order-1">
              <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-3 mt-10"></div>
              <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] md:leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-2">
                Integration
              </div>
              <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] md:leading-9 xl:leading-46 font-medium">
                LMS, SIS, Admissions, etc., are dominant solutions used by Universities & Campuses, and to carry out the
                perfect balance within all the software solutions, an uninterrupted integration is required. Unite Nerve
                Center opens new doors of high-end technology that acts as a nervous system to connect all the dots with
                various other software and provides smooth integration and higher student engagement for universities
              </div>
            </div>
            <div className="w-full mt-14 lg:mt-0 xl:mt-[-1.125rem]  xl:w-[55%] order-1 lg:order-2 flex justify-center xl:justify-end">
              <img src="/images/solutions/integration.svg" className="w-[90%] md:w-[70%] lg:w-[60%] 3xl:mt-[100px]" />
            </div>
          </div>
        </div>
        <div
          className={`relative overflow-hidden h-[481px] md:h-[514px] lg:h-[700px] xl:h-[766px] bg-cover bg-no-repeat z-10  bg-solutionsInformationMobile md:bg-solutionsInformationiPad lg:bg-solutionsInformation`}
        >
          <div className="bg-[#0318AA] bg-opacity-60 w-full lg:w-1/2 h-full absolute top-0 right-0"></div>
          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative">
            <div className="w-full lg:w-1/2 h-full absolute top-0 right-0 pl-[20px] flex flex-col justify-center">
              <div className="w-[50px] h-[4px] md:h-[6px] xl:w-20 xl:h-1.5 bg-white mb-5"></div>
              <div className="text-[20px] md:text-[26px] lg:text-[30px] md:leading-[38px] xl:leading-83 xl:text-[55px] text-[#fff] font-semibold md:mb-5">
                Information technology
              </div>
              <div className="text-[16px] md:text-[24px] lg:text-[26px] text-[#fff] md:leading-[38px] md:w-[727px] xl:w-full xl:leading-46 mt-[25px] md:mt-[0px]">
                Managing multiple and complicated technology systems for students and faculties is quite taxing, and the
                quest for a centralized system seems impossible to achieve. The time has changed with Unite’s Nerve
                Centre, a centralized and cloud-based system through which you can experience all new AI-based
                technologies with faster navigation, device accessibility, and easy system replacements
              </div>
            </div>
          </div>
        </div>
        <div className="relative  pb-10 lg:pb-36 pt-0 xl:pt-16">
          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative py-5 md:mt-2">
            <div className="flex flex-wrap lg:flex-col xl:flex-row lg:flex-nowrap">
              <div className="w-full xl:w-[45%]">
                <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-3 mt-10"></div>
                <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] md:leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-2">
                  Analytics
                </div>
                <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] md:leading-9 xl:leading-46 font-medium">
                  Student portal data is a treasure trove and can bring desired results if effectively used. For
                  successful student management, day–to–day student operations, and higher student engagement, Unite
                  Analytics helps you segregate students’, devices,’ and portal data for the best reporting and insights
                </div>
              </div>
              <div className="w-full xl:w-[55%] mt-14 lg:mt-0">
                <img src="/images/solutions/analytics.png" className="w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative pb-10 lg:pb-20 ">
          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto relative py-0 mt-[-100px] lg:mt-[-300px]">
            <div className=" ml-auto mr-auto w-[90%]">
              <div className="w-full lg:w-[100%] order-1 lg:order-2 pt-0 xl:pt-32">
                <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-3 mt-10 ml-auto mr-auto"></div>
                <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] md:leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-2 text-center">
                  Branding
                </div>
                <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] md:leading-9 xl:leading-46 font-medium text-center">
                  The brand speaks volumes about performance. The higher the brand value, the higher the credibility.
                  Unite comes with an incomparable UI/UX student portal that enhances your brand presence and helps you
                  create an impact
                </div>
              </div>
              <div className="w-full lg:w-[100%] order-2 lg:order-1 mt-14 lg:mt-0 flex justify-center pt-0 xl:pt-32">
                <img src="/images/solutions/Branding.png" className="" />
              </div>
            </div>
          </div>
          <img
            src="/images/Unite-cloud-only-white-bg.svg"
            className="absolute left-[-130px] sm:left-[-200px] lg:left-[-570px] top-[-90px] md:top-[-200px] lg:top-[0px] z-[-1] w-full xl:w-[77%]"
          />
        </div>
      </div>

      <div className="mt-[-100px] xl:mt-[-250px] 3xl:mt-[-200px]">
        <EngagementHub />
      </div>
      <InvolvTopFooter />
      <InvolvFooter />
    </LayoutTransition>
  );
}

export default InvolvSolutions;
