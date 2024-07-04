import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";

function Stepper(props) {
    const [tab , setTab] = useState(props.tab)
    const currentstep = props.currentstep
    useEffect(() => {
        setTab((data) => {
            data.map((value, index) => {
                if (value.step == currentstep[currentstep.length - 1]) {
                    value.next = true
                }
                currentstep.map((val, index) => {
                    if (val == value.step && index != [currentstep.length - 1]) {
                        data[index].previous = true
                    }
                })
            })
            return data
        })
    })

    return (
        <div>
            <div className="flex pt-5 items-center">
                <div className="flex w-full">
                    {
                        tab.map((value, index) => {
                            return <div className="flex w-2/12 items-center" key={index}>
                                <div className="flex flex-col items-center relative">
                                    <div className="flex flex-col items-center">
                                        {value.previous ?
                                            <div className={"w-7 h-7 rounded-full border-indigo-900 bg-indigo-900 text-white border-2 flex items-center justify-center"}>
                                                <CheckIcon className="w-4 h-4 2xl:h-4 2xl:w-4 text-white" />
                                            </div>
                                            : <div className={"w-7 h-7 rounded-full " + (value.next ? 'border-indigo-900' : 'border-indigo-300') + " border-2 flex items-center justify-center"}>
                                                {(value.next) &&
                                                    <span className="w-2 h-2 rounded-full bg-indigo-900"></span>
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className="absolute mt-2 w-32 text-center top-8 text-sm 2xl:text-base" key={index}>{value.step}</div>
                                </div>
                                {index !== tab.length - 1 &&
                                    <div className={"h-1  w-11/12 " + (value.previous ? 'bg-indigo-900' : 'bg-indigo-300') + ""}></div>
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );

}

export default Stepper;