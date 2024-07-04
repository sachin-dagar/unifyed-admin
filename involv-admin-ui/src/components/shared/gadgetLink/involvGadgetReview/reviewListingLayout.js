import React from 'react';
import InvolvGadgetPeopleConnecting from "../involvGadgetPeopleConnecting";
import { useAuth } from "../../../../services/api/context/authContext/AuthContext";
import LayoutTransition from "../../../shared/LayoutTransition";
import moment from 'moment';

export default function ReviewListingLayout({
    reviews,
    onClickEdit
}) {
    const { loggedIn, tenant } = useAuth();

    return (
        <LayoutTransition>
            {reviews.length > 0 && (
                <>
                    <h6 className='text-gray-700 text-left 2xl:text-2xl pb-4 font-semibold mt-4'>Reviews {reviews.length}</h6>

                    {reviews.map((item, index) => {
                        return (
                            <div className="border w-full p-3 my-2 bg-grey-500">
                                <div class="flex">
                                    <div class="col-span-2 mt-1">
                                        <div class="flex items-center bg-[#E3EFFB] text-[#3246D3] justify-center w-9 h-9 2xl:w-8 2xl:h-8 rounded-full flex-shrink-0">
                                            <h6>{item?.reviewedBy?.organizationName.match(/\b(\w)/g).join('').substring(0, 2) || ''}</h6>
                                        </div>
                                    </div>

                                    <div>
                                        <small className='px-2 text-xs text-[#333333] font-semibold'>{item?.reviewedBy?.organizationName || 'N/A'}</small>
                                        <p className='flex w-full text-xs text-[#6F6F87] 2xl:text-sm px-2'>
                                            <div className='flex mt-0.5 items-center'>
                                                {(loggedIn && (tenant?.tenant?.tenantDomain === item?.reviewedBy?.tenantDomain)) && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-gray-400 cursor-pointer" viewBox="0 0 20 20" fill="currentColor"
                                                        onClick={(e) => {
                                                            onClickEdit(item);
                                                        }}
                                                    >
                                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                1 review
                                            </div>
                                        </p>
                                    </div>
                                </div>

                                <hr className='my-3'></hr>

                                <div className="flex justify-between  items-center my-1">
                                    <ul className="flex justify-start text-xs">
                                        {[1, 2, 3, 4, 5]?.map((_item, i) => {
                                            return (
                                                <li key={i}>
                                                    <img
                                                        className="h-3 w-auto md:h-3 2xl:h-3"
                                                        src={(_item <= item?.rating) ? "/images/star-full.svg" : "/images/star-grey.svg"}
                                                        alt=""
                                                    />
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <span className="text-gray-400 text-xs font-normal  ml-2">{moment(item?.updatedAt).format('LL')}  </span>
                                </div>

                                <p className='my-3 text-gray-500 text-xs font-normal'>
                                    {item?.reviewText || 'N/A'}
                                </p>
                            </div>
                        )
                    })}
                </>
            )}

            {(!loggedIn && reviews.length === 0) && (<InvolvGadgetPeopleConnecting />)}
        </LayoutTransition>
    )
}