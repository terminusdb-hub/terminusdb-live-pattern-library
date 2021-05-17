import React,{useEffect,useState} from "react"
import {DBGraphs} from "../../Hooks/DBContext"
import {SchemaBuilder, modelCallServerHook, GraphObjectProvider} from "@terminusdb/terminusdb-react-components"

export const ModelBuilder = ({woqlClient}) =>{   
    

    let {graphs} =  DBGraphs(woqlClient)

    console.log("graphs", graphs)
    let branch = "main"
    let ref = ""

    let dbName = woqlClient ? woqlClient.db() : ''

    const saveData=(query, commitMessage)=>{
        //saveGraphChanges(query,commitMessage)
        console.log("query", query)
        console.log("commitMessage", commitMessage)
    }

    const {mainGraphDataProvider,
        saveGraphChanges,
        reportMessage,
        callServerLoading,
        resetReport
    } = modelCallServerHook(woqlClient, branch, ref)
    
    return <React.Fragment>
        
        <GraphObjectProvider mainGraphDataProvider={mainGraphDataProvider} dbName={dbName}>
            <SchemaBuilder saveGraph={saveData} dbName={dbName} splitPane={false}/>
        </GraphObjectProvider> 
    </React.Fragment>   
}