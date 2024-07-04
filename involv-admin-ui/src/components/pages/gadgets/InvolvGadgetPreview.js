import React, { useEffect, useState } from "react";

import Card from "../../shared/card/Card";
import InvolvHeader from "../../shared/header/InvolvHeader";
import InvolvGadgetPreviewHeroSection from "../../shared/gadgetPreviewHeroSection/InvolvGadgetPreviewHeroSection";
import InvolvGadgetLink from "../../shared/gadgetLink/InvolvGadgetLink";
import InvolvGadgetLinkPrivacyPolicy from "../../shared/gadgetLink/involvGadgetLinkPrivacyPolicy";
import InvolvGadgetLinkReviews from "../../shared/gadgetLink/involvGadgetReview/involvGadgetLinkReviews";
import InvolvGadgetLinkVersionHistory from "../../shared/gadgetLink/involvGadgetLinkVersionHistory";
import InvolvGadgetLinkSupport from "../../shared/gadgetLink/involvGadgetLinkSupport";
import InvolvGadgetLinkOverView from "../../shared/gadgetLink/involvGadgetLinkOverView";
import InvolvFooter from "../../shared/footer/InvolvFooter";
import Loader from "../../shared/loader/Loader";
import { convertFilterString } from "../../../util";
import { GadgetService } from "../../../services/api/gadget/GadgetService";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import LayoutTransition from "../../shared/LayoutTransition";

export default function InvolvGadgetPreview() {
  const [relatedGadget, setRelatedGadget] = useState([]);
  const [gadgetDetails, setGadgetDetails] = useState({});
  const [isInstalled, setIsInstalled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { tenant, userProfile } = useAuth();
  let { gadgetId } = useParams();
  const tabs = ["Overview", "Privacy Policy", "Review", "Support", "Version History"];
  const [tabActive, setTabActive] = useState(tabs[0]);

  useEffect(async () => {
    try {
      setIsLoading(true);
      let filterURL = convertFilterString({
        pageNo: 1,
        limit: 4,
      });
      const { gadgetList } = await GadgetService.getallGadgets(filterURL);
      const gadgetDetails = await GadgetService.getGadgetDetails(gadgetId);
      setRelatedGadget(gadgetList);
      setGadgetDetails(gadgetDetails);
      setIsLoading(false);
    } catch (ex) {
      console.log("error", ex);
      setIsLoading(false);
    }
  }, [gadgetId]);

  const renderTabsDetail = () => {
    switch (tabActive) {
      case "Overview":
        return <InvolvGadgetLinkOverView gadgetDetails={gadgetDetails}/>
      case "Privacy Policy":
        return <InvolvGadgetLinkPrivacyPolicy rawHtml={gadgetDetails?.gadgetPrivacyPolicy}/>
      case "Review":
        return <InvolvGadgetLinkReviews gadgetId={gadgetDetails.gadgetId} containerCustomClasses={"h-56 lg:h-96 py-5 gap-x-7 styled-scrollbar"}/>
      case "Support":
        return <InvolvGadgetLinkSupport gadgetSupport={gadgetDetails.gadgetSupport} containerCustomClasses={"h-56 lg:h-96 py-5 gap-x-7 styled-scrollbar"}/>
      case "Version History":
        return <InvolvGadgetLinkVersionHistory gadgetId={gadgetDetails.gadgetId} containerCustomClasses={"py-5 gap-x-7 styled-scrollbar"}/>
      default:
        return null;
    }
  }

  return (
    <LayoutTransition>
      <div className="w-full">
        <InvolvHeader />
        {isLoading ? (
          <div className="flex justify-center h-screen w-full items-center">
            <Loader />
          </div>
        ) : (
          <>
            <InvolvGadgetPreviewHeroSection
              {...gadgetDetails}
              websiteUrl="www.unite.unifyed.com"
            />
            <div className="flex flex-row xl:justify-center lg:justify-center justify-around items-center mx-auto container xl:px-5 lg:px-5 md:px-5 sm:px-3 px-3 py-2 my-10">
              {tabs.map((tab) => {
                 const active = tab === tabActive;
                 return (
                  <InvolvGadgetLink
                    key={tab}
                    customClass={
                      active
                        ? "text-blue-500 w-max px-2 whitespace-nowrap xl:px-5 lg:px-5 md:px-5 sm:px-3 px-3 py-2 border border-blue-500 rounded-3xl"
                        : "text-gray-400 text-center md:py-2 whitespace-nowrap"
                    }
                    title={tab}
                    onSelect={(e) => {setTabActive(e)}}
                  />
                 )
              })}
            </div>
            <div className=" mx-5 lg:mx-40 mt-10 mb-20">
              {renderTabsDetail()}
            </div>
            <div className="flex flex-col justify-center items-center mx-5 lg:mx-40 mt-10 mb-20">
              <div className="border-b-8 w-20 border-black"></div>
              <p className="text-2xl 2xl:text-3xl font-bold mb-8 mt-3 text-center">
                {" "}
                Related Gadgets{" "}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card gadgetList={relatedGadget} />
              </div>
            </div>
          </>
        )}
        <InvolvFooter />
      </div>
    </LayoutTransition>
  );
}
