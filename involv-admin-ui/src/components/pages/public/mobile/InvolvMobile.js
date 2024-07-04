import React from "react";
import InvolvHeader from "../../../shared/header/InvolvHeader";
import LayoutTransition from "../../../shared/LayoutTransition";
import { GaryDotes, LongArrowRight } from "../../../../AppIcons";
import InvolvFooter from "../../../shared/footer/InvolvFooter";
import { motion } from "framer-motion";
import EngagementHub from "../shared/EngagementHub";
import InvolvTopFooter from "../../../shared/footer/InvolvTopFooter";
import { MarketSideIcon } from "../../../../AppIcons";

function InvolvMobile() {
  return (
    <LayoutTransition>
      <InvolvHeader />
      <div className="h-auto">
        <div>
          <div className="relative">
            <div
              className={`relative overflow-hidden h-[456px] md:h-[481px] xl:h-[800px] 3xl:h-[1024px] bg-cover bg-no-repeat z-0 pt-[40px] md:pt-[104px] bg-mobileBanner md:bg-mobileiPadBanner  lg:bg-mobileDesktopBanner`}
            >
              <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative ">
                <div className="h-full">
                  <div className="w-full xl:w-[100%] pr-0 xl:pr-10 text-white">
                    <div>
                      <div className="text-[1.62rem] md:text-[2.25rem] xl:text-[2.37rem] 3xl:text-[60px] text-center font-medium md:mt-[-20px] xl:mt-0 leading-[38px] md:leading-[45px] xl:leading-[75px]">
                        Native Mobile App – Current Generation is tech-savvy and crave for a cutting-edge technology.
                        Unite Mobile Student App fills the gap and deliver more than expected
                      </div>
                    </div>
                    <button className="bg-[#02B1FF] text-white rounded-full py-2 p-3 xl:p-5 xl:py-2 font-medium text-sm md:text-base xl:text-lg 3xl:text-xl flex items-center ml-auto mr-auto mt-[35px] md:mt-[60px] xl:mt-[50px] 3xl:mt-[66px]">
                      <span className="mr-3">Book a Demo</span> <LongArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full static lg:absolute xl:bottom-[-250px] 2xl:bottom-[-350px] 3xl:bottom-[-413px] z-10 mt-[40px] md:mt-[80px]">
              <img src="/images/mobile/under-banner-mobile.png" className="w-[90%] lg:w-[56%] ml-auto mr-auto" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative pb-10 lg:pb-20 mt-[70px] md:mt-[130px] lg:mt-[400px] xl:mt-[300px]">
        <div className="px-[14px] md:px-[26px] md:mt-[-50px] lg:mt-auto xl:px-[30px] xl:container 3xl:w-[1650px] m-auto relative py-0 ">
          <div className=" ml-auto mr-auto w-[100%]">
            <div className="w-full lg:w-[100%] order-1 lg:order-2 pt-0 xl:pt-32 md:mt-auto">
              <img src="/images/mobile/curl-arrow.svg" className="w-[99px] mt-[50px] ml-auto mr-auto hidden lg:block" />
              <div className="w-[50px] sm:w-[73px] h-[4px] sm:h-[6px] bg-[#2C3652] mb-3 mt-10 ml-auto mr-auto"></div>
              <div className="text-[#3246D3] text-[20px] md:text-[26px] lg:text-[24px] text-center font-semibold mb-2 mt-6">
                Why an App Matters
              </div>
              <div className="text-[26px] md:text-[32px] lg:text-[55px] text-[#2C3652] my-[20px] font-semibold text-center md:px-[100px] lg:px-auto">
                An App an expectation - Unite Mobile - First
              </div>
              <div className="text-[#8B91A9] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] leading-46 font-medium text-center mt-[31px]">
                We are in an era where mobile apps are indispensable for the current generation and having a native
                mobile app for students is the point of parity. An environment where all the information is handy to
                students raises the bar of expectations for student portals. Unite Mobile-first approach provides
                intuitive UI/UX and unique features & functionalities on the mobile app and creates a cohesive habitat
                targeting higher student engagement.
              </div>
            </div>
          </div>
        </div>
        <img
          src="/images/Unite-cloud-only-white-bg.svg"
          className="absolute left-[-181px] md:left-[-259px] top-[80px] md:top-[33px] lg:top-[0px] z-[-1] w-[100%] lg:w-[60%]"
        />
      </div>

      <div className="relative mt-[-150px] md:mt-auto">
        <div
          className={`relative overflow-x-hidden overflow-y-visible md:h-auto lg:h-[2500px] bg-cover
                    bg-no-repeat z-0 pt-[104px]  lg:bg-mobileWholeBg`}
        >
          <div className="pb-10 lg:pb-36 pt-0 xl:pt-16">
            <div className="lg:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative py-5 md:mt-2">
              <img
                src="/images/mobile/push-notification.png"
                className="absolute top-0 left-[-100px] z-[-1] w-[100%] h-[600px] md:h-[800px] block lg:hidden"
              />
              <img
                src="/images/mobile/dark-theme.png"
                className="absolute bottom-[400px] md:bottom-[850px] right-[-100px] z-[-1] w-[100%] h-[600px] md:h-[850px] black lg:hidden"
              />
              <div className="relative flex flex-col xl:flex-row md:mt-[-80px] xl:mt-auto px-[14px] md:px-[26px] xl:px-[30px]">
                <div className="w-full md:ml-[18px] xl:ml-0 lg:w-[50%]">
                  <div className="w-[50px] sm:w-[73px] h-[4px] sm:h-[6px] bg-[#2C3652] mb-3 mt-10"></div>
                  <div className="text-[#3246D3]  text-[20px] md:text-[26px] lg:text-[24px] font-semibold mb-2 leading-[35px] mt-[20px]">
                    Push Notification
                  </div>
                  <div className="text-[26px] md:text-[32px] lg:text-[55px] leading-[65px] font-semibold text-[#2C3652]">
                    Stay Connected Stay tuned
                  </div>
                  <div className="text-[#2C3652] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] leading-46 font-medium mt-[27px]">
                    Missed your assignment or fee submission day? Being unreachable for a few days or stuck in a
                    situation where your internet is unavailable makes you lose essential campus updates and can create
                    havoc at times. With Unite mobile app, the push notification feature allows you to stay connected
                    and avoid eleventh-hour hassles.
                  </div>
                </div>
                <div className="w-full lg:w-[50%]">
                  <img
                    src="/images/mobile/stay-connected-mobile.png"
                    className="w-[700px] xl:w-[800px] 2xl:w-[950px] static lg:absolute right-[-200px] 3xl:right-[-370px] top-0 xl:top-[-180px]"
                  />
                </div>
              </div>

              <div className="relative flex flex-wrap flex-col-reverse lg:flex-row lg:flex-nowrap mt-[-50px] lg:mt-[200px]">
                <div className="w-full xl:w-[50%] mt-14 lg:mt-0">
                  <img src="/images/mobile/curl-mobile.png" className="w-[100%]" />
                </div>
                <div className="w-full xl:w-[50%] mt-[100px] pl-[19px]">
                  <div className="w-[50px] sm:w-[73px] h-[4px] sm:h-[6px] bg-[#2C3652] mb-3 mt-10"></div>
                  <div className="text-[#3246D3] text-[20px] md:text-[26px] lg:text-[24px] leading-[35px] font-semibold mb-2">
                    Dark Theme
                  </div>
                  <div className="text-[26px] md:text-[32px] lg:text-[55px] font-semibold text-[#2C3652] leading-[65px] mt-[15px]">
                    Personalization is the Priority
                  </div>
                  <div className="text-[#2C3652] leading-46 text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] font-medium mt-[27px]">
                    When opting for any new mobile app, personalization is the highest priority, and why not, the
                    comfort of personalization has changed the way we perceive technology. Unite theme-based display
                    allows turning on/off black pixels at any time of day.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:container 3xl:w-[1650px] m-auto h-full py-5 mt-[-50px] md:mt-auto lg:mt-[-600px]">
          <img
            src="/images/mobile/stories.png"
            className="absolute left-[-100px] z-[-1] md:w-[100%] h-[400px] md:h-[600px] black lg:hidden"
          />
          <div className="px-[14px] md:px-[26px] xl:px-[30px] relative flex flex-wrap md:flex-col lg:flex-row lg:flex-nowrap">
            <div className="w-full lg:w-[50%] xl:w-[70%]">
              <div className="w-[50px] sm:w-[73px] h-[4px] sm:h-[6px] bg-[#2C3652] mb-3 mt-10"></div>
              <div className="text-[#3246D3]  text-[20px] md:text-[26px] lg:text-[24px] leading-[35px] font-semibold mb-2 mt-[20px]">
                Stories
              </div>
              <div className="text-[26px] md:text-[32px] lg:text-[55px] font-semibold text-[#2C3652] leading-[65px] pr-[100px]">
                With stories - stay on top
              </div>
              <div className="text-[#2C3652] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] font-medium leading-46 mt-[27px]">
                A well-shared story on your wall stands out and engages more people around you. Unite mobile app is the
                first student portal that allows you to create stories and share them with your peers.
              </div>
            </div>
            <div className="w-full lg:w-[50%] xl:w-auto flex md:justify-center lg:justify-end mt-14 lg:mt-0 ">
              <img src="/images/mobile/stories-image.png" className="w-[100%]" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full py-5 mt-[80px]">
        <div className="relative flex items-center flex-wrap md:flex-col lg:flex-row lg:flex-nowrap bg-[#F8F9FE] h-[433px] lg:h-[521px]">
          <div className="w-[100%] lg:w-[50%] mt-14 lg:mt-0 absolute bottom-[-420px] sm:bottom-[-660px] lg:static">
            <img src="/images/mobile/abailable-mobile.png" className="w-[100%] mt-auto lg:mt-[-200px]" />
          </div>
          <div className="w-full lg:w-[50%] ml-[18px] xl:ml-0">
            <div className="w-[50px] sm:w-[73px] md:w-[50px] h-[4px] sm:h-[6px] bg-[#2C3652] mb-3 mt-10"></div>
            <div className="text-[#3246D3]  text-[20px] sm:text-[26px] lg:text-[24px] leading-[35px] font-semibold mb-2 mt-[20px]">
              Get app now
            </div>
            <div className="text-[26px] sm:text-[32px] lg:text-[55px] font-semibold text-[#2C3652] leading-[65px] pr-[100px]">
              Available for your smartphone
            </div>
            <div className="flex justify-center xl:justify-start items-center xl:items-start ml-[-50px]">
              <div className="">
                <img src="/images/mobile/app-store.png" className="" />
              </div>
              <div className="ml-[-4rem]">
                <img src="/images/mobile/play-store.png" className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[430px] sm:mt-[700px] lg:mt-auto">
        <InvolvTopFooter />
      </div>

      <InvolvFooter />
    </LayoutTransition>
  );
}

export default InvolvMobile;
