import React, { useMemo } from "react";
import InvolvAnalyticsCard from "../shared/InvolvAnalyticsCard";
import InvolvAnalyticsCardHeader from "../shared/InvolvAnalyticsCardHeader";
import InvolvAnalyticsTable from "../shared/InvolvAnalyticsTable";

function InvolvMostEngageUsers() {

  return (
    <div className="w-full h-full">
      <InvolvAnalyticsCard>
        <InvolvAnalyticsCardHeader
          title={"Most Engaged Users"}
          RangeDatepicker={true}
        />
        <InvolvAnalyticsTable/>
      </InvolvAnalyticsCard>
    </div>
  );
}

export default InvolvMostEngageUsers;
