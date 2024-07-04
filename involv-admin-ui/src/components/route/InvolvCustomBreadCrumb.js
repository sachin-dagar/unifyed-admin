import React from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/solid";

const InvolvCustomBreadCrumb = ({
    heading = 'Default Heading',
    breadcrumbs = []
}) => {

    return (
        <div>
            <div className="font-medium text-grayInvolv-900 text-lg">{heading}</div>
            <div className="breadcrumbs flex">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol role="list" className="flex items-center space-x-1">
                        {breadcrumbs?.map((breadcrumb, index) => {
                            return (
                                <div key={index}>
                                    <li className="bc">
                                        <div className="flex items-center">

                                            {breadcrumb?.path ? (
                                                <Link
                                                    to={breadcrumb?.path || ''}
                                                    className='cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700'
                                                >
                                                    {breadcrumb?.label || 'N/A'}
                                                </Link>
                                            ) : (<span className="text-xs font-medium text-gray-500 hover:text-gray-700">{breadcrumb?.label || 'N/A'}</span>)
                                            }

                                            {index < breadcrumbs.length - 1 && (
                                                <ChevronRightIcon
                                                    className="flex-shrink-0 h-3 w-3 text-gray-400 ml-1 mr-1"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </div>
                                    </li>
                                </div>
                            )
                        })}
                    </ol>
                </nav>
            </div>
        </div>
    )
}

export default InvolvCustomBreadCrumb;