import React from "react"
import {useWorker} from "@terminusdb-live/react-worker"
export function JsonPrint(props){
    const startData= props.startData || {}

    const {onChange,error,loading,dataProvider} = useWorker(startData,props.onLoad)
//only for test the style in external file
    return (<div style={{minHeight:"200px",minWidth:"100px",marginBottom:"50px",border:"1px solid black"}}>
     <pre>
       {JSON.stringify(dataProvider, null, 2) }
     </pre>
   </div>)
 }
