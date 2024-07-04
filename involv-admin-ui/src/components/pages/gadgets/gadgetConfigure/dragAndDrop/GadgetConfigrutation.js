import React, { Fragment, useEffect, useState ,useCallback, createContext } from "react";
import { useOutletContext } from "react-router-dom";
import GadgetDragDropContainer from './GadgetDragDropContainer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function GadgetConfigrutation() {
    const [setCurrentstep] = useOutletContext();
    useEffect(() => {
        setCurrentstep(["Basic","Configrutation"])
    })
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <GadgetDragDropContainer />
            </DndProvider>
            <div className="mt-5 text-right">
                    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-medium text-sm leading-tight py-2 px-4 rounded">
                        Next
                    </button>
            </div>
        </>
    );
}


export default GadgetConfigrutation;