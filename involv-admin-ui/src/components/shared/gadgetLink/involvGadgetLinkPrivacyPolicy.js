import React from 'react'


export default function InvolvGadgetLinkPrivacyPolicy({
    customClass,
    rawHtml,
}) {
    return (
        <div className="mx-auto container p-0" dangerouslySetInnerHTML={{ __html: rawHtml }}>
        </div>
    )
}