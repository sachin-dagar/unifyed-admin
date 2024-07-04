import React from 'react';

export default function InvolvGadgetPeopleConnecting({
    title = 'Something went wrong!',
    description = 'We will sort this out shortly, Kindly try again later.',
}) {

    return (
        <div className="w-full p-3 my-3 relative bg-grey-500">

            <div className='w-full flex justify-center'>

                <img src="/images/people_connecting.svg" width="250px" height="250px" alt="" />

            </div>

            <h4 className='pt-5 pb-2 text-center text-gray-700 text-sm font-bold'>{title}</h4>

            <span className="text-gray-700 text-center text-sm">
                <div>
                    <p>
                        {description}
                    </p>
                </div>
            </span>
        </div>
    )
}