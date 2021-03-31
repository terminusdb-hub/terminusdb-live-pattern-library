import React from "react"
import {useWorker} from "@terminusdb-live/react-worker"
import {Row} from '@themesberg/react-bootstrap';
import {TDBReactCard} from '@terminusdb-live/tdb-react-layout';

export const TDBReactLayout = (props) =>{
    const startData= props.startData || []
    const config=props.config || {}

    const {onChange, error, loading, dataProvider} = useWorker(startData, props.onLoad, false)

    let children=[]

    if(dataProvider.length>0){
        function extractFromBindings(id){
            for(var key in dataProvider[0]){
                if(key == id){
                    return dataProvider[0][key]
                }
            }
            return 0
        }
    
        for (var key in config) {
            let id = config[key].id 
            let cConfig = {title: config[key].title, icon: config[key].icon}
            let data = extractFromBindings(id)
            children.push(<TDBReactCard config={cConfig} key={`Count_${key}`} dataProvider={data}/>)
        }
        
        return <Row className="justify-content-md-center">
            {children}
        </Row>
    }
    return <div>LOADING</div> 
}

