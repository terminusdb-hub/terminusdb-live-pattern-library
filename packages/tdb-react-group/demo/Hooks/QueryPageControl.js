
import {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {useHook} from "./hook"

export const QueryPaneControl = (id, qpaneQuery) => {
    const [woqlQuery, setWOQLQuery]=useState(qpaneQuery)
    const {woqlClient} = WOQLClientObj()
    const [isExpanded, setExpanded] = useState(true)
    const [qpIsExpanded, setQpExpanded] = useState(true)
    const [saveQuery, setSaveQuery] = useState()
    const [saveQueryName, setSaveQueryName] = useState()

    const [editorContent, setEditorContent] = useState(false)

    let dp = useHook(woqlClient, saveQuery) 

    useEffect(() => {
        if(woqlQuery) {
            setEditorContent(woqlQuery.prettyPrint("js"))
        }
        
    }, [woqlQuery]) 

    return {
        setWOQLQuery,
        woqlQuery,
        setExpanded,
        isExpanded,
        setQpExpanded,
        qpIsExpanded,
        setSaveQuery,
        setSaveQueryName,
        saveQueryName,
        editorContent,
        woqlClient
    }
}
