import React from "react"
import {useWorker} from "@terminusdb-live/react-worker"
import {TableComponent} from '@terminusdb/terminusdb-react-table';

export const TDBReactTable = (props) =>{
    const startData= props.startData || []
    const config=props.config || {}

    const {onChange,error,loading,dataProvider} = useWorker(startData,props.onLoad)


//only for test the style in external file
    if(config){
        return  <TableComponent columns={config.columns} data={dataProvider} />
    }
    return <div>LOADING</div>
 }
