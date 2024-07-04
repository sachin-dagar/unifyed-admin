import React from "react";
import InvolvHeader from "../../../shared/header/InvolvHeader";
import LayoutTransition from "../../../shared/LayoutTransition";
import { GaryDotes, LongArrowRight } from "../../../../AppIcons";
import InvolvFooter from "../../../shared/footer/InvolvFooter";
import { motion } from "framer-motion";
import EngagementHub from "../shared/EngagementHub";
import InvolvTopFooter from "../../../shared/footer/InvolvTopFooter";

function InvolvAdminMentorHub() {
  return (
    <LayoutTransition>
      <InvolvHeader />
      <div className="overflow-hidden">
        <div>
          <div className="relative">
            <div
              className={` relative overflow-hidden h-[909px] md:h-[814px] xl:h-[1076px] bg-cover bg-no-repeat z-10 bg-mentorHubBannerIPhone md:bg-mentorHubBannerIPad lg:bg-mentorHubBanner`}
            >
              <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative ">
                <div className="flex items-center h-full">
                  <div className="w-full xl:w-[58%] pr-0 md:pr-10 text-white">
                    <div>
                      <div className="w-[50px] h-[4px] md:w-[60px] md:h-[6px] xl:w-20 xl:h-1.5 bg-white mb-2.5 md:mb-5"></div>
                      <div className="text-xl md:text-[20px] xl:text-2xl font-medium mb-[10px] md:leading-[30px] xl:leading-35 md:mb-[30px]">
                        Mentor Hub
                      </div>

                      <div className="text-[1.56rem] md:text-[2.25rem] xl:text-[2.37rem] font-medium  leading-[38px] md:leading-[45px] xl:leading-[65px] mt-5 w-[360px] sm-[600px] md:w-[700px]  xl:w-auto md:mt-[0px] xl:mt-auto">
                        When we think of a portal, the first thing that comes to mind is students; what about Mentors?
                        They play a vital role in student engagement; the stronger the communication greater the result.
                        Mentor Hub is designed to provide a faculty support system and set forth the bridge connecting
                        both, students & mentors
                      </div>
                    </div>

                    <div className="w-full xl:w-[85%] mt-8 mb-8 xl:mb-10 text-sm md:text-[20px] md:leading-[30px] lg:leading-[30px] xl:leading-[30px] ">
                      One Solution, Humongous Benefits <br /> From scheduling to notifications, from the dashboard to
                      tasks, manage everything easily from one place
                    </div>
                    <button className="bg-white md:w-[169px] xl:w-[219px] md:h-9 xl:h-[44px] text-indigo-900 rounded-full mr-4 py-2 p-3 xl:p-5 xl:py-2 font-medium text-sm md:text-base xl:text-lg 3xl:text-xl flex items-center">
                      <span className="mr-3">Book a Demo</span> <LongArrowRight />
                    </button>
                  </div>
                  <div className="w-[42%] flex justify-end">
                    <motion.img
                      animate={{ x: ["100px", "0px", "0px"] }}
                      transition={{ ease: "easeIn", duration: 2 }}
                      src="/images/mentor-hub/banner-right.png"
                      className="w-auto hidden xl:block"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block xl:hidden mt-5 overflow-hidden lg:flex ml-4 md:ml-[1.5rem] w-auto md:w-[718px] lg:justify-center">
        <motion.img
          animate={{ x: ["100px", "0px", "0px"] }}
          transition={{ ease: "easeIn", duration: 2 }}
          src="/images/mentor-hub/banner-right.png"
          className="w-[345px] lg:w-[60%] xl:w-full overflow-hidden"
        />
      </div>
      <div className="relative py-20 pt-[6rem]">
        <img
          src="/images/scholar-hub/feed-bg.png"
          className="w-full absolute left-0 right-0 top-10 sm:top-25 xl:sm:top-[-20px]"
        />
        <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative md:mt-[30px] lg:mt-auto mb-5 md:mb-5 lg:mb-20">
          <div className="w-[85%] m-auto">
            <div className="text-blackInvolv-900 text-center lg:mb-28">
              <div className="w-[50px] xl:w-[73px] h-[4px] md:h-[6px] bg-blackInvolv-900 mb-5 m-auto"></div>
              <div className="text-xl md:text-[1.625rem] xl:text-[24px] md:leading-10 xl:leading-35 font-semibold mb-5">
                Features
              </div>
              <div className="text-[1rem] md:text-[1.625rem] md:leading-[35px] xl:leading-72 xl:text-[60px] font-normal xl:font-semibold">
                An AI-based platform that enables mentors to personalize their dashboard and enhance their productivity
              </div>
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap py-5 md:mt-5">
            <div className="w-full mt-14 lg:mt-0 xl:mt-[-1.125rem] 2xl:mt-[0rem]  lg:w-[55%] order-2 lg:order-1 lg:pr-[190px]">
              <img src="/images/mentor-hub/schedule.png" className="w-full" />
            </div>
            <div className="w-full lg:w-[45%] order-1 lg:order-2 2xl:mt-[5rem]">
              <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-3 mt-20"></div>
              <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] md:leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-2">
                Schedule
              </div>
              <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] md:leading-9 xl:leading-46 font-medium">
                Preparing for the class schedule before the semester begins requires a lot of planning, and it’s
                time-consuming for mentors. With Unite’s Schedule Planner, mentors can prepare a schedule and roll them
                to students via a single dashboard
              </div>
              <div className="hidden md:flex justify-end md:mt-0 xl:mt-40 md:pr-0 xl:pr-10">
                <GaryDotes color="#E2E2E2" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative lg:pt-36 pb-10 md:pb-20 xl:pb-10 overflow-hidden lg:mt-[-300px] xl:mt-auto">
          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] md:py-[14px] md:mt-[-2rem] m-auto relative py-5">
            <div className="flex flex-wrap lg:flex-nowrap">
              <div className="w-full lg:w-[42%] xl:mt-[-70px]">
                <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-3 mt-10"></div>
                <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] md:leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-2">
                  Notification
                </div>
                <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] md:leading-9 xl:leading-46 font-medium">
                  Receiving back-to-back notifications on a hectic day or in between lectures is annoying. Set them as
                  per your convenient time and stay informed with Unite Notifications
                </div>
              </div>
              <div className="w-full lg:w-[58%] mt-14 md:mt-[11rem] lg:mt-0">
                <img src="/images/mentor-hub/notification.png" className="w-full lg:pl-20" />
              </div>
            </div>
          </div>
          <img
            src="/images/mentor-hub/notification-bg.png"
            className="absolute right-[-100px] md:right-[-150px] lg:right-[-140px] 3xl:right-[-100px] bottom-[0px] sm:bottom-[30px] lg:bottom-auto lg:top-0 z-[-1] w-[300px] sm:w-[550px] lg:w-[400px] xl:w-[580px]"
          />
        </div>
        <div className="relative pb-10 lg:pb-36 pt-0 xl:pt-16 overflow-hidden">
          <img src="/images/mentor-hub/line.png" className="absolute right-0 bottom-0 z-[-1] hidden lg:block" />

          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative py-5 md:mt-2">
            <div className="flex flex-col-reverse lg:flex-row flex-wrap lg:flex-nowrap lg:justify-between">
              <div className="w-full lg:w-[52%] mt-14 lg:mt-0">
                <img src="/images/mentor-hub/dashboard.png" className="w-full" />
              </div>
              <div className="w-full lg:w-[42%]">
                <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-3 mt-10"></div>
                <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] md:leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-2">
                  Dashboard
                </div>
                <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] md:leading-9 xl:leading-46 font-medium">
                  Managing multiple tasks on countless windows is an endless and never solving puzzle for faculties.
                  With Unite’s Dashboard, stay organized and manage critical information and tasks in one place
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto h-full relative py-5 md:mt-[-2rem] pb-10 lg:pt-24 lg:pb-20">
            <div className="flex flex-wrap lg:flex-nowrap justify-between">
              <div className="w-full lg:w-[41%] pt-0 ">
                <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-3 mt-10"></div>
                <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] md:leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-2">
                  Mailbox
                </div>
                <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] md:leading-9 xl:leading-46 font-medium">
                  Integrate your email with Unite's Mailbox for a quick glance and a faster communication
                </div>
              </div>
              <div className="w-full lg:w-[55%]  mt-14 lg:mt-0 lg:pr-28">
                <img src="/images/mentor-hub/mailbox.png" className="w-full" />
              </div>
            </div>
          </div>

          <div className="lg:pt-[170px] pb-10 lg:pb-20 ">
            <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto mt-[-2rem] md:mt-[-2rem] py-0">
              <div className="flex flex-wrap lg:flex-nowrap lg:mt-[-220px] 2xl:mt-[-180px] 3xl:mt-[-150px]">
                <div className="w-full lg:w-[57%] order-2 lg:order-1 mt-14 lg:mt-0 flex justify-center pt-0 xl:pt-32">
                  <img src="/images/mentor-hub/task.png" className="" />
                </div>
                <div className="w-full lg:w-[43%] order-1 lg:order-2 pt-0 xl:pt-32">
                  <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-3 mt-10"></div>
                  <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] md:leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-2">
                    Tasks
                  </div>
                  <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] md:leading-9 xl:leading-46 font-medium">
                    We all are part of a cyberpunk society, and technology drives our daily lives in our homes and
                    workplaces. Being organized in both removes the juggle. With Unite’s Tasks, get organized and
                    balance both with perfection
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            src="/images/Unite-cloud-only-white-bg.svg"
            className="absolute md:w-full left-[-18S0px] md:left-[-300px] lg:left-[-400px] xl:left-[-550px] bottom-[530px] sm:bottom-[650px] md:bottom-[750px] lg:bottom-[400px] 2xl:bottom-[360px] 3xl:bottom-[230px] z-[-1] xl:w-[80%] sm:w-[77%]"
          />
        </div>

        <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto relative lg:pt-20  pb-10 md:mt-2 py-5 ">
          <div className="flex flex-wrap lg:flex-nowrap justify-between">
            <div className="w-full lg:w-[42.5%] xl:mt-[6rem] md:mt-[3.5rem]">
              <div className="w-[50px] h-[4px] md:h-[6px] lg:w-[73px] lg:h-[6px] bg-indigo-900 mb-3"></div>
              <div className="text-indigo-900 text-[1.25rem] md:text-[1.625rem] md:leading-10 xl:leading-83 xl:text-[3.438rem] font-semibold mb-2">
                Single Sign On
              </div>
              <div className="text-[#3A3B3C] text-[1rem] md:text-[1.375rem] xl:text-[1.625rem] md:leading-9 xl:leading-46 font-medium">
                Remembering all the passwords for every app is challenging and keeping the same password for all can
                lead to a security breach. With Unite’s Single Sign On, seamlessly log into your apps
              </div>
            </div>
            <div className="w-full lg:w-[55%] mt-14 mb-[50px] lg:mb-auto lg:mt-0 flex justify-center">
              <img src="/images/mentor-hub/single.png" className="w-full lg:pl-10" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[-150px] sm:mt-[-200px]">
        <EngagementHub />
      </div>

      <InvolvTopFooter />
      <InvolvFooter />
    </LayoutTransition>
  );
}

export default InvolvAdminMentorHub;
