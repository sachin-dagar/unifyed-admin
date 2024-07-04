import React,{ memo } from 'react'
import GadgetDragItem from './GadgetDragItem'
import GadgetDropContainer from './GadgetDropContainer'
import { complexdropdownIcon , dropdownIcon , checkboxgroupIcon , textfieldIcon , numberIcon , priceIcon} from "../../../../../AppIcons";

const configureattributeType = [
    {
        label:'Dropdown',
        attributeType : 'dropdown',
        icon : dropdownIcon,
    },
    {
        label:'Text Field',
        attributeType : 'text',
        icon : textfieldIcon,
    }
]
const GadgetDragDropContainer = memo(function GadgetDragDropContainer() {
  return (
    <div>
        <div className="bg-white pt-6 pb-6 px-6 rounded-md shadow ">
            <div className="pb-5 flex mb-2 justify-between">
                <div className="w-10/12 flex items-center">
                    <div className="font-medium text-grayInvolv-900 mr-8">
                        Builder
                    </div>
                </div>
            </div>
            <div className="flex" style={{ overflow: 'hidden', clear: 'both' }}>
                {configureattributeType.map((value , index) => {
                    return <GadgetDragItem type={value.attributeType}  name={value.label} icon={value.icon} key={index} />
                })}
            </div>
        </div>
        <div className="bg-white pt-6 pb-6 px-6 rounded-md shadow mt-5">
            <div className="pb-5 flex mb-2 justify-between">
                <div className="w-10/12 flex items-center">
                    <div className="font-medium text-grayInvolv-900 mr-8">
                        Configure
                    </div>
                </div>
            </div>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
                <GadgetDropContainer />
            </div>
        </div>
    </div>
  )
})

export default GadgetDragDropContainer;