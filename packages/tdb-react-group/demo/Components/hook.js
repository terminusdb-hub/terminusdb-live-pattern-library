import {useState, useEffect} from 'react'

function useHook(woqlClient, startQuery) {
    const query = startQuery || false
    const [woql, setWoqlQuery] = useState(query)
    const [report, setReport] = useState()
    const [bindings, setBindings] = useState()
    const [result, setResult] = useState()
    const [loading, setLoading] = useState()

    const [cmsg, setCMsg] = useState('Update Query from Console Query Page')

    function executeQuery(q) {
        //setLoading(true)
        q.execute(woqlClient, cmsg)
        .then((response) => {
            // set the bindings 
            setResult(response.bindings)
        })
        .catch((error) => {
            console.log("query run error", error) 
        })
        .finally(() => {
            //setLoading(false)
        })
    }

    useEffect(() => {
        if (query !== false) 
            executeQuery(query)
    }, [query])

    return [result]
}

export {useHook}
