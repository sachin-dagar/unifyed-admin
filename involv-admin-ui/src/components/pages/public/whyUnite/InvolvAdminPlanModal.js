import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CloseIcon2, CloseIcons, CompareIcon } from "../../../../AppIcons";

function InvolvAdminPlanModal({openModal, setOpenModal, children}) {
//   const [openModal, setOpenModal] = useState(true);
  const handleModal = () => {
    setOpenModal(false);
  };
  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-20 inset-0 overflow-y-auto"
        onClose={handleModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={
                "inline-block align-bottom bg-white rounded pt-5 text-left shadow-xl transform transition-all w-[90%] xl:w-[80%] 3xl:w-[60%] sm:my-8 sm:align-middle max-w-full"
              }
            >
              <div className="">
                <div className={`px-6 mb-5 font-semibold  flex items-center justify-between`}>
                  <div className="text-blackInvolv-900 text-2xl font-medium flex items-center"><CompareIcon /> <div className="ml-2">Plan comparison</div></div>
                  <div onClick={handleModal} className="cursor-pointer">
                  <CloseIcon2 color={"#2C3652"} width={"19px"} height={"19px"}/>
                  </div>
                  
                </div>
                <div className={"p-6  overflow-y-auto no-scrollbar   "}>
                   {children}
                </div>
              </div>
              {/* <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse items-center px-6 bg-gray-200 py-2 rounded-b-md">
                <button
                  type="button"
                  disabled={loaderBtn || btnDisable}
                  className={`items-center inline-block px-4 py-2 font-medium text-sm leading-tight rounded shadow-md transition duration-150 ease-in-out text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg ${
                    loaderBtn || btnDisable ? "bg-gray-400" : `bg-${theme}`
                  }`}
                  onClick={submitDataModal}
                >
                  {loaderBtn && (
                    <svg
                      role="status"
                      className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                  )}
                  {!isBtnDisable ? buttonTitle : isBtnDisableTitle}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md px-4 py-2 text-base font-medium text-gray-400 focus:outline-0 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={handleModal}
                >
                  Cancel
                </button>
              </div> */}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default InvolvAdminPlanModal;
