import React, {useEffect, useState} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {getStoredQueriesNames, getStoredQueryObject} from "../Queries/GeneralQueries"
import {isArray, convertToWOQL} from "../Functions/Utils"
import {useHook} from "./hook"

export const SavedQueries = ({setInteractiveQuery}) => {

    const {woqlClient} = WOQLClientObj()
    const [savedQueryId, setSavedQueryId] = useState(false)

    const [query, setQuery] = useState(false)
    const [queryObject, setQueryObject] = useState(false)

    const [dataProvider]=useHook(woqlClient, query)
    const [dataProviderQueryObject]=useHook(woqlClient, queryObject)


    useEffect(() => {
        if(woqlClient){
            let q = getStoredQueriesNames()
            setQuery(q)
        }
    }, [woqlClient])

    function handleClick (id) {
        let q = getStoredQueryObject(id)
        setSavedQueryId(id)
        setQueryObject(q)
    }

    useEffect(() => {
        var qd=""
        if (isArray(dataProviderQueryObject)) {
            for (var key in dataProvider){
                for (var k in dataProvider[key]) {
                    if(savedQueryId == dataProvider[key]["Worker"]) {
                        if(k == "Query"){
                            qd=dataProvider[key][k]["@value"]
                            break
                        }
                    }
                }
                
            }
            let woqlQuery=convertToWOQL(qd)
            setInteractiveQuery(woqlQuery)
        }
    }, [dataProviderQueryObject])

 
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
