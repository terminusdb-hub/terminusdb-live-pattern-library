import React, {useState, useEffect, useContext} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
import {executeQueryHook} from "./executeQueryHook"
//import {graphStructureFromBindings, dbStructureFromBindings} from "./utils"
export const DBContext = React.createContext()
export const DBContextObj = () => useContext(DBContext)
import {WOQLClientObj} from '../init-woql-client'

export const DBContextProvider = ({children}) => {
    const {woqlClient, dataProduct} = WOQLClientObj()
    if(!woqlClient) return ''
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
    const [branches, setBranches] = useState({})
    //const [branchesQuery, setBranchesQuery] = useState(false)
    const [branchesReload, setBranchesReload] = useState(false)
    //const [branchesDataProvider, setBranchesData] = useState([])
    //const [branchesDataProvider]=executeQueryHook(woqlClient, branchesQuery)

    // graph states
   // const [graphs, setGraphs] = useState(false)
    //const [graphQuery, setGraphQuery] = useState(false)
    const [graphsReload, setGraphsReload] = useState(0)
    //const [graphDataProvider]=executeQueryHook(woqlClient, graphQuery)

    // DB Info 
    const [DBInfo, setDBInfo] = useState()
    const [consoleTime, setConsoleTime] = useState()

    //load branches
    useEffect(() => {
        if(woqlClient && dataProduct){
            //there is a bug with using in query so we have to set commits as branch
            woqlClient.checkout("_commits")
            const branchQuery = WOQL.lib().branches();
            console.log(woqlClient.connectionConfig.queryURL())
            woqlClient.query(branchQuery).then(result=>{
                 console.log("___BRANCHES___",result)
                 const branchesObj={}
                 if(result.bindings.length>0){
                    result.bindings.forEach(item=>{
                        const head = item.Head.split('/').pop()
                        const branchItem={id:item.Branch,
                                            head_id:item.Head,
                                            head:head,
                                            name:item.Name['@value'],
                                            timestamp:item.Timestamp['@value']
                                        }
                        branchesObj[branchItem.name] = branchItem
                    })
                 }
                 setBranches(branchesObj)
             }).catch(err=>{
                  console.log("GET BRANCH ERROR",err.message)
              }).finally(()=>{
                 //reset the main branch
                 woqlClient.checkout("main")
              })
        }
    }, [branchesReload, dataProduct,woqlClient])

   /* useEffect(() => {
        let binds = branchesDataProvider ? branchStructureFromBindings(branchesDataProvider) : []
        setBranches(binds)
    }, [branchesDataProvider])*/

    function updateBranches(bid) {
        if(bid) {
            setBranch(bid)
            woqlClient.ref(false)
            woqlClient.checkout(bid)
        }
        setBranchesReload(branchesReload + 1)
    }

    // set Head
    function setHead(branchID, refObject={}){// ridConsoleTime=false) 
        woqlClient.checkout(branchID)
        let sref=refObject.commit
        let refTime=refObject.time

        if(branches && branches[branchID] && branches[branchID].head == sref){
            sref = false
            refTime=false
        }
        sref = sref || false
        woqlClient.ref(sref)
      
        setBranch(branchID)
        setRef(sref)
        setConsoleTime(refTime)
    }

    //load db info
    useEffect(() => {
        //setLoading(loading + 1)
    //    // WOQL.lib()
    //         .first_commit()
    //         .execute(woqlClient)
    //         .then((res) => {
    //             let binds = res && res.bindings ? dbStructureFromBindings(res.bindings) : []
    //             setDBInfo(binds)
    //         })
    //         .catch((e) => {
    //             //setReport({error: e, status: TERMINUS_ERROR})
    //         })
            //.finally(() => setLoading(loading - 1))
    }, [])

    //maintain time travel 
    const [chosenCommit, setChosenCommit] = useState(false) 

    return (
        <DBContext.Provider
            value={{
                branches,
                updateBranches,
                branch,
                setHead,
                DBInfo,
                setConsoleTime, 
                consoleTime,
                setChosenCommit,
                chosenCommit
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
    let chosenCommit = false
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
        prefixesLoaded,
        chosenCommit
    }
}
