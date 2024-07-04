import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loader = ({width=50, height=50, strokeWidth=7, color="blue", secondaryColor="gray", customClass=''}) => {
    return (
        <div className={customClass}>
            <Oval
                ariaLabel="loading-indicator"
                height={height}
                width={width}
                strokeWidth={strokeWidth}
                color={color}
                secondaryColor={secondaryColor}
            />
        </div>
    )
}

export default Loader;