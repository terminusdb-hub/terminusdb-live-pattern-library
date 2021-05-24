import {useState, useEffect} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
import {executeQueryHook} from "./executeQueryHook"

function graphStructureFromBindings(bindings) {
    let gs = {}
    for (var i = 0; i < bindings.length; i++) {
        let fid = `${bindings[i]['Graph Type']['@value']}/${bindings[i]['Graph ID']['@value']}`
        gs[fid] = {
            id: bindings[i]['Graph ID']['@value'],
            type: bindings[i]['Graph Type']['@value'],
        }
    }
    return gs
}

export function DBGraphs  (woqlClient) {
    const [graphs, setGraphs] = useState(false)
    const [query, setQuery] = useState(false)
    const [dataProvider]=executeQueryHook(woqlClient, query)
    let WOQL = TerminusClient.WOQL

    useEffect(() => {
        if(woqlClient){
            let constraint = WOQL.query()
            if (woqlClient.ref()) {
                constraint.eq('v:Commit ID', woqlClient.ref())
            } else {
                constraint.eq('v:Branch ID', woqlClient.checkout())
            }

            let q = WOQL.lib().graphs(constraint)
            setQuery(q)
        }
    }, [woqlClient])

    useEffect(() => {
        let binds = dataProvider ? graphStructureFromBindings(dataProvider) : []
        setGraphs(binds)
    }, [dataProvider])

    return {
        graphs,
        setGraphs
    }

}


/*
export function DBBranches  (woqlClient) {
    const [branches, setBranches] = useState(false)
    const [query, setQuery] = useState(false)
    const [dataProvider]=executeQueryHook(woqlClient, query)
    let WOQL = TerminusClient.WOQL

    useEffect(() => {
        if(woqlClient){
            let constraint = WOQL.query()
            if (woqlClient.ref()) {
                constraint.eq('v:Commit ID', woqlClient.ref())
            } else {
                constraint.eq('v:Branch ID', woqlClient.checkout())
            }

            let q = WOQL.lib().graphs(constraint)
            setQuery(q)
        }
    }, [woqlClient])

    useEffect(() => {
        let binds = dataProvider ? graphStructureFromBindings(dataProvider) : []
        setGraphs(binds)
    }, [dataProvider])

    return {
        graphs,
        setGraphs
    }

}*/


