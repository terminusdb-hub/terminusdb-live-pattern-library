import React, {useState, useEffect, useContext} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext)
import { DATA_PRODUCTS } from './routing/constants'
import { useAuth0 } from "./react-auth0-spa";

export const WOQLClientProvider = ({children, params}) => {
    
    const {isAuthenticated,user,getTokenSilently} = useAuth0()
    const [woqlClient, setWoqlClient] = useState(null)
    const [loadingServer, setLoadingServer] = useState(true)
    const [dataProduct, setDatabase] = useState(false)

   // const [currentDocument, setCurrentDocument] = useState(false) // to control document interface chosen document
    const [branchesReload,setBranchReload] =useState(0)
    const [branch, setBranch] = useState(false)
    const [ref, setRef] = useState(false)

    // branchesstates 
    const [branches, setBranches] = useState(false)
    const [DBInfo, setDBInfo] = useState()
    const [chosenCommit,setChosenCommit]=useState({})
    // const [consoleTime, setConsoleTime] = useState()

    
    
    // sets current page
    const [route, setRoute]=useState(DATA_PRODUCTS)

    // set left side bar open close state 
    const [sidebarDataProductListState, setSidebarDataProductListState] = useState(true)
    const [sidebarDataProductConnectedState, setSidebarDataProductConnectedState] = useState(false)
    const [sidebarDocumentListState, setSidebarDocumentListState] = useState(false)
    const [sidebarSampleQueriesState, setSidebarSampleQueriesState] = useState(false)

    //maybe we can change this for the local connection
    const [opts, setOpts] = useState(params)
    const [connectionError, setError] = useState(false)
   
    // document explorer consts 
    const [documentObject, setDocumentObject] = useState({
        type: false,
        action: false,
        view: false,
        submit: false,
        currentDocument: false,
        frames: {},
        update: Date.now()
    }) 
    
    // clear document consts on change of data products
    useEffect(() => {
        setDocumentObject({
            type: false,
            action: false,
            view: false,
            submit: false,
            currentDocument: false,
            frames: {},
            update: Date.now()
          })
    }, [dataProduct])
        

    useEffect(() => {
        setOpts(params)
    }, [params])

     useEffect(() => {
        const initWoqlClientRemote = async()=>{
            //create the connection url by organization name
            const orgName = user['http://terminusdb.com/schema/system#team']
            const orgRemoteUrl=`${opts.server}${orgName}`
            const hubClient = new TerminusClient.WOQLClient(orgRemoteUrl)

            const jwtoken = await getTokenSilently()
            let hubcreds = {type: "jwt", key: jwtoken}         
            hubClient.localAuth(hubcreds)
            hubClient.organization(orgName) 
            try{
                await hubClient.connect()
                setWoqlClient(hubClient)
                //if(opts.db) dbClient.db(opts.db)
            } catch (err) {
                console.log("__CONNECT_ERROR__",err)
                setError("Connection Error")   
            }finally {
                setLoadingServer(false)
            }
        }
        const initWoqlClientLocal = async()=>{
            const dbClient = new TerminusClient.WOQLClient(opts.server,opts)
            try{
                await dbClient.connect()
                setWoqlClient(dbClient)
            } catch (err) {
                console.log("__CONNECT_ERROR__",err)
                setError("Connection Error")   
            }finally {
                setLoadingServer(false)
            }
        }
        if(opts && opts.server){
            if(opts.connection_type === 'LOCAL'){
                initWoqlClientLocal()
            }else if(isAuthenticated){
                initWoqlClientRemote()
            }
        }      
    }, [opts,user])


    const setDataProduct = (id) =>{
        if(woqlClient){
            woqlClient.db(id)
            setDatabase(id)
            //reset the head
            setHead('main',{commit:false,time:false})
        }
    }
    //I know I have to review this file!!!!!!!!
    useEffect(() => {
        if(woqlClient && dataProduct){
            //there is a bug with using in query so we have to set commits as branch
            //const tmpClient = woqlClient.copy()
            //tmpClient.checkout("_commits")
            /*** I commented this lib call as it dosent work, i use woqlClient.getbranches() instead ***/
            /*const branchQuery = TerminusClient.WOQL.lib().branches();
            tmpClient.query(branchQuery).then(result=>{
                 //console.log("___BRANCHES___",result)
                 const branchesObj={}
                 if(result.bindings.length>0){
                    result.bindings.forEach(item=>{
                        const head_id = item.Head !== 'system:unknown' ?  item.Head : ''
                        const head = item.commit_identifier !== 'system:unknown' ?  item.commit_identifier['@value'] : ''
                        const branchItem={id:item.Branch,
                                            head_id:head_id,
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
              }) */

              woqlClient.getBranches(dataProduct).then((res) => {
                if(res.length>0){
                    res.forEach(item=>{
                        const head_id = item.Head !== 'system:unknown' ?  item.Head : ''
                        const head = item.commit_identifier !== 'system:unknown' ?  item.commit_identifier['@value'] : ''
                        const branchItem={id:item.Branch,
                                            head_id:head_id,
                                            head:head,
                                            name:item.Name['@value'],
                                            timestamp:item.Timestamp['@value']
                                        }
                        branchesObj[branchItem.name] = branchItem
                    })
                 }
                 setBranches(branchesObj)
            })
            .catch((err) => {
                console.log("GET BRANCH ERROR",err.message)
            })
        }
    }, [branchesReload, dataProduct])
    //maybe we can combine this information
    //I have this info with woqlClient
    /* ref,
       branch,
    branches,
                setBranches,
                setRef,
                setBranch,*/
    const branchNeedReload = ()=>{
        setBranchReload(Date.now())
    }

    //to be review 
    //to much set state we can optimize this !!!
    function setHead(branchID, refObject={}){// ridConsoleTime=false) 
        if(branchID)woqlClient.checkout(branchID)
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
        setChosenCommit(refObject)
    }

    function reconnectToServer () { // temporary fix for loading new woqlClient when create/ delete of a data product, have to review
        location.reload()
    }

    return (
        <WOQLContext.Provider
            value={{
                chosenCommit,
                setHead,
                branchNeedReload,
                branches,
                setRef,
                setBranch,
                ref,
                branch,
                connectionError,
                woqlClient,
                loadingServer,
                dataProduct, 
                setDataProduct,
                route,
                setRoute,
                sidebarDataProductListState, 
                setSidebarDataProductListState,
                sidebarDataProductConnectedState, 
                setSidebarDataProductConnectedState,
                sidebarDocumentListState, 
                setSidebarDocumentListState,
                sidebarSampleQueriesState, 
                setSidebarSampleQueriesState,
                documentObject, 
                setDocumentObject,
                reconnectToServer
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}