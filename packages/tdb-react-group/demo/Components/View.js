import React, {useState, useEffect} from "react"
import {QueryPane} from "./QueryPane"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {NEW_PANE_CONFIG} from "./constants"
import {QueryPaneObj} from "../Hooks/queryPaneContext"
import { NavItem } from "@themesberg/react-bootstrap"


export const View = (props) => {

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

    const NewQueryPane = (props) => {
        return queryPaneList.slice(0).reverse().map(item=>
            <QueryPaneBox key={item.id} id={item.id} queryObj={item} name={`Query Pane ${item.index}`}/>
        )
       
     }

    return (<React.Fragment>
                <NewQueryPane />
            </React.Fragment>
            )
}

