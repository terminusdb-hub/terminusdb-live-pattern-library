import React, {useState, useEffect, useContext} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext)
import { DATA_PRODUCTS } from './routing/constants'
import { useAuth0 } from "./react-auth0-spa"
import {SCHEMA_GRAPH_TYPE, TERMINUS_SUCCESS, TERMINUS_DANGER, FORM_VIEW, CREATE_DOCUMENT, EDIT_DOCUMENT,VIEW_DOCUMENT, PROGRESS_BAR_COMPONENT, GET_FRAMES_DOCUMENT} from "./components/constants"
import {executeDocumentAction, resetDocumentObject, updateDocument, addNewDocument} from "./hooks/DocumentControl"
import {getCountOfDocumentClass, getTotalNumberOfDocuments} from "./queries/GeneralQueries"
import {executeQueryHook} from "./hooks/executeQueryHook"
import { AiOutlineConsoleSql } from 'react-icons/ai'
import {Loading} from "./components/Loading"


export const WOQLClientProvider = ({children, params}) => {
    
    const {isAuthenticated,user,getTokenSilently} = useAuth0()
    const [woqlClient, setWoqlClient] = useState(null)
    const [loadingServer, setLoadingServer] = useState(true)
    const [dataProduct, setDatabase] = useState(false)

   // const [currentDocument, setCurrentDocument] = useState(false) // to control document interface chosen document
    const [branchesReload,setBranchReload] =useState(0)
    const [documentObjectReload, setDocumentObjectReload]=useState(0)
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
    const [sidebarDocumentListState, setSidebarDocumentListState] = useState(true)
    const [sidebarSampleQueriesState, setSidebarSampleQueriesState] = useState(false)

    //maybe we can change this for the local connection
    const [opts, setOpts] = useState(params)
    const [connectionError, setError] = useState(false)

    //const [needUpdate,setNeedUpdate] = useState(0)
   
    // document explorer consts 
    const [documentObject, setDocumentObject] = useState({
        type: false,
        action: false,
        view: FORM_VIEW,
        submit: false,
        currentDocument: false,
        frames: {},
        message: false,
        loading: false
    }) 
    //document classes 
    const [documentClasses, setDocumentClasses] = useState(false)

    // get document count 
    // set constants for query to get count of document class instances 
    const [query, setQuery] = useState(false)
    var [perDocumentCountProvider]=executeQueryHook(woqlClient, query)


    const [perDocumentCount, setPerDocument]=useState(false)
    const [totalDocumentCount, setTotalDocumentCount]=useState(false)

    // get total count of all documents 
    const [totalDocumentsQuery, setTotalDocumentsQuery]=useState(false)
    var [totalDocumentCountProvider]=executeQueryHook(woqlClient, totalDocumentsQuery)

    useEffect(() => {
        setPerDocument(perDocumentCountProvider)
    },[perDocumentCountProvider])

    useEffect(() => {
        setTotalDocumentCount(totalDocumentCountProvider)
    },[totalDocumentCountProvider])


    useEffect(() => {
        setOpts(params)
    }, [params])

     useEffect(() => {
        const initWoqlClientRemote = async()=>{
            //create the connection url by organization name
            const orgName = user['http://terminusdb.com/schema/system#team']
            const email = user['http://terminusdb.com/schema/system#email']
            const orgRemoteUrl=`${opts.server}${orgName}`
            const hubClient = new TerminusClient.WOQLClient(orgRemoteUrl)
        

            const jwtoken = await getTokenSilently()
            let hubcreds = {type: "jwt", key: jwtoken}         
            hubClient.localAuth(hubcreds)
            hubClient.organization(orgName) 
            hubClient.author(email) 
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
            setBranches(false)
            setDocumentClasses(false)
            // on change on data product re set document object
            resetDocumentObject(setDocumentObject)
            setPerDocument(false)
            setTotalDocumentCount(false)

            //there is a bug with using in woql so we have to set commits as branch
            const tmpClient = woqlClient.copy()
            tmpClient.checkout("_commits")
            /*** I commented this lib call as it dosent work, i use woqlClient.getbranches() instead ***/
            const branchQuery = TerminusClient.WOQL.lib().branches()
            tmpClient.query(branchQuery).then(result=>{
                 const branchesObj={}
                 if(result.bindings.length>0){
                    result.bindings.forEach(item=>{
                        const head_id = item.Head !== 'system:unknown' ?  item.Head : ''
                        const head = item.commit_identifier !== 'system:unknown' ?  item.commit_identifier['@value'] : ''
                        const branchItem={
                            id:item.Branch,
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
            }) 

            // on change on data product get classes 
            woqlClient.getClassDocuments(dataProduct).then((classRes) => {
                //console.log("classRes", classRes)
                setDocumentClasses(classRes)
                // get number document classes 
                let q=getCountOfDocumentClass(classRes)
                setQuery(q)
                let totalQ=getTotalNumberOfDocuments(classRes)
                setTotalDocumentsQuery(totalQ)
            })
            .catch((err) =>  {
                console.log("Error in init woql while getting classes of data product", err.message)
            })
        }
    }, [branchesReload, dataProduct])

    
    // on change of document action 
    const [filledFrame, setFilledFrame]=useState(false)
    useEffect(() => {
        executeDocumentAction(woqlClient, documentObject, setDocumentObject, reloadDocumentObject)
        //console.log("after execute action", documentObject)
    }, [documentObject.action, documentObject.type, documentObject.update]) 

    useEffect(() => {
        console.log("reloading doc")
        reloadDocumentObject()
    }, [documentObject.update]) 


    // on submit of form for create/ edit document
    useEffect(() => {
        if(!documentObject.submit) return
        let newDocumentInfo=documentObject.frames
        if(documentObject.action == CREATE_DOCUMENT) {
            addNewDocument(woqlClient, setDocumentObject, newDocumentInfo, documentObject)
        }
        if(documentObject.action == EDIT_DOCUMENT) {
            updateDocument(woqlClient, documentObject, setDocumentObject)
        }
    }, [documentObject.submit, documentObject.frames])


    const reloadDocumentObject = () => {
        //console.log("reloading man")
        setDocumentObjectReload(Date.now())
    }


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

    //get the list of databases
    function reconnectToServer (currentDB = false) { // temporary fix for loading new woqlClient when create/ delete of a data product, have to review
        woqlClient.connect().then(res=>{
            woqlClient.db(currentDB)
            setDataProduct(currentDB)
        }).catch(err=>{
            console.log(err)
        })
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
                reloadDocumentObject,
                reconnectToServer,
                documentClasses, 
                setDocumentClasses,
                filledFrame, 
                setFilledFrame,
                perDocumentCount,
                totalDocumentCount,
                documentObjectReload
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}