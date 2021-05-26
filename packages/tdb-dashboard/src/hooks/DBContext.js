import React, {useState, useEffect, useContext} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
import {executeQueryHook} from "./executeQueryHook"
import {graphStructureFromBindings, branchStructureFromBindings} from "./utils"
export const DBContext = React.createContext()
export const DBContextObj = () => useContext(DBContext)

export const DBContextProvider = ({children, woqlClient, dataProduct}) => {
    if (!woqlClient.db()) {
        return (
            <DBContext.Provider value={NullDBProvider(woqlClient)}>
                {children}
            </DBContext.Provider>
        )
    }
    

    const [loading, setLoading] = useState(0)
    let WOQL = TerminusClient.WOQL
    

    const [branch, setBranch] = useState(woqlClient.checkout())
    const [ref, setRef] = useState(woqlClient.ref())

    // branchesstates 
    const [branches, setBranches] = useState(false)
    const [branchesQuery, setBranchesQuery] = useState(false)
    const [branchesReload, setBranchesReload] = useState(false)
    const [branchesDataProvider]=executeQueryHook(woqlClient, branchesQuery)

    // graph states
    const [graphs, setGraphs] = useState(false)
    const [graphQuery, setGraphQuery] = useState(false)
    const [graphsReload, setGraphsReload] = useState(0)
    const [graphDataProvider]=executeQueryHook(woqlClient, graphQuery)

    //load branches
    useEffect(() => {
        if(dataProduct){
            let q = WOQL.lib().branches()
            setBranchesQuery(q)
        }
    }, [branchesReload])

    useEffect(() => {
        let binds = branchesDataProvider ? branchStructureFromBindings(branchesDataProvider) : []
        setBranches(binds)
    }, [branchesDataProvider])

    function updateBranches(bid) {
        if(bid) {
            setBranch(bid)
            woqlClient.ref(false)
            woqlClient.checkout(bid)
        }
        setBranchesReload(branchesReload + 1)
    }

    //load graphs
    useEffect(() => {
        if(dataProduct){
            let constraint = WOQL.query()
            if (woqlClient.ref()) {
                constraint.eq('v:Commit ID', woqlClient.ref())
            } else {
                constraint.eq('v:Branch ID', woqlClient.checkout())
            }

            let q = WOQL.lib().graphs(constraint)
            setGraphQuery(q)
        }
    }, [dataProduct, branch, ref, branches, graphsReload])

    useEffect(() => {
        let binds = graphDataProvider ? graphStructureFromBindings(graphDataProvider) : []
        setGraphs(binds)
    }, [graphDataProvider])

    function updateGraphs(){
        setGraphsReload(graphsReload + 1)
    }

    // set Head
    function setHead(branchID, refObject={}){// ridConsoleTime=false) 
        woqlClient.checkout(branchID)
        let sref=refObject.commit;
        let refTime=refObject.time;

        if(branches && branches[branchID] && branches[branchID].head == sref){
            sref = false
            refTime=false
        }
        sref = sref || false
        woqlClient.ref(sref)
      
        setBranch(branchID)
        setRef(sref);
    }

    return (
        <DBContext.Provider
            value={{
                graphs,
                setGraphs,
                updateGraphs,
                branches,
                updateBranches,
                branch,
                setHead
            }}
        >
            {children}
        </DBContext.Provider>
    )


}

export const NullDBProvider = (woqlClient) => {
    let branches = false
    let graphs = false
    let DBInfo = {created: 0}
    function setHead() {}
    function setConsoleTime() {}
    function updateBranches() {}
    let report = false
    let branch = false
    let ref = false
    let loading = false
    let consoleTime = false
    let prefixes = []
    let prefixesLoaded = true
    return {
        setConsoleTime,
        setHead,
        updateBranches,
        DBInfo,
        branches,
        prefixes,
        graphs,
        report,
        branch,
        consoleTime,
        ref,
        loading,
        prefixesLoaded
    }
}
