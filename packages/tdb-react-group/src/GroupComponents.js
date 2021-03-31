import React from "react"
//import {JsonPrint} from "@terminusdb-live/react-pretty-print"
import {useGroupWorker} from "@terminusdb-live/react-worker"
import {PortalComponent} from './PortalComponent'
//import {JsonPrint} from './Child'
import {Button} from 'react-bootstrap'
import {JsonPrint} from '@terminusdb-live/react-pretty-print'

export const GroupComponents = (props) =>{
    const startData= props.startData || {}
    const config=props.config || []

    //to be review server side compilation
    const componentMatch= {"ReactPrettyPrint.JsonPrint":JsonPrint}

    const {dataProviderGroup,onElementChange,error,loading} = useGroupWorker(startData)

    const el = React.createElement;
    let domContainer
    let start
    //if(config){
     // config.forEach(function(component,index){ 
    domContainer = document.querySelector(`#component___0`);
    if(config.length === 0)return ''

    const conf0=config['0']['lib_name']

    return config.map((component,index)=>{
            const dataP= dataProviderGroup[component['resultVarName']] || {hello:'start'}

            return el(PortalComponent, {key:`portal__${index}`, component:`component___${index}`}, [
            el(componentMatch[component.lib_name], { key:`el__${index}`, onChangeFunction:onElementChange, 
                                                     startData: dataP,
                                                     resultVarName:component.resultVarName, 
                                                     onChangeEndPoint:component.onChangeEndPoint }, null)])
    })
}