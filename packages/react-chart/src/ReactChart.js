import React from "react"
import {useWorker} from "@terminusdb-live/react-worker"
import {ChartComponent} from "@terminusdb/terminusdb-react-chart"
export function ReactChart(props){
    const startData= props.startData || {}
    const config=props.config || {}

    const {onChange,error,loading,dataProvider} = useWorker(startData,props.onLoad)
//only for test the style in external file
    return  <ChartComponent config={config} dataProvider={dataProvider} />
 }