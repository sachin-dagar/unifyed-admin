import React, { useRef, useEffect } from "react";
import { LongArrowRight } from "../../../../AppIcons";
import InvolvFooter from "../../../shared/footer/InvolvFooter";
import InvolvTopFooter from "../../../shared/footer/InvolvTopFooter";
import InvolvHeader from "../../../shared/header/InvolvHeader";
import LayoutTransition from "../../../shared/LayoutTransition";
import EngagementHub from "../shared/EngagementHub";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const InvolveTrustCenter = () => {
  const accessibilityRef = useRef(null);
  const gdprRef = useRef(null);
  const securityRef = useRef(null);
  const internationalizationRef = useRef(null);
  const cloudTransitionRef = useRef(null);
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
        case "?accessibility":
          applyRef(accessibilityRef);
          break;
        case "?gdpr":
          applyRef(gdprRef);
          break;
        case "?security":
          applyRef(securityRef);
          break;
        case "?internationalization":
          applyRef(internationalizationRef);
          break;
        case "?cloud-transition":
          applyRef(cloudTransitionRef);
          break;
        default:
          break;
      }
    },
    [search]
  );

  return (
    <LayoutTransition>
      <InvolvHeader />
      <div className="overflow-x-hidden">
        <div>
          <div className="relative">
            <div
              className={`relative h-[700px] md:h-[659px] xl:h-[954px] 2xl:h-[879px] bg-cover xl:bg-contain 3xl:bg-cover bg-no-repeat z-10 bg-trustCentreBannerBgMobile md:bg-trustCentreBannerBgiPad  xl:bg-trustCentreBannerBg`}
            >
              <div className="bg-[#470FB1] hidden md:block md:w-[502px] xl:w-[676px] md:h-[130px] xl:h-[110px] 3xl:h-[176px] rounded-[88px] absolute md:right-[-100px] md:bottom-[-270px] xl:right-[-400px] xl:top-[100px] 3xl:right-[-170px] 3xl:top-[150px] z-30 text-center">
                <div className="text-white font-semibold md:text-[26px] xl:text-2xl 2xl:text-[26px] 3xl:text-[1.875rem] leading-[46px] w-[265px] text-left h-[89px] md:mt-5 md:ml-[50px] xl:mt-5 3xl:mt-12 xl:ml-8 3xl:ml-16">
                  You can trust us
                  <div className="2xl:mt-2 3xl:mt-5">BLINDLY</div>
                </div>
              </div>

              <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative ">
                <div className="flex items-center h-full">
                  <div className="w-full xl:mt-[-360px] 2xl:mt-[-200px] 3xl:mt-0 lg:w-[100%] xl:w-[65%] 3xl:w-[52%] pr-0 md:pr-10 text-white">
                    <div>
                      <div className="w-[50px] h-[4px] xl:w-20 xl:h-1.5 bg-white mb-2.5 md:mb-5"></div>
                      <div className="text-xl xl:text-2xl font-medium mb-[10px] leading-[30px] xl:leading-[35px] md:mb-[30px]">
                        Trust Centre
                      </div>

                      <div className="text-[1.75rem] md:text-[2.25rem] xl:text-[2.17rem] 3xl:text-[2.37rem] font-medium leading-[37px] md:leading-[45px] xl:leading-[inherit] mt-5 w-full xl:w-auto md:mt-[0px] xl:mt-auto">
                        The backend is the backbone of any product. Unite Trust Center is a source solution under one
                        product that provides data encryption, high-end data security, accessibility & compliance.
                      </div>
                    </div>

                    <div className="w-full xl:w-[93%] mt-8 mb-8 xl:mb-10 text-sm md:text-xl leading-[21px] md:leading-[30px] xl:leading-[30px] ">
                      In Unite, we believe transparency leads to trust, and that’s our giveaway to our clients.
                    </div>
                    <button className="bg-white text-indigo-900 rounded-full mr-4 py-2 p-3 xl:p-5 xl:py-2 font-medium text-sm md:text-base xl:text-lg 3xl:text-xl flex items-center">
                      <span className="mr-3">Book a Demo</span> <LongArrowRight />
                    </button>
                  </div>
                </div>
              </div>

              <motion.img
                animate={{ x: ["100px", "0px", "0px"] }}
                transition={{ ease: "easeIn", duration: 2 }}
                src="/images/trust-centre-desktop/trust-centre-banner-img.png"
                className="hidden xl:block absolute xl:right-[-120px] xl:top-[-360px] 2xl:right-[-200px] 2xl:top-[-120px] 3xl:right-[-50px] 3xl:top-[50px] bottom-0 z-10 m-auto w-[55%] 3xl:w-[1014px]"
              />
            </div>
          </div>
        </div>
        <div className="hidden md:block xl:hidden">
          <img src="/images/trust-centre-desktop/trust-centre-banner-img.png" alt="trust-center=banner-iPad" />
        </div>
        <div className="relative xl:pt-0 3xl:pt-[170px] pb-10 lg:pb-0 " ref={accessibilityRef}>
          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto md:mt-[3rem] xl:mt-[-20rem] 2xl:mt-[-2rem] relative py-0">
            <div className="flex flex-row-reverse flex-wrap lg:flex-col-reverse xl:flex-row-reverse lg:flex-nowrap">
              <div className="w-full lg:w-[100%] xl:w-[55%] ml-0 xl:ml-32 order-2 lg:order-1 mt-0 lg:mt-0 flex justify-center pt-0 xl:pt-0">
                <img
                  src="/images/trust-centre-desktop/accessibility.png"
                  className="w-[793px] 2xl:pl-1 3xl:pl-0 hidden xl:block"
                />
                <img src="/images/trust-centre-iPad/accessibility-iPad.png" className="hidden sm:block xl:hidden" />
                <img src="/images/trust-centre-mobile/accessibility-mobile.png" className="block sm:hidden md:hidden" />
              </div>
              <div className="w-full lg:w-[100%] xl:w-[45%] order-1 lg:order-2 pt-0 xl:mt-[-5rem] 2xl:mt-0 xl:pt-36 mb-10 md:mb-10 xl:mb-0">
                <div className="w-[50px] h-[4px] md:h-[6px] xl:h-[6px] lg:w-[73px] lg:h-[6px] bg-[#3246D3] mb-2 md:mb-[14px] xl:mb-3 mt-10"></div>
                <div className="text-[#3246D3] text-[1.25rem] md:text-[1.625rem]  xl:text-[3.438rem] leading-10 xl:leading-83 font-semibold mb-2 md:mb-4 xl:mb-2">
                  Accessibility
                </div>
                <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[21px] 2xl:text-[1.625rem] md:mb-16 xl:mb-0 leading-7 md:leading-9 xl:leading-46 font-medium">
                  Build trust and credibility with Unite’s Accessibility feature and enhance your user experience to
                  connect with more clients.
                </div>
              </div>
            </div>
          </div>
          <img
            src="/images/Unite-cloud-only-white-bg.svg"
            className="absolute top-0 left-[-100px] sm:left-[-177px] md:top-[40px] md:left-[-259px] lg:top-[-50px] lg:left-[-280px] xl:top-[-80px] xl:left-[-350px] 2xl:left-[-426px] 2xl:top-[-180px] 3xl:left-[-530px] 3xl:top-[-50px] z-[-1] w-full  xl:w-[77%]"
          />
        </div>
        <div
          className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto relative lg:pt-0  pb-10 lg:pb-20"
          ref={gdprRef}
        >
          <div className="flex flex-row-reverse flex-wrap lg:flex-col xl:flex-row-reverse lg:flex-nowrap">
            <div className="w-full lg:w-full xl:w-[45%] md:mt-[3.5rem] lg:mb-[3.5rem] xl:mb-0 xl:mt-[3rem] 3xl:mt-[7rem]">
              <div className="w-[50px] h-[4px] md:h-[6px] xl:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-2 md:mb-[14px] xl:mb-3"></div>
              <div className="text-[#3246D3] leading-10 xl:leading-83 text-[1.25rem] md:text-[1.625rem] xl:text-[3.438rem] font-semibold mb-2 md:mb-4 xl:mb-2">
                GDPR
              </div>
              <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[21px] xl:p-0 2xl:text-[1.625rem] leading-7 md:leading-9 xl:leading-46 2xl:pr-14 font-medium">
                The EU General Data Protection Regulation (GDPR) protects businesses’ data and the privacy of every
                citizen. Unite’s GDPR compliance helps you in effortless business process automation, a better
                understanding of the collected data, improved data management, and protection of your enterprise and
                brand reputation.
              </div>
            </div>
            <div className="w-full lg:w-full xl:w-[55%] mt-14 lg:mt-0 flex justify-center">
              <img
                src="/images/trust-centre-desktop/gdpr.png"
                className="w-full xl:pr-[3.2rem] 2xl:pr-[4.4rem] 3xl:pr-[5.2rem] hidden xl:block"
              />
              <img
                src="/images/trust-centre-iPad/gdpr-iPad.png"
                className="w-full xl:pr-[3rem] 2xl:pr-20 hidden md:block xl:hidden"
              />
              <img
                src="/images/trust-centre-mobile/gdpr-mobile.png"
                className="w-full xl:pr-[3rem] 2xl:pr-20 block md:hidden"
              />
            </div>
          </div>
        </div>
        <div
          className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto relative lg:pt-0  pb-10 lg:pb-20"
          ref={securityRef}
        >
          <div className="flex flex-wrap lg:flex-col xl:flex-row lg:flex-nowrap">
            <div className="w-full lg:w-full xl:w-[45%] md:mt-[3.5rem] xl:mt-0 2xl:mt-[3rem]">
              <div className="w-[50px] h-[4px] md:h-[6px] xl:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-2 md:mb-[14px] xl:mb-3"></div>
              <div className="text-[#3246D3] leading-10 xl:leading-83 text-[1.25rem] md:text-[1.625rem] xl:text-[3.438rem] font-semibold mb-2 md:mb-4 xl:mb-2">
                Security
              </div>
              <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[21px] 2xl:text-[1.625rem] leading-7 md:leading-9 xl:leading-46 xl:pr-0 2xl:pr-14 font-medium">
                Data is an asset for any University, and protecting it is the foremost priority for all. Unite uses
                world-class encryption technology and state-of-the-art security protocols & methodologies to protect
                sensitive information.
              </div>
            </div>
            <div className="w-full lg:w-full xl:w-[45%] mt-14 lg:mt-[5rem] xl:mt-[-5rem] flex justify-center">
              <img
                src="/images/trust-centre-desktop/security.png"
                className="w-full lg:pl-[70px] 2xl:pl-[76px] 3xl:pl-[74px] hidden xl:block"
              />
              <img
                src="/images/trust-centre-iPad/security-iPad.png"
                className="w-full lg:pl-0 xl:pl-[70px] hidden md:block xl:hidden"
              />
              <img
                src="/images/trust-centre-mobile/security-mobile.png"
                className="w-full lg:pl-[79px] block md:hidden"
              />
            </div>
          </div>
        </div>
        <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto relative lg:pt-0  pb-10 lg:pb-20">
          <div
            className="flex flex-row-reverse lg:flex-col xl:flex-row-reverse flex-wrap lg:flex-nowrap"
            ref={internationalizationRef}
          >
            <div className="w-full lg:w-full xl:w-[45%] md:mt-[3.5rem] xl:mt-[-2.5rem] 2xl:mt-[1.5rem] xl:mb-0">
              <div className="w-[50px] h-[4px] lg:w-[73px] md:h-[6px] xl:h-[6px] bg-indigo-900 mb-2 md:mb-[14px] xl:mb-3"></div>
              <div className="text-[#3246D3] leading-10 xl:leading-83 text-[1.25rem] md:text-[1.625rem] xl:text-[3.438rem] font-semibold mb-2 md:mb-4 xl:mb-2">
                Internationalization
              </div>
              <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[21px] 2xl:text-[1.625rem] leading-7 md:leading-9 xl:leading-46 xl:pr-0 3xl:pr-14 font-medium">
                The success of a product is always evaluated as per its user personas. Successful products are the ones
                that can cater to a larger audience and global market. Unite is designed keeping in mind the involvement
                of enterprises in the international market. Unite software applications can be easily adapted in
                multiple languages and regions without complex engineering changes.
              </div>
            </div>
            <div className="w-full lg:w-full xl:w-[55%] mt-14 lg:mt-[5rem] xl:mt-[-5rem] flex justify-center">
              <img
                src="/images/trust-centre-desktop/internationalization.png"
                className="w-full h-full xl:pr-[3.2rem] 2xl:pr-[72px] 3xl:pr-[84px] hidden xl:block"
              />
              <img
                src="/images/trust-centre-iPad/internationalization-iPad.png"
                className="w-full h-full xl:pr-10 2xl:pr-20 hidden md:block xl:hidden"
              />
              <img
                src="/images/trust-centre-mobile/internationalization-mobile.png"
                className="w-full h-full xl:pr-10 2xl:pr-20 block md:hidden"
              />
            </div>
          </div>
        </div>
        <div
          className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto relative lg:pt-0  pb-10 lg:pb-20"
          ref={cloudTransitionRef}
        >
          <div className="flex flex-wrap lg:flex-col xl:flex-row lg:flex-nowrap">
            <div className="w-full lg:w-full xl:w-[45%] xl:mt-0 md:mt-[3.5rem]">
              <div className="w-[50px] h-[4px] md:h-[6px] xl:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-2 md:mb-[14px] xl:mb-3"></div>
              <div className="text-[#3246D3] leading-10 xl:leading-83 text-[1.25rem] md:text-[1.625rem] xl:text-[3.438rem] font-semibold mb-2 md:mb-4 xl:mb-2">
                Cloud Transition
              </div>
              <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[21px] 2xl:text-[1.625rem] leading-7 md:leading-9 xl:leading-46 xl:pr-0 2xl:pr-14 font-medium">
                With Unite’s Cloud Transition, you get numerous benefits like improved efficiency, value for money
                proposition, higher flexibility, automatic updates, disaster recovery, and stimulated innovation so that
                you can plan your transition strategy as per your comfort.
              </div>
            </div>
            <div className="w-full lg:w-full xl:w-[55%] mt-14 lg:mt-[5rem] xl:mt-[-5rem] flex justify-center">
              <img
                src="/images/trust-centre-desktop/cloud-transitions.png"
                className="w-full lg:pl-[70px] 2xl:pl-[75px] hidden xl:block"
              />
              <img
                src="/images/trust-centre-iPad/cloud-transitions-iPad.png"
                className="w-full lg:pl-0 xl:pl-[78px] hidden md:block xl:hidden"
              />
              <img
                src="/images/trust-centre-mobile/cloud-transitions-mobile.png"
                className="w-full lg:pl-[74px] block md:hidden"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="xl:mt-[-150px]">
        <EngagementHub />
      </div>
      <InvolvTopFooter />
      <InvolvFooter />
    </LayoutTransition>
  );
};

export default InvolveTrustCenter;
