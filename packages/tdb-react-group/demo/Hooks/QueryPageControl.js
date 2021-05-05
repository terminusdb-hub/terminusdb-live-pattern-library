
import {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {useHook} from "./hook"


export const QueryPageControl = () => {

    const [interactiveQuery, setInteractiveQuery]=useState(false)

    const [woqlQuery, setWOQLQuery]=useState()
    const [qp, setQp] = useState([{index: 0, woqlQuery: woqlQuery, setWOQLQuery: setWOQLQuery}])

    useEffect(() => {
        if (interactiveQuery) {
            setQp(arr => [...arr, {index: qp.length, 
                woqlQuery: interactiveQuery, 
                setWOQLQuery: setWOQLQuery}])
        }
    }, [interactiveQuery])

    return {
        setInteractiveQuery,
        setQp,
        qp,
        setWOQLQuery
    }
}

export const QueryPaneControl = (id, name, qpaneQuery, setQp, qp) => {
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
            let tqp = qp
            for (var i=0; i< tqp.length; i++) {
                if(tqp[i].index == id) {
                    tqp[i].woqlQuery=woqlQuery
                }
            }
            setQp(tqp)
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