import React, {useState, useEffect, useContext} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext)


export const WOQLClientProvider = ({children, params}) => {
    const [woqlClient, setWoqlClient] = useState(null)
<<<<<<< HEAD


     useEffect(() => {
        const initWoqlClient = async () => {
            const opts = params || {}
=======
    const [loadingServer, setLoadingServer] = useState(true)

    const [opts, setOpts] = useState(false)

    useEffect(() => {
        setOpts(params)
    }, [params])

     useEffect(() => {
        const initWoqlClient = async () => {
            //const opts = params || {}
>>>>>>> 37f95a23c4a67688a0a307941322cab2d851f4f8
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
<<<<<<< HEAD
=======
                    setLoadingServer(false)
>>>>>>> 37f95a23c4a67688a0a307941322cab2d851f4f8
                }
            }
        }
        initWoqlClient()
<<<<<<< HEAD
    }, [params]);
=======
    }, [opts])

    useEffect(() => {
        if(woqlClient)
            setLoadingServer(false)
    }, [woqlClient])
>>>>>>> 37f95a23c4a67688a0a307941322cab2d851f4f8

    return (
        <WOQLContext.Provider
            value={{
                woqlClient,
<<<<<<< HEAD
=======
                loadingServer
>>>>>>> 37f95a23c4a67688a0a307941322cab2d851f4f8
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}
