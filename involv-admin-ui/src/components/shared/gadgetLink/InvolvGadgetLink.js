import React from 'react'


export default function InvolvGadgetLink({
    customClass,
    title,
    onSelect,
}) {
    return(
        <a 
            className={
                `text-xs cursor-pointer
                md:text-sm 2xl:text-base md:font-medium 
                md:mx-5 ${customClass}`
            } 
            onClick={() => { onSelect(title) }}
        >
            {title}
        </a>
    )
}