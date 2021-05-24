import React, {useState, useEffect, useContext} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext)


export const WOQLClientProvider = ({children, params}) => {
    const [woqlClient, setWoqlClient] = useState(null)
    const [loadingServer, setLoadingServer] = useState(true)

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
        initWoqlClient()
    }, [opts])

    useEffect(() => {
        if(woqlClient)
            setLoadingServer(false)
    }, [woqlClient])

    return (
        <WOQLContext.Provider
            value={{
                woqlClient,
                loadingServer
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}