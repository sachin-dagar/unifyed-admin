import React, { useEffect, useState } from "react";

const CustomTabs = ({ color = "indigo", tabArray = [], defaultSelect }) => {
  const [openTab, setOpenTab] = useState(1);

  useEffect(()=>{
    setOpenTab(defaultSelect);
  }, [defaultSelect])

  return (
    <>
      <ul className="flex rounded-lg divide-x divide-gray-200 mt-2.5">
        {tabArray?.map((item, index) => (
          <li>
            <a
              href={`#link${index + 1}`}
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(index + 1);
              }}
              className={
                "inline-block relative py-3 px-16 w-full text-sm font-medium text-center dark:bg-gray-700 dark:text-white border-t-2 border-b-2 outline-offset-0 " +
                (openTab === index+1
                  ? "text-white bg-" +
                    color +
                    "-900" +
                    " border-" +
                    color +
                    "-900"
                  : "text-" + color + "-600 bg-white") +
                (index === 0 ? " border-l-2 rounded-l-full " : "") +
                (index === tabArray?.length - 1
                  ? " border-r-2 rounded-r-full "
                  : "")
              }
              aria-current="page"
            >
              {item?.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="relative min-w-0 break-words bg-white w-full mb-6 rounded">
        <div className="px-0 py-5">
          <div className="tab-content tab-space">
            {tabArray?.map((item, index) => (
              <div
                className={openTab === index + 1 ? "block" : "hidden"}
                id={`link${index + 1}`}
              >
                {React.cloneElement(item?.element)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomTabs;