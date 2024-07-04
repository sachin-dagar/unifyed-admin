import React, { useMemo } from "react";
import { Chart } from "react-google-charts";
import InvolvAnalyticsCard from "../shared/InvolvAnalyticsCard";
import InvolvAnalyticsCardHeader from "../shared/InvolvAnalyticsCardHeader";

function InvolvMostUsedKeywords() {

  return (
    <div className="w-full h-full">
      <InvolvAnalyticsCard>
        <InvolvAnalyticsCardHeader
          title={"Most Used Keywords"}
        />

      </InvolvAnalyticsCard>
    </div>
  );
}

export default InvolvMostUsedKeywords;
