import React from "react"
import {useWorker} from "@terminusdb-live/react-worker"
import {ChartComponent} from '@terminusdb/terminusdb-react-chart';

export const ReactChart = (props) =>{
    const startData= props.startData || []
    const config=props.config || {}
    
    const {onChange,error,loading,dataProvider} = useWorker(startData,props.onLoad)

    
//only for test the style in external file
    //if(dataProvider.length>0){
      //  return  <ChartComponent config={config} dataProvider={dataProvider} />
    //}
    return <div>LOADING</div>
 }