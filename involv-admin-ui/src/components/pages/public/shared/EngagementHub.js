import React from "react";
import { LongArrowRight } from "../../../../AppIcons";

function EngagementHub() {
  return (
    <div className="text-center m-auto px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] xl:mb-20 mt-[50px] xl:mt-[272px] md:mt-[7rem] sm:mt-[7rem] relative bg-[#0566E5] xl:bg-transparent">
      <img src="/images/eng-hub.png" className="w-full hidden xl:block" />
      <div className="absolute top-[-51px] md:top-[-75px] xl:top-[-16px] md:pb-[1.25rem] mt-[-15px] pb-[10px] md:mt-0 xl:mt-0  left-0 m-auto w-full text-center text-blackInvolv-900 text-[28px] xl:text-[40px] font-semibold bg-white xl:bg-transparent pt-[57px] xl:py-0 clip-your-needful-style">
        Engagement hub
      </div>
      <div className="xl:absolute top-0 left-0 w-full h-full pt-32 pb-10 text-white text-center xl:text-left xl:px-[73px] text-left">
        <div className="grid xl:grid-cols-3 gap-4 w-full h-full">
          <div className="flex flex-wrap flex-col justify-between mb-20 xl:mb-0">
            <div>
              <div className="text-[30px] leading-46 text-center xl:text-left font-semibold mb-5">Students</div>
              <div className="w-full md:w-[720px] xl:w-[324px] text-base md:text-center xl:text-left md:text-[24px] xl:text-[20px] md:leading-[36px] xl:leading-[30px]">
                With scholar hub, no more juggling from one app to another. Get real-time notifications, feeds, and
                updates, and stay connected with your peers and faculties.
              </div>
            </div>
            <div className="rounded-full border border-white w-12 h-12 flex items-center justify-center m-auto xl:m-0 mt-5 xl:mt-0">
              <LongArrowRight />
            </div>
          </div>
          <div className="flex flex-wrap flex-col justify-between mb-20 xl:mb-0">
            <div>
              <div className="text-[30px] leading-46 text-center xl:text-left font-semibold mb-5">Faculty</div>
              <div className="w-full md:w-[665px] md:ml-7 xl:ml-0 xl:w-[324px] text-base md:text-center xl:text-left md:text-[24px] xl:text-[20px] md:leading-[36px] xl:leading-[30px]">
                Effective communication with faculties enhances 60% chances of higher student engagement. Mentor Hub
                improves student communication via multiple tools (email, messenger & feed)
              </div>
            </div>
            <div className="rounded-full border border-white w-12 h-12 flex items-center justify-center m-auto xl:m-0 mt-5 xl:mt-0">
              <LongArrowRight />
            </div>
          </div>
          <div className="flex flex-wrap flex-col justify-between">
            <div>
              <div className="text-[30px] leading-46 text-center xl:text-left font-semibold mb-5">University</div>
              <div className="w-full md:ml-7 xl:ml-0 md:w-[665px] xl:w-[324px] text-base md:text-center xl:text-left md:text-[24px] xl:text-[20px] md:leading-[36px] xl:leading-[30px]">
                Unite Nerve Centre is the backbone and backend of the Unite Student Engagement Platform. The powerful
                solution furnishes scalable and smooth integration with various SIS & LMS systems and supports timely
                up-gradation for universities.
              </div>
            </div>
            <div className="rounded-full border border-white w-12 h-12 flex items-center justify-center m-auto xl:m-0 mt-5 xl:mt-0">
              <LongArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EngagementHub;
