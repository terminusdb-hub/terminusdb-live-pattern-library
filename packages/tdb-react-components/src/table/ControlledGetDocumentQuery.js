import React, {useState, useEffect} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
const WOQL = TerminusClient.WOQL

function ControlledGetDocumentQuery (woqlClient, document, results, queryLimit, queryStart, order,total,runQuery) {
    const [limit, setLimit] = useState(queryLimit || 0)
    const [start, setStart] = useState(queryStart || 0)
    const [orderBy, setOrderBy] = useState(order||false)
    const [rowCount, setRowCount] = useState()
    const [result, setResult] = useState(results)
    const [loading, setLoading] = useState(false)
    const [controlledDocument, setControlledDocument] = useState(document || false)
    const [loaded, setLoaded] = useState(false)
    const [commitMsg, setCommitMsg]=useState()
    const [refresh, setRefresh] = useState(0)
    const [documentResults, setDocumentResults]= useState(false)

    useEffect(() => {
        setControlledDocument(document)
    }, [document])

    /*const docQuery = (q) => {
        if(q.containsUpdate()) return q
        let wrapper = WOQL.query()
        if(limit) wrapper.limit(limit)
        if(start) wrapper.start(start)
        if(orderBy) wrapper.order_by(...orderBy)
        return wrapper.and(q)
    }

    const countQuery = (q) => {
        return WOQL.count("v:Count", q)
    }*/

    const changeOrder = (ord) => {
        if(JSON.stringify(orderBy) != JSON.stringify(ord)){
            setOrderBy(ord)
            setStart(0)
        }
    }

    const onRefresh = () => {
        setRefresh(refresh+1)
    }


    const changeLimits = (l, s) => {
        let ll = parseInt(l) || 0
        let ss = parseInt(s) || 0
        if(ll != limit) {
            setLimit(ll)
        }
        if(ss != start) setStart(ss)
    }

    const updateQuery = (nwoql, commitMsg) => {
        //setWOQL(nwoql)
        //setCommitMsg(commitMsg)
    }

    const executeQuery = async () => {
        if(controlledDocument && woqlClient){
            let params = {}
            setLoading(true)
            let tstart = Date.now()
            let db=woqlClient.db()
            params['type'] = controlledDocument
            params['as_list'] = true
            await woqlClient.getDocument(params, db).then((response) => {
                //processSuccessfulResult(response, tstart)
                setDocumentResults(response)
            })
            .catch((error) => {
                processErrorResult(error, tstart)
            })
            .finally(() => {
                setLoading(false)
            })
            
        }
    }

    /*const executeCountQuery = () => {
        let q = countQuery(woql)
        q.execute(woqlClient)
        .then((cresult) => {
            let val = ((cresult && cresult.bindings && cresult.bindings.length) ? cresult.bindings[0]['Count']['@value'] : 0)
            setRowCount(val)
        })
        .catch((error) => {
            console.log("Error in count query", error)
        })
    }*/

    function attachMetadata(metadata, stime) {
        metadata.start = stime
        metadata.end = new Date()
        metadata.duration = metadata.end - stime
        if(typeof metadata.bindings != "undefined"){
            metadata.rows = metadata.bindings ? metadata.bindings.length : 0
            metadata.columns = metadata.bindings && metadata.bindings[0] ? metadata.bindings[0].length : 0
        }
    }

    function processSuccessfulResult(response, stime) {
        if (response) {
            attachMetadata(response, stime)
            response.status=200
            setResult(response)
        }
    }

    /*
     * I have to review the error in interceptor
     */
    function processErrorResult(e, stime) {
        let response = {}
        attachMetadata(response, stime)
        response.status=e.status
        response.error = e
        setResult(response)
    }

    useEffect( () => {
        if(loaded){
            executeQuery()
        }
        else {
            setLoaded(true)
        }
    }, [limit, start, orderBy, refresh])

    useEffect( () => {
        if(controlledDocument){
            if(start > 0){
                setStart(0)
            }
            else {
                executeQuery()
            }
            //if(!woql.containsUpdate()) executeCountQuery()
        }
    }, [controlledDocument,runQuery])

    return {
        updateQuery,
        changeOrder,
        changeLimits,
        controlledDocument,
        result,
        limit,
        start,
        loading,
        rowCount,
        onRefresh,
        documentResults,
        setRefresh,
        refresh
    }
}

export {ControlledGetDocumentQuery}
