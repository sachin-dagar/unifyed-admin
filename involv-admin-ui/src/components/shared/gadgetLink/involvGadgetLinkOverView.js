import React from 'react';
import InvolvOverviewSection from "../../shared/overview Section/InvolvOverviewSection";
import InvolvImageSlider from "../../shared/image Slider/InvolvImageSlider";
import InvolvGadgetPeopleConnecting from "./involvGadgetPeopleConnecting";


const sliderImages = [
    "https://s3.envato.com/files/308267580/Preview%20Image%20Set2/01_preview1.jpg",
    "https://cdn.dribbble.com/users/3862493/screenshots/15019574/media/21c415cb11a98f13d02bedd1134f834b.png?compress=1&resize=400x300",
    "https://i.pinimg.com/originals/cf/d0/0f/cfd00ff613363792d38fb666df03331e.png",
    "https://i.pinimg.com/originals/42/81/a9/4281a9636ca343ef77207196b4af5be8.jpg",
    "https://assets.materialup.com/uploads/81bf342d-95b9-4268-955e-da71c310161d/preview.png",
];

export default function InvolvGadgetLinkOverView({
    gadgetDetails
}) {
    return (
        <div>
            {gadgetDetails?.gadgetPhoto?.length > 0 ?
                (<InvolvImageSlider sliderImages={gadgetDetails?.gadgetPhoto} containerCustomClasses={"h-56 lg:h-96 pb-5 gap-x-7 styled-scrollbar"} />)
                :
                (<InvolvGadgetPeopleConnecting />)
            }

            <div className="mx-auto container 3xl:w-[1650px] md:px-15 my-10 p-0">
                <InvolvOverviewSection
                    gadgetOverview={gadgetDetails?.gadgetOverview}
                    latestVersion={gadgetDetails?.latestVersion}
                    updatedAt={gadgetDetails?.updatedAt}
                />
            </div>
        </div>
    )
}