import React from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {TABLE_VIEW_BUTTON_CONFIG, GRAPH_VIEW_BUTTON_CONFIG, GRAPH_VIEW, TABLE_VIEW} from "./constants"

export const ViewChooser=(props) =>{

    function handleClick(view){
        if(props.onClick) props.onClick(view)
    }

    return  <React.Fragment>
        <TDBReactButton config={TABLE_VIEW_BUTTON_CONFIG} onClick={(e) => handleClick(TABLE_VIEW)}/>
        <TDBReactButton config={GRAPH_VIEW_BUTTON_CONFIG} onClick={(e) => handleClick(GRAPH_VIEW)}/>
    </React.Fragment>
    
}