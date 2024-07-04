import React from 'react'

export default function InvolvImageSlider({
    containerCustomClasses, 
    imageCustomClasses,
    sliderImages
}) {
    return(
        <div className={`flex flex-row flex-nowrap overflow-x-scroll ${containerCustomClasses}`}>
            {
                sliderImages &&
                    sliderImages.length > 0 ?
                        sliderImages.map((image, i) => <img src={image} key={i} className={imageCustomClasses} alt='' />)
                    : null
            }
        </div> 
    )
}