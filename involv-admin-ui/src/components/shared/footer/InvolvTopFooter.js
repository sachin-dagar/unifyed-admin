import React from "react";

function InvolvTopFooter() {
  return (
    <React.Fragment>
      <div className="xl:mt-20 bg-[#F8F8F8] py-[90px] mb-[80px] xl:mb-[123px] z-2">
        <div className="px-[14px] md:px-[26px] xl:px-[30px] xl:container 3xl:w-[1650px] m-auto flex justify-center">
          <div className="text-center xl:text-left xl:flex">
            <img
              src="/images/cult.svg"
              className="m-auto xl:m-0 w-[185px] h-[140px] xl:w-[297px] xl:h-[225px]"
            />
            <div className="xl:pl-5 flex justify-center flex-col items-center">
              <div className="text-[26px] md:text-3xl 3xl:text-[2.5rem] text-[#3A3B3C] font-semibold mt-5 xl:mt-2 mb-5 xl:mb-10">
                With Unite, celebrate transformation, and create a cult
              </div>
              <div className="relative xl:w-[90%]">
                <input
                  type="text"
                  placeholder="Institution Email Address*"
                  className="w-full border border-[#A5A0A0] rounded-full h-[50px] xl:h-[83px] pr-[110px] pl-[20px] xl:pl-[33px] text-sm xl:text-xl placeholder:text-[#A3A5A7]"
                />
                <button className="bg-indigo-900 w-[102px] xl:w-[248px] h-[42px]  xl:h-[66px] rounded-full text-white text-sm xl:text-2xl absolute right-[4px] top-[4px] xl:right-[6px] xl:top-[8px]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <img src="/images/uniteLogo.svg" className="m-auto" />
        <div className="text-indigo-900 text-xl md:text-[28px] xl:text-4xl font-semibold mt-5 mb-[110px] xl:mb-[177px]">
          The journey from a student to alumni via a single dashboard
        </div>
      </div>
    </React.Fragment>
  );
}

export default InvolvTopFooter;
