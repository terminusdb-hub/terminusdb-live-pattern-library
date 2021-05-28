import React from "react"
import {QueryPane} from "./QueryPane"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {NEW_PANE_CONFIG} from "./constants"
import {QueryPaneObj} from "../hooks/queryPaneContext"


export const QueryView = (props) => {
    const {queryPaneList,addQueryPane} = QueryPaneObj()

    const QueryPaneBox = (props) => {
        return (
            <div id={props.id}>
                <TDBReactButton config={NEW_PANE_CONFIG} 
                    onClick={() => {addQueryPane()}} 
                />
                <QueryPane id={props.id} queryObj={props.queryObj} name={props.name}/>                
          </div>
        )
    }

    //maybe we can have multi dataproduct name
    //for now i get it from the actual selected
    const NewQueryPane = (props) => {
        const  paneList=[]
        let num = 1;
         queryPaneList.forEach(function(item, key) {
            paneList.push(<QueryPaneBox key={key} id={key} queryObj={item} 
                name={`Query Pane ${num++}`}/>)

        })
        return paneList       
     }

    return (<React.Fragment>
                <NewQueryPane />
            </React.Fragment>
            )
}