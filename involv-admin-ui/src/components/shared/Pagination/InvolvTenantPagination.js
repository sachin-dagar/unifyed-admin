import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

function InvolvTenantPagination({
  pages,
  filterAction,
  setFilterAction,
  currentButton,
  setCurrentButton,
}) {
  const [numberOfPages, setNumberOfPages] = useState([]);
  useEffect(() => {
    const totalNumber = [];
    for (let i = 1; i <= pages; i++) {
      totalNumber.push(i);
    }
    setNumberOfPages(totalNumber);
  }, [pages]);
  // const [currentButton, setCurrentButton] = useState(1);
  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton);
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1);
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ];
    } else if (currentButton > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4);
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2);
    }

    setArrOfCurrButtons(tempNumberOfPages);
    setFilterAction({ ...filterAction, page: currentButton || 1 });
  }, [currentButton, numberOfPages]);

  return (
    <div className="flex items-center justify-start w-full mt-5">
      <div className="flex justify-between items-center">
        <button
          disabled={currentButton === 1}
          className={
            "relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md   hover:bg-gray-50 " +
            `${currentButton === 1 ? "text-gray-400" : "text-gray-700"}`
          }
          onClick={() =>
            setCurrentButton((prev) => (prev <= 1 ? prev : prev - 1))
          }
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {arrOfCurrButtons.map((item, index) => {
          return (
            <button
              key={index}
              disabled={numberOfPages === 1}
              className={
                "  relative inline-flex items-center px-4 py-2   text-sm font-medium " +
                `${
                  currentButton === item
                    ? "z-10 bg-blue-700   text-white rounded relative inline-flex items-center px-4 py-2   text-sm font-medium"
                    : "text-gray-500"
                }`
              }
              // className="relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-gray-700  hover:bg-gray-50"
              onClick={() => setCurrentButton(item)}
            >
              {item}
            </button>
          );
        })}

        <button
          disabled={numberOfPages === 1}
          className={
            "relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md   hover:bg-gray-50 " +
            `${
              currentButton === numberOfPages.length
                ? "text-gray-400"
                : "text-gray-700"
            }`
          }
          onClick={() =>
            setCurrentButton((prev) =>
              prev >= numberOfPages.length ? prev : prev + 1
            )
          }
        >
          <span className="sr-only">Prev</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default InvolvTenantPagination;
