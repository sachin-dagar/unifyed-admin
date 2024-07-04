import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from "../../../../services/api/context/authContext/AuthContext";
import { GadgetService } from "../../../../services/api/gadget/GadgetService";
import { convertFilterString } from "../../../../util";
import InvolvButton from '../../InvolvButton';
import ReviewListingLayout from './reviewListingLayout';
import toast from "react-hot-toast";
import LayoutTransition from "../../../shared/LayoutTransition";
import Loader from "../../../shared/loader/Loader";

export default function InvolvGadgetLinkReviews({
    gadgetId
}) {
    const { loggedIn, tenant } = useAuth();

    const [reviews, setReviews] = useState([]);
    const [filteredPendingReview, setFilteredPendingReview] = useState([]);
    const [filteredApprovedReview, setFilteredApprovedReview] = useState([]);

    const [ratings, setRatings] = useState([
        { rating: 1, active: false },
        { rating: 2, active: false },
        { rating: 3, active: false },
        { rating: 4, active: false },
        { rating: 5, active: false }
    ]);
    const [markedRating, setMarkedRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviewStatus, setReviewStatus] = useState('pending');

    const [canWriteDialog, setCanWriteDialog] = useState(false);
    const [canCreate, setCanCreate] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [involvBtnLoading, setInvolvBtnLoading] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    const [isRefresh, setIsRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        (async () => {
            if (loggedIn) {
                let filterURLInstalled = convertFilterString({
                    pageNo: 1,
                    limit: 100,
                });
                const installedGadgets = await GadgetService.getTenantGadgetList(
                    tenant?.tenant?.tenantDomain,
                    filterURLInstalled
                );
                const installedGadget = installedGadgets?.gadgetList?.find((gadget) => gadget.gadgetId === gadgetId);
                if (installedGadget) {
                    setIsInstalled(true);
                }
            }
        })();
    }, []);

    useEffect(async () => {
        try {
            setLoading(true);
            let filterURL = convertFilterString({
                pageNo: 1,
                limit: 100,
            });
            const reviews = await GadgetService.getReviewOfAPartucularGadget(gadgetId, filterURL);

            const filteredPendingReview = reviews.filter(element => {
                return element.gadgetId === gadgetId
                    && element.status === 'pending'
                    && element.reviewedBy.tenantDomain === tenant.tenant.tenantDomain;
            });
            const filteredApprovedReview = reviews.filter(element => {
                return element.gadgetId === gadgetId && element.status === 'approved';
            });

            setReviews(reviews);
            setFilteredPendingReview(filteredPendingReview);
            setFilteredApprovedReview(filteredApprovedReview);

            if (loggedIn) {
                const filteredTetanantApprovedReview = reviews.filter(element => {
                    return element.gadgetId === gadgetId
                        && element.status === 'approved'
                        && element.reviewedBy.tenantDomain === tenant.tenant.tenantDomain;
                });
                setCanEdit((filteredPendingReview.length > 0) ? true : false);
                setCanWriteDialog((!filteredPendingReview.length > 0 && !filteredTetanantApprovedReview.length > 0) ? true : false);
                if (filteredPendingReview.length > 0) {
                    markRating(parseInt(filteredPendingReview[0]?.rating));
                    setReviewText(filteredPendingReview[0]?.reviewText);
                }
            }
            setIsRefresh(false);
            setLoading(false);
        } catch (ex) {
            setLoading(false);
            console.log("error", ex);
        }
    }, [isRefresh]);

    const markRating = (rating) => {
        let temp = [...ratings];

        //InActive All Rating.
        temp.forEach((e) => {
            e.active = false;
        });

        // Marking Active 
        temp.forEach((e) => {
            if (e.rating <= rating) {
                e.active = true;
            }
        });
        setRatings(temp);
        setMarkedRating(rating);
    };

    const submitReview = async () => {
        try {
            setInvolvBtnLoading(true);
            var data = {
                gadgetId,
                reviewText: reviewText,
                status: reviewStatus,
                rating: markedRating,
                latestVersion: ""
            }

            const result = !canEdit ?
                await GadgetService.addGadgetReview(data)
                : await GadgetService.updateGadgetReview(filteredPendingReview[0]?._id, data);

            if (
                result?.status === 400 || result?.status > 400 || result?.status === 500
            ) {
                toast.error(result?.message || "Something went wrong!");
                setInvolvBtnLoading(false);
            } else {
                toast.success(`Thank you for sharing for feedback.`, { duration: 4000, });
                setInvolvBtnLoading(false);
                setCanCreate(false);
                setIsRefresh(true);
            }
        } catch (err) {
            setInvolvBtnLoading(false);
            toast.error(err?.message || "Something went wrong!");
        }
    };

    const onClickEdit = useCallback(async (item) => {
        if (Object.keys(item).length > 0) {
            setCanEdit(true);
            setReviewStatus(item?.status);
            setFilteredPendingReview([item]);
            markRating(parseInt(item?.rating));
            setReviewText(item?.reviewText);
        }
    });

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
                        {!loggedIn && (
                            <ReviewListingLayout reviews={filteredApprovedReview} onClickEdit={onClickEdit} />
                        )}

                        {loggedIn && (
                            <>
                                {canWriteDialog && (
                                    <>
                                        <div className="border w-full p-3 my-2 relative bg-grey-500 h-20">
                                            <div className="flex flex-row content-center mt-2">
                                                <img
                                                    className="w-9 h-9 2xl:w-8 2xl:h-8 bg-gray-300 rounded-full flex-shrink-0 ml-5"
                                                    src={"/images/gray_profile.svg"}
                                                    alt="" />
                                                <a className="text-xs cursor-pointer md:text-sm md:mx-5 font-semibold text-[#3246D3] mt-2"
                                                    onClick={(e) => {
                                                        if(isInstalled){
                                                            setCanWriteDialog(false);
                                                            setCanCreate(true);
                                                        }else {
                                                            toast.success(`Sorry you can't add feedback. As this gadget is not installed.`, { duration: 4000, });
                                                        }
                                                    }}
                                                >
                                                    Write a Review
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {(canCreate || canEdit) && (
                                    <>
                                        <div className="border w-full p-3 my-2 bg-grey-500 ">
                                            <div class="grid grid-rows-2 grid-flow-col gap-4">
                                                <div class="col-span-2">
                                                    {canCreate && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 2xl:w-8 2xl:h-8 flex-shrink-0 ml-5" viewBox="0 0 20 20" fill="currentColor"
                                                            onClick={(e) => { setCanWriteDialog(true); setCanCreate(false); markRating(0); setReviewText(''); }}>
                                                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                                        </svg>

                                                    )}
                                                </div>
                                                <div class="row-span-2 col-span-2">
                                                    <span>Rate your recent experience</span>
                                                    <div className="flex justify-start items-center my-1">
                                                        <ul className="flex justify-start">
                                                            {ratings?.map((item, i) => {
                                                                return (
                                                                    <li key={i}>
                                                                        <img
                                                                            className="h-8 w-auto md:h-9 2xl:h-10 cusror-pointer"
                                                                            src={item.active ? '/images/star-full.svg' : '/images/star-grey.svg'}
                                                                            alt=""
                                                                            onClick={(e) => { markRating(item.rating) }}
                                                                        />
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            {markedRating > 0 && (
                                                <div>
                                                    <hr className="my-5"></hr>

                                                    <h4 className="text-left my-3 text-xs 2xl:text-sm font-bold text-black-600">Tell us about your experience</h4>

                                                    <textarea
                                                        className="form-control block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                                                    rounded font-medium text-xs transition ease-in-out mt-4
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                                                        id="exampleFormControlTextarea1"
                                                        name="review"
                                                        rows="5"
                                                        required
                                                        value={reviewText}
                                                        onChange={(e) => { setReviewText(e.target.value.trimStart()) }}
                                                        placeholder="This is where you write your review."
                                                    ></textarea>

                                                    <small className="text-xs w-full my-3 2xl:text-sm font-medium text-gray-500">Most helpful reviews have 100 words or more</small>

                                                    <div className='w-full text-right'>
                                                        <InvolvButton
                                                            type="submit"
                                                            loading={involvBtnLoading}
                                                            disabled={reviewText.length > 0 ? false : true}
                                                            onClick={submitReview}
                                                        >
                                                            {canEdit ? 'Update' : 'Submit'}
                                                        </InvolvButton>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                                <ReviewListingLayout reviews={filteredApprovedReview} onClickEdit={onClickEdit} />
                            </>
                        )}

                    </>
                )
            }
        </LayoutTransition>
    )
}