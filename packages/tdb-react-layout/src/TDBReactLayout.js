import React from "react"
import {useWorker} from "@terminusdb-live/react-worker"
import {Row, Col} from '@themesberg/react-bootstrap';
import {TDBReactCard} from './TDBReactCard'
import {TDBReactCardList} from './TDBReactCardList'  
  
export const TDBReactLayout = (props) =>{
    if(!props.config)return ''
    const startData= props.startData || []
    const config=props.config.cards || {}
    const display=props.config.display || 'Card'
    const size=props.config.size || 2

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
            let cConfig = {title: config[key].title, icon: config[key].icon, size: size}
            let data = extractFromBindings(id)
            if(display == "Card")
                children.push(<TDBReactCard config={cConfig} key={`Count_${key}`} dataProvider={data}/>)
            else children.push(<TDBReactCardList config={cConfig} key={`Count_List_${key}`} dataProvider={data}/>)
        }
        
        return <React.Fragment>
            {display == "List" && <>{children}</>}
            {display == "Card" && <Row className="justify-content-md-center">
                {children}
            </Row>}
        </React.Fragment>
    }
    return <div>LOADING</div> 
}

