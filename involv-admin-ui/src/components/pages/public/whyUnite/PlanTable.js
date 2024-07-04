import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  CheckCricleIcon,
  CrossCricleIcon,
  LongArrowRight,
} from "../../../../AppIcons";
function PlanTable({activePlan, mobileActive}) {
  const btnRef = useRef(null);
  const cardRef = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);
  const scroll = (scrollOffset) => {
    btnRef.current.scrollLeft += scrollOffset;
    setScrollValue(btnRef.current.scrollLeft);
  };

  const onScroll = useCallback((event) => {
    // console.log("btnRef.current.scrollLeft", event.target.scrollLeft, event.target.scrollWidth, event.target.clientWidth, cardRef.current.scrollLeft, cardRef.current.scrollWidth, cardRef.current.clientWidth, cardRef.current.offsetParent())
    setScrollValue(btnRef.current.scrollLeft);
  }, []);

  useEffect(() => {
    btnRef.current.addEventListener("scroll", onScroll);
    return () => btnRef.current.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
    {!activePlan ?
     <div className="m-auto w-full relative hidden lg:block">
     <div className="flex items-center justify-end pr-3 mb-4 lg:hidden">
       {scrollValue > 0 && (
         <button
           onClick={() => scroll(-200)}
           className="text-[#623EDA] rotate-180 mr-3"
         >
           <LongArrowRight />
         </button>
       )}
       <button onClick={() => scroll(200)} className="text-[#623EDA]">
         <LongArrowRight />
       </button>
     </div>

     <div
       ref={btnRef}
       className="relative overflow-auto whitespace-nowrap border border-[#D8D8DC] border-l-[1px] xl:border-l-[0px] border-t-[0px] border-b-[0px] border-r-[1px] xl:border-r-[0px]"
     >
      
      <table class="sm:w-[800px] lg:w-[100%]">
      <thead>
        <tr>
          <th className="border border-[#D8D8DC] border-l-[1px] xl:border-l-[0px] border-r-[1px] xl:border-r-[1px] border-t-[1px] xl:border-t-[0px] bg-white p-3  sticky left-0 min-w-[150px] w-[323px] max-w-[323px] br-white"></th>
          <th className="border border-[#D8D8DC] p-5 text-center">
            <div className="z-999 flex justify-center items-center h-full">
              <div>
                <div className="text-[22px]  font-normal text-center">
                  Free
                </div>
                <div className="text-[44px]  font-normal text-center">
                  $0
                </div>
              </div>
            </div>
          </th>
          <th className="border border-[#D8D8DC] text-center w-[250px]">
            <div className="h-[162px] overflow-hidden relative">
              <img
                src={"/images/preminum-blue-img.svg"}
                className="w-full absolute z-[-1]"
              />
              <div className="z-999 flex justify-center items-center h-full">
                <div>
                  <div className="text-[22px] text-white font-normal text-center">
                    Premium
                  </div>
                  <div className="text-[40px] text-white font-normal text-center">
                    $39
                  </div>
                </div>
              </div>
            </div>
          </th>
          <th
            className="border p-5 border-[#D8D8DC] text-center"
            ref={cardRef}
          >
            <div className="z-999 flex justify-center items-center h-full">
              <div>
                <div className="text-[22px]  font-normal text-center">
                  Custom
                </div>
                <div className="text-[40px]  font-normal text-center">
                  $100
                </div>
              </div>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className="">
          <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
            Basic Features
          </td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
              <CheckCricleIcon customClass={"m-auto"}/>
          </td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
              <CheckCricleIcon customClass={"m-auto"}/>
          </td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
              <CheckCricleIcon customClass={"m-auto"}/>
          </td>
        </tr>
        <tr>
          <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
            Users
          </td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
            10
          </td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
            20
          </td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
            unlimited
          </td>
        </tr>
        <tr>
          <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
            Individual data
          </td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
            1000
          </td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
            2000
          </td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
            unlimited
          </td>
        </tr>
        <tr>
          <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
            Lorem Ipsum
          </td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
            <CrossCricleIcon customClass={"m-auto"}/>
          </td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
            2000
          </td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
            unlimited
          </td>
        </tr>
        <tr>
          <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 "></td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
            <button className="bg-[#FFF5F4] text-[#FF725E] text-sm w-[116px] h-[43px] rounded-[120px]">
              Get Started
            </button>
          </td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
            <button className="bg-[#FF725E] text-white text-sm w-[116px] h-[43px] rounded-[120px]">
              Get Started
            </button>
          </td>
          <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
            <button className="bg-[#00ABFF] text-white text-sm w-[116px] h-[43px] rounded-[120px]">
              Contact Us
            </button>
          </td>
        </tr>
      </tbody>
    </table>
     </div>
   </div>
    
    : 
    <div className="m-auto w-full relative">
    <div className="flex items-center justify-end pr-3 mb-4 lg:hidden">
      {scrollValue > 0 && (
        <button
          onClick={() => scroll(-200)}
          className="text-[#623EDA] rotate-180 mr-3"
        >
          <LongArrowRight />
        </button>
      )}
      <button onClick={() => scroll(200)} className="text-[#623EDA]">
        <LongArrowRight />
      </button>
    </div>

    <div
      ref={btnRef}
      className="relative overflow-auto whitespace-nowrap border border-[#D8D8DC] border-l-[1px] xl:border-l-[0px] border-t-[0px] border-b-[0px] border-r-[1px] xl:border-r-[0px]"
    >
     <table class="sm:w-[800px] lg:w-[100%]">
     <thead>
       <tr>
         <th className="border border-[#D8D8DC] border-l-[1px] xl:border-l-[0px] border-r-[1px] xl:border-r-[1px] border-t-[1px] xl:border-t-[0px] bg-white p-3  sticky left-0 min-w-[150px] w-[323px] max-w-[323px] br-white"></th>
         <th className="border border-[#D8D8DC] p-5 text-center">
           <div className="z-999 flex justify-center items-center h-full">
             <div>
               <div className="text-[22px]  font-normal text-center">
                 Free
               </div>
               <div className="text-[44px]  font-normal text-center">
                 $0
               </div>
             </div>
           </div>
         </th>
         <th className="border border-[#D8D8DC] text-center w-[250px]">
           <div className="h-[162px] overflow-hidden relative">
             <img
               src={"/images/preminum-blue-img.svg"}
               className="w-full absolute z-[-1]"
             />
             <div className="z-999 flex justify-center items-center h-full">
               <div>
                 <div className="text-[22px] text-white font-normal text-center">
                   Premium
                 </div>
                 <div className="text-[40px] text-white font-normal text-center">
                   $24
                 </div>
               </div>
             </div>
           </div>
         </th>
         <th
           className="border p-5 border-[#D8D8DC] text-center"
           ref={cardRef}
         >
           <div className="z-999 flex justify-center items-center h-full">
             <div>
               <div className="text-[22px]  font-normal text-center">
                 Custom
               </div>
               <div className="text-[40px]  font-normal text-center">
                 $80
               </div>
             </div>
           </div>
         </th>
       </tr>
     </thead>

     <tbody>
       <tr className="">
         <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
           Basic Features
         </td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
             <CheckCricleIcon customClass={"m-auto"}/>
         </td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
             <CheckCricleIcon customClass={"m-auto"}/>
         </td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
             <CheckCricleIcon customClass={"m-auto"}/>
         </td>
       </tr>
       <tr>
         <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
           Users
         </td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
           5
         </td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
           15
         </td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
           limited
         </td>
       </tr>
       <tr>
         <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
           Individual data
         </td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
           800
         </td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
          1500
         </td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
           limited
         </td>
       </tr>
       <tr>
         <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
           Lorem Ipsum
         </td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
           <CrossCricleIcon customClass={"m-auto"}/>
         </td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
           1500
         </td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
           limited
         </td>
       </tr>
       <tr>
         <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 "></td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
           <button className="bg-[#FFF5F4] text-[#FF725E] text-sm w-[116px] h-[43px] rounded-[120px]">
             Get Started
           </button>
         </td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
           <button className="bg-[#FF725E] text-white text-sm w-[116px] h-[43px] rounded-[120px]">
             Get Started
           </button>
         </td>
         <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
           <button className="bg-[#00ABFF] text-white text-sm w-[116px] h-[43px] rounded-[120px]">
             Contact Us
           </button>
         </td>
       </tr>
     </tbody>
   </table>
    </div>
  </div>
    }
{!mobileActive ? 
 <div className="m-auto w-full relative block lg:hidden">
 <div className="flex items-center justify-end pr-3 mb-4 lg:hidden">
   {scrollValue > 0 && (
     <button
       onClick={() => scroll(-200)}
       className="text-[#623EDA] rotate-180 mr-3"
     >
       <LongArrowRight />
     </button>
   )}
   <button onClick={() => scroll(200)} className="text-[#623EDA]">
     <LongArrowRight />
   </button>
 </div>

 <div
   ref={btnRef}
   className="relative overflow-auto whitespace-nowrap border border-[#D8D8DC] border-l-[1px] xl:border-l-[0px] border-t-[0px] border-b-[0px] border-r-[1px] xl:border-r-[0px]"
 >
  
  <table class="sm:w-[800px] lg:w-[100%]">
  <thead>
    <tr>
      <th className="border border-[#D8D8DC] border-l-[1px] xl:border-l-[0px] border-r-[1px] xl:border-r-[1px] border-t-[1px] xl:border-t-[0px] bg-white p-3  sticky left-0 min-w-[150px] w-[323px] max-w-[323px] br-white"></th>
      <th className="border border-[#D8D8DC] p-5 text-center">
        <div className="z-999 flex justify-center items-center h-full">
          <div>
            <div className="text-[22px]  font-normal text-center">
              Free
            </div>
            <div className="text-[44px]  font-normal text-center">
              $0
            </div>
          </div>
        </div>
      </th>
      <th className="border border-[#D8D8DC] text-center w-[250px]">
        <div className="h-[162px] overflow-hidden relative">
          <img
            src={"/images/preminum-blue-img.svg"}
            className="w-full absolute z-[-1]"
          />
          <div className="z-999 flex justify-center items-center h-full">
            <div>
              <div className="text-[22px] text-white font-normal text-center">
                Premium
              </div>
              <div className="text-[40px] text-white font-normal text-center">
                $39
              </div>
            </div>
          </div>
        </div>
      </th>
      <th
        className="border p-5 border-[#D8D8DC] text-center"
        ref={cardRef}
      >
        <div className="z-999 flex justify-center items-center h-full">
          <div>
            <div className="text-[22px]  font-normal text-center">
              Custom
            </div>
            <div className="text-[40px]  font-normal text-center">
              $100
            </div>
          </div>
        </div>
      </th>
    </tr>
  </thead>

  <tbody>
    <tr className="">
      <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
        Basic Features
      </td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
          <CheckCricleIcon customClass={"m-auto"}/>
      </td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
          <CheckCricleIcon customClass={"m-auto"}/>
      </td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
          <CheckCricleIcon customClass={"m-auto"}/>
      </td>
    </tr>
    <tr>
      <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
        Users
      </td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
        10
      </td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
        20
      </td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
        unlimited
      </td>
    </tr>
    <tr>
      <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
        Individual data
      </td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
        1000
      </td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
        2000
      </td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
        unlimited
      </td>
    </tr>
    <tr>
      <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
        Lorem Ipsum
      </td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
        <CrossCricleIcon customClass={"m-auto"}/>
      </td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
        2000
      </td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
        unlimited
      </td>
    </tr>
    <tr>
      <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 "></td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
        <button className="bg-[#FFF5F4] text-[#FF725E] text-sm w-[116px] h-[43px] rounded-[120px]">
          Get Started
        </button>
      </td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
        <button className="bg-[#FF725E] text-white text-sm w-[116px] h-[43px] rounded-[120px]">
          Get Started
        </button>
      </td>
      <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
        <button className="bg-[#00ABFF] text-white text-sm w-[116px] h-[43px] rounded-[120px]">
          Contact Us
        </button>
      </td>
    </tr>
  </tbody>
</table>
 </div>
</div>

: 
<div className="m-auto w-full relative">
<div className="flex items-center justify-end pr-3 mb-4 lg:hidden">
  {scrollValue > 0 && (
    <button
      onClick={() => scroll(-200)}
      className="text-[#623EDA] rotate-180 mr-3"
    >
      <LongArrowRight />
    </button>
  )}
  <button onClick={() => scroll(200)} className="text-[#623EDA]">
    <LongArrowRight />
  </button>
</div>

<div
  ref={btnRef}
  className="relative overflow-auto whitespace-nowrap border border-[#D8D8DC] border-l-[1px] xl:border-l-[0px] border-t-[0px] border-b-[0px] border-r-[1px] xl:border-r-[0px]"
>
 <table class="sm:w-[800px] lg:w-[100%]">
 <thead>
   <tr>
     <th className="border border-[#D8D8DC] border-l-[1px] xl:border-l-[0px] border-r-[1px] xl:border-r-[1px] border-t-[1px] xl:border-t-[0px] bg-white p-3  sticky left-0 min-w-[150px] w-[323px] max-w-[323px] br-white"></th>
     <th className="border border-[#D8D8DC] p-5 text-center">
       <div className="z-999 flex justify-center items-center h-full">
         <div>
           <div className="text-[22px]  font-normal text-center">
             Free
           </div>
           <div className="text-[44px]  font-normal text-center">
             $0
           </div>
         </div>
       </div>
     </th>
     <th className="border border-[#D8D8DC] text-center w-[250px]">
       <div className="h-[162px] overflow-hidden relative">
         <img
           src={"/images/preminum-blue-img.svg"}
           className="w-full absolute z-[-1]"
         />
         <div className="z-999 flex justify-center items-center h-full">
           <div>
             <div className="text-[22px] text-white font-normal text-center">
               Premium
             </div>
             <div className="text-[40px] text-white font-normal text-center">
               $24
             </div>
           </div>
         </div>
       </div>
     </th>
     <th
       className="border p-5 border-[#D8D8DC] text-center"
       ref={cardRef}
     >
       <div className="z-999 flex justify-center items-center h-full">
         <div>
           <div className="text-[22px]  font-normal text-center">
             Custom
           </div>
           <div className="text-[40px]  font-normal text-center">
             $80
           </div>
         </div>
       </div>
     </th>
   </tr>
 </thead>

 <tbody>
   <tr className="">
     <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
       Basic Features
     </td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
         <CheckCricleIcon customClass={"m-auto"}/>
     </td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
         <CheckCricleIcon customClass={"m-auto"}/>
     </td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
         <CheckCricleIcon customClass={"m-auto"}/>
     </td>
   </tr>
   <tr>
     <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
       Users
     </td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
       5
     </td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
       15
     </td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
       limited
     </td>
   </tr>
   <tr>
     <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
       Individual data
     </td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
       800
     </td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
      1500
     </td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
       limited
     </td>
   </tr>
   <tr>
     <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 ">
       Lorem Ipsum
     </td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
       <CrossCricleIcon customClass={"m-auto"}/>
     </td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
       1500
     </td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] bg-[#FAFAFA] text-center">
       limited
     </td>
   </tr>
   <tr>
     <td className="border border-[#D8D8DC] border-r-[1px] p-3 bg-[#FAFAFA] text-blackInvolv-900 text-base sticky left-0 "></td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
       <button className="bg-[#FFF5F4] text-[#FF725E] text-sm w-[116px] h-[43px] rounded-[120px]">
         Get Started
       </button>
     </td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
       <button className="bg-[#FF725E] text-white text-sm w-[116px] h-[43px] rounded-[120px]">
         Get Started
       </button>
     </td>
     <td className="border border-[#D8D8DC] p-5 w-[250px] min-w-[250px] text-center">
       <button className="bg-[#00ABFF] text-white text-sm w-[116px] h-[43px] rounded-[120px]">
         Contact Us
       </button>
     </td>
   </tr>
 </tbody>
</table>
</div>
</div>
}
   
    </div>
   
  );
}

export default PlanTable;
