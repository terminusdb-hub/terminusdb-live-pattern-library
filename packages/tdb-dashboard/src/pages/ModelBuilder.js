import React,{useEffect,useState} from "react"
import {SchemaBuilder, modelCallServerHook, GraphObjectProvider, ViewBuilder} from "@terminusdb-live/tdb-react-components"
import {Row, Button, Card} from "react-bootstrap"
import {SCHEMA_MODEL_VIEW, SCHEMA_CLASSES_VIEW, SCHEMA_PROPERTIES_VIEW, SCHEMA_EDITOR_VIEW} from "./constants"
import {PropertiesTab} from "../components/PropertiesTab"
import {WOQLClientObj} from '../init-woql-client'
import {ClassesTab} from "../components/ClassesTab"

export const ModelBuilder = (props) =>{   
    const {woqlClient, dataProduct} = WOQLClientObj()

    const [width, setWidth] = useState("")
    const [schemaView, setSchemaView] = useState(SCHEMA_MODEL_VIEW)

    let branch = "main"
    let ref = ""

    const saveData=(query, commitMessage)=>{
        saveGraphChanges(query, commitMessage)
    }

    const {mainGraphDataProvider,
        saveGraphChanges,
        reportMessage,
        callServerLoading,
        resetReport
    } = modelCallServerHook(woqlClient, branch, ref,dataProduct)

    if(!dataProduct) return <div>error in loading graph</div>


    /*
    <Row>
         <h2 className="text-success fw-bold ml-3"> 
            {dataProduct} 
         </h2>
         </Row>*/
    return <React.Fragment>
            {dataProduct && (schemaView == SCHEMA_MODEL_VIEW) && 
                <GraphObjectProvider mainGraphDataProvider={mainGraphDataProvider} dbName={dataProduct}>
                    <ViewBuilder saveGraph={saveData} 
                        dbName={dataProduct} 
                        custom={true}
                        saveGraph={saveData}
                        /> 
                </GraphObjectProvider> 
           }
          </React.Fragment> 
}

//maybe we don't need this 

/*
 {(schemaView == SCHEMA_CLASSES_VIEW) &&  <Row>
                    <ClassesTab woqlClient={woqlClient} dataProduct={dataProduct}/>
                </Row>
            }
            {(schemaView == SCHEMA_PROPERTIES_VIEW) && <Row>
                <PropertiesTab woqlClient={woqlClient} graph={"schema"}/>
            </Row>}*/