import React, { useEffect, useState } from 'react'
import { GadgetService } from "../../../services/api/gadget/GadgetService";
import InvolvGadgetPeopleConnecting from "./involvGadgetPeopleConnecting";
import { convertFilterString } from "../../../util";
import LayoutTransition from "../../shared/LayoutTransition";
import Loader from "../../shared/loader/Loader";
import moment from 'moment';
import { isEmpty } from "lodash";

export default function involvGadgetLinkVersionHistory({
    gadgetId
}) {

    const [gadgetVersionHistory, setGadgetVersionHistory] = useState([]);
    const [totalCount, SetTotalCount] = useState(0);
    const [limit, setLimit] = useState(5);
    const [loading, setLoading] = useState(false);

    const fetchVersionHistory = async (limit) => {
        try {
            setLoading(true);
            let filterURL = convertFilterString({ limit: limit });
            const response = await GadgetService.getVersionHistoryOfGadget(gadgetId, filterURL);
            setGadgetVersionHistory(response?.data || []);
            SetTotalCount(response?.total);
            setLoading(false);
        } catch (ex) {
            setLoading(false);
            console.log("error", ex);
        }
    }

    const loadMore = async () => {
        try {
            const limit_ = limit + 5;
            setLimit(limit_);
            fetchVersionHistory(limit_);
        } catch (ex) {
            console.log("error", ex);
        }
    }

    useEffect(async () => {
        fetchVersionHistory(limit);
    }, []);

    return (
        <LayoutTransition>
            {loading ?
                (
                    <div className="flex items-center justify-center">
                        <Loader />
                    </div>
                ) :
                (
                    <>
                        {!isEmpty(gadgetVersionHistory) ?

                            <div className="border w-full p-3 px-10 my-5 relative bg-grey-500">

                                <h6 className='text-gray-700 text-left 2xl:text-2xl pb-4 font-semibold mt-4'>Version History</h6>

                                <div className="w-full">
                                    {gadgetVersionHistory?.map((item, i) => {
                                        return (
                                            <div className="flex">
                                                <div className="w-20">
                                                    <p className="mb-2 text-gray-400 font-semibold"> {moment(item?.updatedAt).format('MMM DD')}</p>
                                                </div>
                                                <div className="flex flex-col items-center mr-4">
                                                    <div>
                                                        <div className={`flex items-center justify-center w-4 h-4 mt-0 border rounded-full`}>
                                                            <img class="pin w-4 h-4" src={i === 0 ? '/images/vh_dot_marked.svg' : '/images/vh_dot.svg'} />
                                                        </div>
                                                    </div>
                                                    <div className={`w-px h-full ${i !== (gadgetVersionHistory?.length - 1) ? 'bg-gray-300' : ''}`}></div>
                                                </div>
                                                <div className="pb-8 w-full">
                                                    <p className="mb-2 text-gray-700 font-semibold">Version {item?.versionName}</p>
                                                    <p className="text-gray-500 text-sm">{item?.versionDescription} </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                {(totalCount > 3 && totalCount > limit) && (
                                    <button className={`w-full bg-white text-indigo-900 border my-5 py-2 text-center ${(totalCount < limit) ? "bg-gray-300" : "border-indigo-900"}`}
                                        onClick={() => { loadMore() }}
                                        disabled={totalCount < limit}
                                    >
                                        view more
                                    </button>
                                )}
                            </div>
                            :
                            <InvolvGadgetPeopleConnecting />
                        }
                    </>
                )
            }

        </LayoutTransition>
    )
}