import React from "react"

import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {getStoredQueryObject} from "../Queries/GeneralQueries"
import {isArray} from "../Functions/Utils"
import {SavedQueriesControl} from "../Hooks/SavedQueriesControl"
import {QueryPaneObj} from "../Hooks/queryPaneContext" 

export const SavedQueries = (props) => {

    const {addQueryPane} = QueryPaneObj()

    const {
        dataProvider,
        setSavedQueryId,
        setQueryObject
    } = SavedQueriesControl(addQueryPane)

    function handleClick (id) {
        let q = getStoredQueryObject(id)
        setSavedQueryId(id)
        setQueryObject(q)
    }

 
    const List = ({dataProvider}) => {
        if (isArray(dataProvider)) {
            let lts=[], elements=[]
            for (var key in dataProvider){
                let label=dataProvider[key]["Query Name"]["@value"]
                let id=dataProvider[key]["Worker"]
                lts.push({id:id, label: label, title: label, type: "link", variant: "light", size:"sm"})
            }
            
            for(var item in lts){
                elements.push(
                    <TDBReactButton config={lts[item]} onClick={handleClick}/>
                )
            }

            return elements
        }
        return "LOADING"
    }

    
    return <div className="d-grid">
        <List dataProvider={dataProvider}/>
    </div>
}
