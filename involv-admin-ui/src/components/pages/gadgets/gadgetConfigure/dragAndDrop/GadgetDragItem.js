import React from 'react';
import { useDrag } from 'react-dnd'
function GadgetDragItem({type, name , icon}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'box',
        item: { type , name},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))
    const opacity = isDragging ? 0.4 : 1
    return (
        <span ref={drag} data-testid={`box`}  style={{ opacity: opacity }} className="flex px-2 py-2 mr-4 text-xs rounded cursor-pointer items-center text-gray-500 bg-gray-200 border border-gray-300 text-gray-500">
            <span className="mr-2">{icon}</span>
            <span className="whitespace-nowrap">{name}</span>
        </span>
    );
}

export default GadgetDragItem;