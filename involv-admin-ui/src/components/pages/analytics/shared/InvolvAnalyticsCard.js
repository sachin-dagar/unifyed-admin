import React from "react";

function InvolvAnalyticsCard({children}) {
     
    return(
        <div className="flex flex-col justify-between bg-white pt-4 pb-4 px-4 rounded-md shadow-sm mt-5 border h-full">
            {children}
        </div>
    )
}

export default InvolvAnalyticsCard;