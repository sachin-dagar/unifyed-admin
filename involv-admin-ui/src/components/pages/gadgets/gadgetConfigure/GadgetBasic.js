import React, { Fragment, useEffect, useState, useCallback, createContext } from "react";
import { useOutletContext , Link } from "react-router-dom";
import InvolvButton from "../../../shared/InvolvButton";

function GadgetBasic(props) {
    const [setCurrentstep] = useOutletContext();
    useEffect(() => {
         setCurrentstep(["Basic"])
    })

    return (
        <>
            <div className="bg-white pt-6 pb-6 px-6 rounded-md shadow ">
                <div className="pb-5 flex mb-2 justify-between">
                    <div className="w-10/12 flex items-center">
                        <div className="font-medium text-grayInvolv-900 mr-8">
                            Basic
                        </div>
                    </div>
                </div>
                <div className="w-100 flex text-sm 2xl:text-base">
                    <div className="w-4/12 mr-5">
                        <input type="text" placeholder="Gadget Name" className="  mt-1  block  w-full  rounded-md  border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    </div>
                    <div className="w-4/12 mr-5">
                        <select className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                        ">
                            <option>Gadget Type</option>
                        </select>
                    </div>
                    <div className="w-4/12 mr-5">
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
                                $
                            </div>
                            <input type="text" placeholder="Gadget Price" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-9" />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mt-5 mr-5">
                        <textarea placeholder="Gadget Description" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows="3"></textarea>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex">
                <Link className="ml-auto" to="/tenant/config/add-gadgets/gadgets-configrutation">
                    <InvolvButton classes="items-center flex py-2 justify-end">
                        Next
                    </InvolvButton>
                </Link>
            </div>
        </>
    );
}


export default GadgetBasic;