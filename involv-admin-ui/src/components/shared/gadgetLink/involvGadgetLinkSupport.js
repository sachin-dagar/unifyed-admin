import React, { useEffect, useState } from 'react';
import InvolvGadgetAccordian from '../accordian/involvGadgetAccordian';

export default function InvolvGadgetLinkSupport({
    gadgetSupport
}) {

    return (
        <div className="w-full p-3 my-3 relative bg-grey-500">

            <h3 className='py-5 text-center font-semibold text-2xl'>Welcome! How can we help?</h3>

            <div className='w-full flex justify-center'>

                <img src="/images/support_banner.svg" width="500px" alt="" />
            
            </div>

            <h3 className='py-2 mt-7 ml-2 font-semibold'>{gadgetSupport?.supportTitle || ''}</h3>

            {gadgetSupport?.supportArticle?.map((item, index) => {

                return (
                  <InvolvGadgetAccordian
                    title={item?.articleTitle || 'N/A'}
                    content={item?.articleDescription || 'N/A'}
                  />
                )
              })}

            <div className="w-full p-3 my-10 relative text-center" style={{backgroundColor: '#F8F8F8'}}>

                <h2 className='py-5 text-center font-semibold text-2xl'>Can't find what you need? Send us a help request.</h2>

                <button type="button" class="inline-block 
                    px-6 py-2 mb-5 bg-blueInvolv-600 
                    text-white font-medium 
                    text-xs leading-tight 
                    uppercase shadow-md 
                    hover:bg-blue-700 hover:shadow-lg 
                    focus:bg-blue-700 focus:shadow-lg 
                    focus:outline-none focus:ring-0 
                    active:bg-blue-800 active:shadow-lg 
                    transition duration-150 ease-in-out">
                    Contact Us
                </button>
            
            </div>

        </div>
    )
}