import React from "react"
import {useWorker} from "@terminusdb-live/react-worker"
import {TDBReactButton} from "./TDBReactButton"
import {Col} from '@themesberg/react-bootstrap'

export const TDBReactButtonGroup= (props) =>{

    
    const startData= props.startData || []
    const config = props.config.buttons || {}
    const display = props.config.display || "Vertical"
    var displayCss;
    (display == "Vertical") ? displayCss = "tdb-btn-group-vertical" : displayCss = "tdb-btn-group-horizontal" 

    const {onChange, error, loading, dataProvider} = useWorker(startData, props.onLoad, false)

    let buttons=[]

    if(dataProvider.length>0){

        function extractFromBindings(id, curItem){
            for(var key in dataProvider){
                let repoId = dataProvider[key].Repository
                if(repoId == id){
                    let label = dataProvider[key].Label
                    return {title: label, id: repoId, icon: curItem.icon, size: curItem.size}
                }
            }
            return {}
        }
    
        for (var key in config) {
            let id = config[key].id 
            let extracted = extractFromBindings(id, config[key])
            buttons.push(<TDBReactButton config={extracted} key={`tdbButton_${extracted.title}`}/>)
        }

        return <React.Fragment>
            <Col xl={2} className={displayCss}>
                {buttons}
            </Col>
        </React.Fragment>
    }

    return <div>LOADING</div> 
}
