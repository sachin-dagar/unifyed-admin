import React, { useEffect, useState } from "react";
import InvolvTenantBreadcrumbs from "../../../route/InvolvTenantBreadcrumbs";
import Stepper from "../../../shared/stepper/Stepper"; 
import { Outlet } from "react-router-dom";

function GadgetConfigure() {
    const[currentstep , setCurrentstep] = useState([])
    const tab = [
        {step : 'Basic' , previous : false, next : false},
        {step : 'Configrutation' , previous : false, next : false},
        {step : 'Permission' , previous : false, next : false},
        {step : 'Media & Release Details' , previous : false, next : false},
        {step : 'Policy' , previous : false, next : false}
    ]
    return(
        <div>
            <div className="font-bold text-gray-600 text-md">Add Gadget</div>
            <InvolvTenantBreadcrumbs />
            <Stepper tab ={tab} currentstep = {currentstep} />
            <div className="py-5 mt-10">
                <Outlet context={[setCurrentstep]} />
            </div>
        </div>
    )
}
export default GadgetConfigure;