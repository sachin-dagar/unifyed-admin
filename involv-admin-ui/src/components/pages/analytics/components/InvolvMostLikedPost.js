import React, { useMemo } from "react";
import InvolvAnalyticsCard from "../shared/InvolvAnalyticsCard";
import InvolvAnalyticsCardHeader from "../shared/InvolvAnalyticsCardHeader";

function InvolvMostLikedPost() {

  return (
    <div className="w-full h-full">
      <InvolvAnalyticsCard>
        <InvolvAnalyticsCardHeader
          title={"Most Liked Posts"}
        />
        <div className="">

        </div>
      </InvolvAnalyticsCard>
    </div>
  );
}

export default InvolvMostLikedPost;
