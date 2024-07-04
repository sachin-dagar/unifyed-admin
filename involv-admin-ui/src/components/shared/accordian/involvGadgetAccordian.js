import React, { useState } from 'react';

export default function InvolvGadgetAccordian({ 
    title,
    content
}) {

    const [isActive, setIsActive] = useState(false);

    return (
        <div className="w-full p-2 my-2 relative">

            <div 
                className='border-2 w-full p-2 flex justify-between items-center bg-grey-500' 
                onClick={() => setIsActive(!isActive)}
                >
                    <div className='text-gray-700 text-sm font-semibold ml-5'> {title}  </div>
                    <div className=''><span className='text-blue-600 text-2xl mr-3 text-semibold'>{isActive ? '-' : '+'}</span></div>
            
            </div>

            {
                isActive && 
                <div className='border-2 w-full py-2 px-2 bg-grey-500 text-gray-700 text-sm'>
                    <p className='ml-5'> {content} </p>
                </div>
            }
            
        </div>
    )
}