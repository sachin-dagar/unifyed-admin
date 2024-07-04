import React, { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/outline";
import { CloseIcons, PlusIcons } from "../../../AppIcons";
import useInvolvScreenSize from "../../../hooks/useInvolvScreenSize";
import { Link, NavLink } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";

const footerNavigation = {
  whyUnite: [
    { name: "Marketplace", to: "/gadget" },
    { name: "Integrations", to: "/why-unite?Integrations" },
    { name: "Data Security", to: "/why-unite?data-security" },
    { name: "Advance Analytics", to: "/why-unite?advance-analytics" },
    { name: "Gamification", to: "/why-unite?gamification" },
    { name: "Governance", to: "/why-unite?governance" },
    { name: "Hyper Personalization", to: "/why-unite?hyper-personalization" },
    { name: "Mobile First", to: "/why-unite?mobile" },
    { name: "Notification", to: "/why-unite?notification" },
    { name: "Yoda", to: "/why-unite?yoda" },
    { name: "Pricing", to: "/why-unite?pricing" },
  ],

  solutions: [
    { name: "Scholar Hub", to: "/scholar-hub" },
    { name: "Mentor Hub", to: "/mentor-hub" },
    { name: "Nerve Centre", to: "/nerve-centre" },
  ],

  trustCentre: [
    { name: "Accessibility", to: "/trust-centre?accessibility" },
    { name: "GDPR", to: "/trust-centre?gdpr" },
    { name: "Security", to: "/trust-centre?security" },
    { name: "Internationalization", to: "/trust-centre?internationalization" },
    { name: "Cloud Transition", to: "/trust-centre?cloud-transition" },
  ],
  resources: [
    { name: "Recommended Gadgets", to: "/resources?recommended-gadgets" },
    { name: "Success", to: "/resources?success" },
    { name: "News", to: "/resources?news" },
  ],
  about: [
    { name: "Who we are", to: "/about-us?who-we-are" },
    { name: " What we do", to: "/about-us?what-we-do" },
    { name: "What makes us Unite different", to: "/about-us?makes-diff" },
    { name: "Client Matters", to: "/about-us?client-matters" },
    { name: "Contact Us", to: "/about-us?contact" },
  ],
  social: [
    {
      name: "linkedin",
      to: "#",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36.46"
          height="36.367"
          viewBox="0 0 36.46 36.367"
        >
          <path
            id="iconfinder_367594_linkedin_business_network_social_icon"
            d="M64.23,46.531A18.184,18.184,0,1,0,82.46,64.714,18.207,18.207,0,0,0,64.23,46.531ZM58.882,72.737h-4.2V60.1h4.2Zm-2.1-14.357h-.027a2.4,2.4,0,1,1,.027,0Zm17.24,14.357h-4.2V65.978c0-1.7-.607-2.856-2.128-2.856a2.3,2.3,0,0,0-2.154,1.535,2.892,2.892,0,0,0-.138,1.025v7.055h-4.2s.056-11.447,0-12.632h4.2v1.788a4.168,4.168,0,0,1,3.783-2.085c2.764,0,4.834,1.805,4.834,5.685v7.244Z"
            transform="translate(-46 -46.531)"
            fill="#1c49a2"
            fillRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Facebook",
      to: "#",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36.46"
          height="36.367"
          viewBox="0 0 36.46 36.367"
        >
          <path
            id="iconfinder_367582_facebook_social_icon"
            d="M64.23,46.531A18.184,18.184,0,1,0,82.46,64.714,18.207,18.207,0,0,0,64.23,46.531Zm4.8,14.088-.261,3.263H65.292V75.219H60.9V63.882H58.554V60.619H60.9V58.426a5.677,5.677,0,0,1,.755-3.38,4.232,4.232,0,0,1,3.638-1.641,15.339,15.339,0,0,1,4.2.4l-.586,3.342a8.193,8.193,0,0,0-1.888-.272c-.912,0-1.728.313-1.728,1.191v2.548Z"
            transform="translate(-46 -46.531)"
            fill="#1c49a2"
            fillRule="evenodd"
          />
        </svg>
      ),
    },

    {
      name: "Twitter",
      to: "#",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36.46"
          height="36.367"
          viewBox="0 0 36.46 36.367"
        >
          <path
            id="iconfinder_367608_twitter_social_icon"
            d="M64.23,46.531A18.184,18.184,0,1,0,82.46,64.714,18.207,18.207,0,0,0,64.23,46.531Zm8.909,13.615c.009.2.013.4.013.594A13.073,13.073,0,0,1,53.027,71.754a9.372,9.372,0,0,0,1.1.065,9.224,9.224,0,0,0,5.708-1.968,4.6,4.6,0,0,1-4.294-3.192,4.611,4.611,0,0,0,2.076-.079,4.6,4.6,0,0,1-3.687-4.507v-.058a4.58,4.58,0,0,0,2.083.575,4.6,4.6,0,0,1-1.423-6.137,13.051,13.051,0,0,0,9.475,4.8,4.6,4.6,0,0,1,7.833-4.192,9.216,9.216,0,0,0,2.919-1.116,4.612,4.612,0,0,1-2.021,2.543,9.178,9.178,0,0,0,2.64-.724A9.338,9.338,0,0,1,73.139,60.146Z"
            transform="translate(-46 -46.531)"
            fill="#1ea5ff"
            fillRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "youtube",
      to: "#",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36.46"
          height="36.367"
          viewBox="0 0 36.46 36.367"
        >
          <path
            id="iconfinder_367614_youtube_google_player_social_video_icon"
            d="M60.261,66.709H58.942v7.052H57.668V66.709H56.35v-1.2h3.911v1.2ZM62.343,72.3a1.579,1.579,0,0,1-.35.328.616.616,0,0,1-.316.128.267.267,0,0,1-.23-.1.539.539,0,0,1-.071-.313V67.676H60.245v5.087a1.38,1.38,0,0,0,.2.815.686.686,0,0,0,.591.271,1.317,1.317,0,0,0,.657-.194,2.457,2.457,0,0,0,.651-.565v.671h1.131V67.676H62.343V72.3Zm5.2-4.307a1.917,1.917,0,0,1,.283,1.135V72.5a1.606,1.606,0,0,1-.265.994.915.915,0,0,1-.769.345,1.268,1.268,0,0,1-.592-.134,1.505,1.505,0,0,1-.483-.411v.467H64.579v-8.25h1.143v2.656a1.733,1.733,0,0,1,.486-.424,1.05,1.05,0,0,1,.52-.145A.949.949,0,0,1,67.547,67.989Zm-.881,1.2a.767.767,0,0,0-.121-.467.414.414,0,0,0-.351-.16.526.526,0,0,0-.239.06.827.827,0,0,0-.233.186V72.6a1,1,0,0,0,.268.214.6.6,0,0,0,.273.065.36.36,0,0,0,.305-.128.7.7,0,0,0,.1-.42V69.193Zm4.93-1.209a1.92,1.92,0,0,1,.417,1.329v1.549H69.849V72.01a1.389,1.389,0,0,0,.112.666.407.407,0,0,0,.382.186.451.451,0,0,0,.394-.157,1.377,1.377,0,0,0,.112-.694v-.423h1.165v.458a2.05,2.05,0,0,1-.426,1.409,1.623,1.623,0,0,1-1.271.473,1.5,1.5,0,0,1-1.2-.5,2.038,2.038,0,0,1-.437-1.381V69.313a1.787,1.787,0,0,1,.48-1.292,1.642,1.642,0,0,1,1.239-.5A1.527,1.527,0,0,1,71.6,67.984ZM70.848,69.3a.973.973,0,0,0-.118-.548.431.431,0,0,0-.377-.165.444.444,0,0,0-.388.165.973.973,0,0,0-.118.548v.616h1V69.3ZM82.46,64.714A18.23,18.23,0,1,1,64.23,46.531,18.207,18.207,0,0,1,82.46,64.714ZM64.6,60.647a1.374,1.374,0,0,0,.2.815.686.686,0,0,0,.592.272,1.325,1.325,0,0,0,.656-.194,2.492,2.492,0,0,0,.651-.566v.672h1.131V55.561H66.7V60.18a1.57,1.57,0,0,1-.35.327.61.61,0,0,1-.316.128.268.268,0,0,1-.23-.1.535.535,0,0,1-.071-.313V55.56H64.6v5.087Zm-3.789-4.821a1.452,1.452,0,0,0-.457,1.126v3.155a1.7,1.7,0,0,0,.446,1.234,1.577,1.577,0,0,0,1.188.459,1.626,1.626,0,0,0,1.211-.444,1.666,1.666,0,0,0,.44-1.226V56.986a1.528,1.528,0,0,0-.448-1.138,1.573,1.573,0,0,0-1.151-.442A1.745,1.745,0,0,0,60.811,55.826ZM56.138,53.4l1.516,4.981v3.269h1.274V58.223L60.411,53.4H59.117l-.789,3.3h-.08l-.827-3.3H56.138ZM73.554,69.755c0-1.163-.035-2.328-.124-3.492A2.678,2.678,0,0,0,70.737,63.6q-3.183-.133-6.507-.124-3.322-.007-6.508.124a2.678,2.678,0,0,0-2.692,2.662c-.09,1.164-.128,2.329-.125,3.492s.035,2.328.125,3.492a2.678,2.678,0,0,0,2.692,2.662q3.183.133,6.508.124t6.507-.124a2.679,2.679,0,0,0,2.693-2.662C73.52,72.084,73.558,70.919,73.554,69.755Zm-11.57-9.01a.486.486,0,0,0,.366-.14.532.532,0,0,0,.135-.385V56.906a.409.409,0,0,0-.138-.322.525.525,0,0,0-.363-.122.471.471,0,0,0-.337.122.425.425,0,0,0-.129.322V60.22a.566.566,0,0,0,.121.388A.436.436,0,0,0,61.984,60.745Z"
            transform="translate(-46 -46.531)"
            fill="#c51616"
            fillRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function InvolvFooter() {
  const [accordian, setAccordian] = useState(1);
  const [isMobile, isTab, isTabTwo] = useInvolvScreenSize();

  // UseState hook for scroll to top button
  const [isShowing, setIsShowing] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    if (position > 800) {
      document.getElementById("top-scroll").style.position = "fixed";
      document.getElementById("top-scroll").style.bottom = "40px";
      document.getElementById("top-scroll").style.zIndex = "20";
    } else {
      document.getElementById("top-scroll").style.position = "static";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function for go to top
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer aria-labelledby="footer-heading">
      <div className="border-t border-[#00000017] relative">
        <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto ">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="pt-16 pb-[70px] xl:pb-[112px] ">
            <div className="flex justify-end">
              <button
                onClick={goToTop}
                className="w-[50px] h-[50px]  xl:w-[78px] xl:h-[78px] rounded-full bg-indigo-900 text-white flex justify-center items-center mt-[-110px] xl:mt-[-130px]"
                id="top-scroll"
              >
                <ChevronUpIcon className="h-10 w-10 xl:h-12 xl:w-12" />
              </button>
            </div>
            <div className="lg:grid lg:grid-cols-4 lg:gap-4">
              <div className="mt-7 xl:mt-0">
                <h3
                  className="text-sm md:text-xl font-semibold text-blackInvolv-300 tracking-wider relative flex justify-between items-center"
                  onClick={() => setAccordian(1)}
                >
                  <span>
                    <span className="text-indigo-900">|</span> Why Unite
                  </span>
                  <div className="lg:hidden">
                    {accordian === 1 ? (
                      <span
                        onClick={(e) => {
                          e.stopPropagation(), setAccordian(0);
                        }}
                      >
                        <CloseIcons />
                      </span>
                    ) : (
                      <PlusIcons />
                    )}
                  </div>
                </h3>
                <Transition show={accordian === 1 || (!isMobile && !isTabTwo)}>
                  <Transition.Child
                    enter="transition-opacity ease-linear duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-1000"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    {(accordian === 1 || (!isMobile && !isTabTwo)) && (
                      <ul
                        role="list"
                        className="mt-4 space-y-4 pl-4 xl:pl-0 transition-all"
                      >
                        {footerNavigation.whyUnite.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              to={item.to}
                              className="text-xs md:text-sm 2xl:text-base text-blackInvolv-300 hover:text-indigo-900"
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Transition.Child>
                </Transition>
              </div>
              <div className="mt-7 xl:mt-0">
                <h3
                  className="text-sm md:text-xl font-semibold text-blackInvolv-300 tracking-wider relative flex justify-between items-center"
                  onClick={() => setAccordian(2)}
                >
                  <span>
                    <span className="text-indigo-900">|</span> Solutions
                  </span>
                  <div className="lg:hidden">
                    {accordian === 2 ? (
                      <span
                        onClick={(e) => {
                          e.stopPropagation(), setAccordian(0);
                        }}
                      >
                        <CloseIcons />
                      </span>
                    ) : (
                      <PlusIcons />
                    )}
                  </div>
                </h3>
                <Transition show={accordian === 2 || (!isMobile && !isTabTwo)}>
                  <Transition.Child
                    enter="transition-opacity ease-linear duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-1000"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    {(accordian === 2 || (!isMobile && !isTabTwo)) && (
                      <ul role="list" className="mt-4 space-y-4 pl-4 xl:pl-0">
                        {footerNavigation.solutions.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              to={item.to}
                              className="text-xs md:text-sm 2xl:text-base text-blackInvolv-300 hover:text-indigo-900"
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Transition.Child>
                </Transition>
                <h3
                  className="text-sm md:text-xl font-semibold text-blackInvolv-300 tracking-wider relative flex justify-between items-center mt-7 xl:mt-16"
                  onClick={() => setAccordian(3)}
                >
                  <span>
                    <span className="text-indigo-900">|</span> Trust Centre
                  </span>
                  <div className="lg:hidden">
                    {accordian === 3 ? (
                      <span
                        onClick={(e) => {
                          e.stopPropagation(), setAccordian(0);
                        }}
                      >
                        <CloseIcons />
                      </span>
                    ) : (
                      <PlusIcons />
                    )}
                  </div>
                </h3>
                <Transition show={accordian === 3 || (!isMobile && !isTabTwo)}>
                  <Transition.Child
                    enter="transition-opacity ease-linear duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-1000"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    {(accordian === 3 || (!isMobile && !isTabTwo)) && (
                      <ul role="list" className="mt-4 space-y-4 pl-4 xl:pl-0">
                        {footerNavigation.trustCentre.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              to={item.to}
                              className="text-xs md:text-sm 2xl:text-base text-blackInvolv-300 hover:text-indigo-900"
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Transition.Child>
                </Transition>
              </div>
              <div className="mt-7 xl:mt-0">
                <h3
                  className="text-sm md:text-xl font-semibold text-blackInvolv-300 tracking-wider relative flex justify-between items-center"
                  onClick={() => setAccordian(4)}
                >
                  <span>
                    <span className="text-indigo-900">|</span> Resources
                  </span>
                  <div className="lg:hidden">
                    {accordian === 4 ? (
                      <span
                        onClick={(e) => {
                          e.stopPropagation(), setAccordian(0);
                        }}
                      >
                        <CloseIcons />
                      </span>
                    ) : (
                      <PlusIcons />
                    )}
                  </div>
                </h3>
                <Transition show={(accordian === 4 || (!isMobile && !isTabTwo))}>
                  <Transition.Child
                    enter="transition-opacity ease-linear duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-1000"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    {(accordian === 4 || (!isMobile && !isTabTwo)) && (
                      <ul role="list" className="mt-4 space-y-4 pl-4 xl:pl-0">
                        {footerNavigation.resources.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              to={item.to}
                              className="text-xs md:text-sm 2xl:text-base text-blackInvolv-300 hover:text-indigo-900"
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Transition.Child>
                </Transition>
                <h3
                  className="text-sm md:text-xl font-semibold text-blackInvolv-300 tracking-wider relative mt-7 xl:mt-16 flex justify-between items-center"
                  onClick={() => setAccordian(5)}
                >
                  <span>
                    <span className="text-indigo-900">|</span> About Us
                  </span>
                  <div className="lg:hidden">
                    {accordian === 5 ? (
                      <span
                        onClick={(e) => {
                          e.stopPropagation(), setAccordian(0);
                        }}
                      >
                        <CloseIcons />
                      </span>
                    ) : (
                      <PlusIcons />
                    )}
                  </div>
                </h3>
                <Transition show={(accordian === 5 || (!isMobile && !isTabTwo))}>
                  <Transition.Child
                    enter="transition-opacity ease-linear duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-1000"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    {(accordian === 5 || (!isMobile && !isTabTwo)) && (
                      <ul role="list" className="mt-4 space-y-4 pl-4 xl:pl-0">
                        {footerNavigation.about.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              to={item.to}
                              className="text-xs md:text-sm 2xl:text-base text-blackInvolv-300 hover:text-indigo-900"
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Transition.Child>
                </Transition>
              </div>
              <div className="mt-12 xl:mt-0">
                <img
                  src="/images/uniteLogo.svg"
                  className="w-[200px] xl:w-[80%]"
                />
                <img
                  src="/images/map.png"
                  className="border border-[#9A9DA3] rounded my-[40px] w-full"
                />
                <div className="text-xl font-semibold text-blackInvolv-300 mb-5">
                  Follow Us
                </div>
                <div className="flex">
                  {footerNavigation.social.map((item) => (
                    <a
                      key={item.name}
                      to={item.to}
                      className="text-gray-400 hover:text-gray-500 mr-4"
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-dashed border-[#707070] border-opacity-40">
          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto text-center xl:text-left md:flex justify-between py-12 text-blackInvolv-300 font-normal">
            <div className="text-xs  md:text-sm xl:text-lg">
              ©2022 Unite by Unifyed, Inc. All rights reserved
            </div>
            <p className="text-xs md:text-sm xl:text-lg mt-5 md:mt-0">
              <span className="underline cursor-pointer">Legal Disclaimer</span>{" "}
              <span className="mr-5 ml-5">|</span>{" "}
              <span className="underline cursor-pointer">
                Terms and Conditions
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
