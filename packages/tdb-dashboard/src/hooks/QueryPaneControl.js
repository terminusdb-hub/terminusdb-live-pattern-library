import {useState} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {executeQueryHook} from "./executeQueryHook"

export const QueryPaneControl = (queryObj) => {
    const {woqlClient} = WOQLClientObj()
    const [saveQuery, setSaveQuery] = useState()
    const [saveQueryName, setSaveQueryName] = useState()
    const [needUpdate,setNeedUpdate] = useState(0)

    let dp = executeQueryHook(woqlClient, saveQuery) 

    const setExpanded = (isExpanded)=>{
        setNeedUpdate(Date.now())
        queryObj.editorPanelIsOpen = isExpanded
    }

    const setQpExpanded = ()=>{
        const newStatus = !queryObj.mainPanelIsOpen
        queryObj.mainPanelIsOpen = newStatus
        setNeedUpdate(Date.now())       
    }

    

    return {
        needUpdate,
        setExpanded,
        setQpExpanded,
        setSaveQuery,
        setSaveQueryName,
        saveQueryName
    }
}