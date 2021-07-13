import React, {useState, useEffect, useContext} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext)
import { DATA_PRODUCTS } from './routing/constants'

export const WOQLClientProvider = ({children, params}) => {
    const [woqlClient, setWoqlClient] = useState(null)
    const [loadingServer, setLoadingServer] = useState(true)
    const [dataProduct, setDatabase] = useState(false)
    const [currentDocument, setCurrentDocument] = useState(false) // to control document interface chosen document
    
    // sets current page
    const [route, setRoute]=useState(DATA_PRODUCTS)

    // set left side bar open close state 
    const [sidebarDataProductListState, setSidebarDataProductListState] = useState(true)
    const [sidebarDataProductConnectedState, setSidebarDataProductConnectedState] = useState(false)
    const [sidebarDocumentListState, setSidebarDocumentListState] = useState(false)
    const [sidebarSampleQueriesState, setSidebarSampleQueriesState] = useState(false)

    const [opts, setOpts] = useState(false)

    // document consts 
    const [createDocument, setCreateDocument] = useState(false)


    useEffect(() => {
        setOpts(params)
    }, [params])

     useEffect(() => {
        const initWoqlClient = async () => {
            //const opts = params || {}
            const dbClient = new TerminusClient.WOQLClient(opts.server)
            TerminusClient.WOQL.client(dbClient)
            if (!opts.key || opts.key === 'undefined') {
                console.log("Key not included") 
            }
            else {
                try {
                    await dbClient.connect(opts)
                    setWoqlClient(dbClient)
                    if(opts.db) dbClient.db(opts.db)
                } catch (err) {
                    console.log("__CONNECT_ERROR__",err)
                    setLoadingServer(false)
                }
            }
        }
        if(opts && opts.server){
            initWoqlClient()
        }      
    }, [opts])

    useEffect(() => {
        if(woqlClient)
            setLoadingServer(false)
    }, [woqlClient])

    const setDataProduct = (id) =>{
        if(woqlClient){
            woqlClient.db(id)
            setDatabase(id)
        }
    }
    
    return (
        <WOQLContext.Provider
            value={{
                woqlClient,
                loadingServer,
                dataProduct, 
                setDataProduct,
                currentDocument, 
                setCurrentDocument,
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
                setCreateDocument,
                createDocument
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}