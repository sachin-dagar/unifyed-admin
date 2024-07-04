import React from "react";
import InvolvHeader from "../../../shared/header/InvolvHeader";
import LayoutTransition from "../../../shared/LayoutTransition";
import { GaryDotes, LongArrowRight } from "../../../../AppIcons";
import InvolvFooter from "../../../shared/footer/InvolvFooter";
import { motion } from "framer-motion";
import EngagementHub from "../shared/EngagementHub";
import InvolvTopFooter from "../../../shared/footer/InvolvTopFooter";

function InvolvScholarHub() {
  return (
    <LayoutTransition>
      <InvolvHeader />
      <div className="overflow-hidden">
        <div>
          <div className="relative">
            <div
              className={` relative overflow-hidden h-[680px] md:h-[708px] xl:h-[944px] bg-cover bg-no-repeat z-10 bg-scholarBannerMobile md:bg-scholarBannerTab  lg:bg-scholarBanner`}
            >
              <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative ">
                <div className="flex items-center h-full">
                  <div className="w-full xl:w-[53%] pr-0 xl:pr-10 text-white">
                    <div>
                      <div className="w-[50px] h-[4px] md:w-[60px] md:h-[6px] xl:w-20 xl:h-1.5 bg-white mb-2.5 md:mb-5"></div>
                      <div className="text-[20px] xl:text-2xl font-medium mb-[10px] md:leading-[30px] xl:leading-[35px] md:mb-[30px]">
                        Scholar Hub
                      </div>

                      <div className="text-[1.75rem] md:text-[2.25rem] xl:text-[2.37rem] xl:leadomg-[65px] md:pr-[84.5px] xl:pr-0 3xl:text-[2.37rem] font-medium  leading-[38px] md:leading-[45px] mt-5 w-full  xl:w-auto md:mt-[0px] xl:mt-auto">
                        The Scholar Hub is a student engagement portal with abundant features and intuitive UI/UX. It’s
                        an AI-based platform that simplifies technology and provides cumulative communication over a
                        single dashboard
                      </div>
                    </div>

                    <div className="w-full xl:w-[90%] mt-8 mb-8 xl:mb-10 text-sm md:text-[20px] lg:leading-[30px] xl:leading-[30px] md:leading-[30px]">
                      One Solution, numerous offerings
                      <br /> from feeds to notifications, search to schedule, and manage everything with ease from one
                      place.
                    </div>
                    <button className="bg-white text-indigo-900 w-[152px] h-[31px] md:w-[172px] xl:w-[202px] xl:h-[36px] 2xl:w-[212px] rounded-full leading-[54px] mr-4 py-2 p-3 xl:p-5 xl:py-2 font-medium text-sm md:text-base xl:text-lg 3xl:text-xl flex items-center">
                      <span className="mr-3">Book a Demo</span> <LongArrowRight />
                    </button>
                  </div>
                </div>
              </div>

              <motion.img
                animate={{ x: ["100px", "0px", "0px"] }}
                transition={{ ease: "easeIn", duration: 2 }}
                src="/images//scholar-hub/banner-right.png"
                className="hidden xl:block absolute right-[-60px] top-0 bottom-0 m-auto w-[51%]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="block xl:hidden mt-10 overflow-hidden">
        <motion.img
          animate={{ x: ["100px", "0px", "0px"] }}
          transition={{ ease: "easeIn", duration: 2 }}
          src="/images//scholar-hub/banner-right.png"
          className="w-full overflow-hidden ml-[1.5rem]"
        />
      </div>
      <div className="relative py-20 pt-[6rem] pb-[6rem]">
        <img src="/images/scholar-hub/feed-bg.png" className="w-full absolute left-0 right-0 top-10 sm:top-25" />
        <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative mb-5 md:mb-5 lg:mb-20">
          <div className="w-[85%] m-auto">
            <div className="text-blackInvolv-900 text-center lg:mb-28">
              <div className="w-[50px] md:w-[73px] h-[4px] md:h-[6px] bg-blackInvolv-900 mb-2 md:mb-5 m-auto"></div>
              <div className="text-xl md:text-[1.625rem] xl:text-[24px] leading-10 xl:leading-[35px] font-semibold mb-3 md:mb-5">
                Features
              </div>
              <div className="text-[1rem] font-normal md:text-[24px] leading-[26px] md:leading-[35px] xl:leading-72 xl:text-[3.125rem] xl:font-semibold">
                With Unite’s multiple gadgets, experience True-AI and the next-level technology for higher-ed.
              </div>
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap py-5 md:mt-5">
            <div className="w-full mt-14 lg:mt-0 xl:mt-[-1.125rem]  lg:w-[55%] order-2 lg:order-1">
              <img src="/images/scholar-hub/feed-img.png" className="w-full" />
            </div>
            <div className="w-full lg:w-[45%] order-1 lg:order-2">
              <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-1 md:mb-3 mt-20"></div>
              <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-1 md:mb-2">
                Feeds
              </div>
              <div className="md:text-[#2C3652] xl:text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] leading-7 md:leading-9 xl:leading-46 font-medium">
                Feeds play an essential part in campus life. Get all the latest updates and information from your
                faculties and peers. With Unite’s feeds feature, you will experience the advanced technology designed
                for students to keep them connected with their surroundings.
              </div>
              <div className="hidden md:flex justify-end mt-0 xl:mt-40 pr-10">
                <GaryDotes color="#E2E2E2" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative  pb-10 lg:pb-18 pt-0 xl:pt-0">
          <img src="/images/scholar-hub/line.png" className="absolute left-0 bottom-0 z-[-1] hidden lg:block" />

          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative py-5 md:mt-2">
            <div className="flex flex-wrap lg:flex-nowrap">
              <div className="w-full lg:w-[45%]">
                <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-1 md:mb-3 mt-10"></div>
                <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-1 md:mb-2">
                  Dashboard
                </div>
                <div className="md:text-[#2C3652] xl:text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] leading-7 md:leading-9 xl:leading-46 font-medium">
                  An effective dashboard plays a significant role in the student portal. With Unite’s intuitive
                  dashboard, manage your sections’ hierarchy at your convenience. Customize inbuild components to
                  emphasize the most critical information, which magnifies your portal comfort.
                </div>
              </div>
              <div className="w-full lg:w-[55%] mt-20 md:mt-20 xl:mt-14 lg:mt-0">
                <img src="/images/scholar-hub/dashboard.png" className="w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative py-5 md:mt-[-2rem] pb-10 lg:pt-24 lg:pb-20">
          <div className="flex flex-wrap lg:flex-nowrap">
            <div className="w-full lg:w-[55%] order-2 lg:order-1 mt-20 xl:mt-14 lg:mt-0 lg:pr-28">
              <img src="/images/scholar-hub/search.png" className="w-full" />
            </div>
            <div className="w-full lg:w-[45%] order-1 pt-14  lg:order-2">
              <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-1 md:mb-3 mt-10"></div>
              <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-1 md:mb-2">
                Search
              </div>
              <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] leading-7 md:leading-9 xl:leading-46 font-medium">
                Studies say “search” is one of the most-used features among the students, be it researching a topic or
                meeting a deadline for an important assignment. Unite’s search feature within the portal acts as a
                problem solver and saves all window hopping.
              </div>
            </div>
          </div>
        </div>
        <div className="relative lg:pt-36 pb-20 xl:pb-10 overflow-hidden">
          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] md:py-[14px] md:mt-[-2rem] m-auto relative py-5">
            <div className="flex flex-wrap lg:flex-nowrap">
              <div className="w-full lg:w-[45%]">
                <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-1 md:mb-3 mt-10"></div>
                <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-1 md:mb-2">
                  Notification
                </div>
                <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] leading-7 md:leading-9 xl:leading-46 font-medium">
                  Smart Notifications are knocking doors of your connected devices. Obtain information on events &
                  activities and schedule personalized notifications at your convenient time. Receive messages,
                  reminders, and real-time notifications that are relevant and useful to you.
                </div>
              </div>
              <div className="w-full lg:w-[55%] mt-14 xl:mt-14 md:mt-20 lg:mt-0">
                <img src="/images/scholar-hub/notification.png" className="w-full lg:pl-20" />
              </div>
            </div>
          </div>
          <img
            src="/images/scholar-hub/notification-bg.png"
            className="absolute left-[20px] lg:left-auto lg:right-[-140px] bottom-[100px] sm:bottom-[30px] lg:bottom-auto lg:top-0 z-[-1] w-[300px] sm:w-auto"
          />
        </div>

        <div className="relative lg:pt-[170px] pb-10 lg:pb-10">
          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto mt-[-2rem] md:mt-[-2rem] relative py-0">
            <div className="flex flex-wrap lg:flex-nowrap">
              <div className="w-full lg:w-[55%] order-2 lg:order-1 mt-10 md:mt-20 xl:mt-0 lg:mt-0 flex justify-center pt-0 xl:pt-0">
                <img src="/images/scholar-hub/schedule.png" className="" />
              </div>
              <div className="w-full lg:w-[45%] order-1 lg:order-2 pt-0 xl:pt-8">
                <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-1 md:mb-3 mt-10"></div>
                <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-1 md:mb-2">
                  Schedule
                </div>
                <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] leading-7 md:leading-9 xl:leading-46 font-medium">
                  The hectic start of a semester brings a lot on a platter for students to sort. With Unite’s calendar
                  integration, students can keep a track of their class schedules from any connected device of their
                  choice.
                </div>
              </div>
            </div>
          </div>
          <img
            src="/images/Unite-cloud-only-white-bg.svg"
            className="absolute top-[115px] left-[-170px] md:left-[-270px] md:top-24 xl:left-[-570px] xl:top-[-170px] z-[-1] w-full xl:w-[77%]"
          />
        </div>

        <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto relative lg:pt-20 xl:py-[15rem] pb-10 md:mt-2 py-5 lg:pb-20">
          <div className="flex flex-wrap lg:flex-nowrap">
            <div className="w-full lg:w-[45%] xl:mt-[1rem] md:mt-[3.5rem]">
              <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-1 md:mb-3"></div>
              <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-1 md:mb-2">
                Events
              </div>
              <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] leading-7 md:leading-9 xl:leading-46 font-medium">
                Social Events on campus play a vital role for students and motivate them to get involved more in daily
                campus life. From social to cultural events or a reunion to virtual events, Unite’s Events gadget
                ensures higher student engagement.
              </div>
            </div>
            <div className="w-full lg:w-[55%] mt-0 xl:mt-[50rem] flex justify-center">
              <img src="/images/scholar-hub/events.png" className="w-full lg:pl-10" />
            </div>
          </div>
        </div>

        <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto relative xl:mt-[-2.700rem] lg:mt-[-2.700rem] md:mt-[0rem] lg:pt-20 pb-10  lg:pb-20">
          <div className="flex flex-wrap lg:flex-nowrap">
            <div className="w-full lg:w-[55%] order-2 lg:order-1 mt-14 lg:mt-0 flex justify-center lg:pr-28">
              <img src="/images/scholar-hub/messenger.png" className="w-full" />
            </div>
            <div className="w-full lg:w-[45%] order-1 lg:order-2 md:mt-[-3.5rem]">
              <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-1 md:mb-3 mt-20"></div>
              <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-1 md:mb-2">
                Messenger
              </div>
              <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] leading-7 md:leading-9 xl:leading-46 font-medium">
                Unite Messenger is the most common yet most integral feature. Enjoy instant chat with peers, communicate
                with faculties, and share pictures & videos in a secure environment with Unite messenger.
              </div>
            </div>
          </div>
        </div>

        <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px]  m-auto relative mb-10 lg:mb-0 lg:pt-20 md:mt-[2rem]">
          <div className="flex flex-wrap lg:flex-nowrap">
            <div className="w-full lg:w-[45%] xl:mt-[2rem]">
              <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-1 md:mb-3 mt-10"></div>
              <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-1 md:mb-2">
                Hashtags
              </div>
              <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] leading-7 md:leading-9 xl:leading-46 font-medium">
                With Unite’s Hashtag feature, gain attention or promote events. Once a hashtag is followed, the system
                starts rendering content smartly based on students’ liking.
              </div>
            </div>
            <div className="w-full lg:w-[55%] flex justify-end mt-14 lg:mt-0">
              <img src="/images/scholar-hub/hashtags.png" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[-100px]"></div>
      <EngagementHub />
      <InvolvTopFooter />
      <InvolvFooter />
    </LayoutTransition>
  );
}

export default InvolvScholarHub;
