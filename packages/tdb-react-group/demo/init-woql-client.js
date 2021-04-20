import React, {useState, useEffect, useContext} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext)


export const WOQLClientProvider = ({children, params}) => {
    const [woqlClient, setWoqlClient] = useState(null)


     useEffect(() => {
        const initWoqlClient = async () => {
            const opts = params || {}
            const dbClient = new TerminusClient.WOQLClient(opts.server)
            TerminusClient.WOQL.client(dbClient)
            if (!opts.key || opts.key === 'undefined') {
                console.log("Key not included")
            }
            else {
                try {
                    await dbClient.connect(opts)
                    setWoqlClient(dbClient)
                } catch (err) {
                    console.log("__CONNECT_ERROR__",err)
                    setConnecting(false)
                    setLoading(false)
                }
            }
        }
        initWoqlClient()
    }, [params]);

    return (
        <WOQLContext.Provider
            value={{
                woqlClient,
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}
