import React, {useState, useEffect, useContext} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext)


export const WOQLClientProvider = ({children, params}) => {
    const [woqlClient, setWoqlClient] = useState(null)
    const [loadingServer, setLoadingServer] = useState(true)
    const [dataProduct, setDatabase] = useState(false)

    const [opts, setOpts] = useState(false)

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
                setDataProduct
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}