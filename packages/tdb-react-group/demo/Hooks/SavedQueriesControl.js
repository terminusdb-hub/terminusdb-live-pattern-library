
import {useState, useEffect} from "react"
import {useHook} from "./hook"
import {convertToWOQL} from "../Functions/Utils"
import {getStoredQueriesNames} from "../Queries/GeneralQueries"
import {WOQLClientObj} from '../init-woql-client'
import {isArray} from "../Functions/Utils"

export const SavedQueriesControl = (addQueryPane) => {

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
            addQueryPane(woqlQuery)
        }
    }, [dataProviderQueryObject])


    return {
        dataProvider,
        setSavedQueryId,
        setQueryObject
    }
}