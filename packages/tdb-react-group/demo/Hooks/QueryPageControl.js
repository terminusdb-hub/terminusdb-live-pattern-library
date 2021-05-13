
import {useState} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {useHook} from "./hook"

export const QueryPaneControl = (queryObj) => {
    const {woqlClient} = WOQLClientObj()
    const [isExpanded, setPanelExpanded] = useState(queryObj.editorPanelIsOpen )
    const [qpIsExpanded, setPanelQpExpanded] = useState(queryObj.mainPanelIsOpen)
    const [saveQuery, setSaveQuery] = useState()
    const [saveQueryName, setSaveQueryName] = useState()
    let dp = useHook(woqlClient, saveQuery) 

    const setExpanded = ()=>{
        const newStatus = !isExpanded
        setPanelExpanded(newStatus)
        queryObj.editorPanelIsOpen = newStatus
    }

    const setQpExpanded = ()=>{
        const newStatus = !qpIsExpanded
        setPanelQpExpanded(!qpIsExpanded)
        queryObj.mainPanelIsOpen = newStatus
    }

    return {
        setExpanded,
        isExpanded,
        setQpExpanded,
        qpIsExpanded,
        setSaveQuery,
        setSaveQueryName,
        saveQueryName
    }
}
