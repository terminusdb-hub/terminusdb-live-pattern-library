import React,{useEffect,useState} from "react"
//import {DBContextObj} from "../hooks/DBContext"
import {SchemaBuilder, modelCallServerHook, GraphObjectProvider, ViewBuilder} from "@terminusdb-live/tdb-react-components"
import {Row, Button, Card} from "react-bootstrap"
import {SCHEMA_MODEL_VIEW, SCHEMA_CLASSES_VIEW, SCHEMA_PROPERTIES_VIEW, SCHEMA_EDITOR_VIEW} from "./constants"
import {PropertiesTab} from "../components/PropertiesTab"
import {WOQLClientObj} from '../init-woql-client'
import {ClassesTab} from "../components/ClassesTab"

export const ModelBuilder = (props) =>{   
    const {woqlClient, dataProduct} = WOQLClientObj()

    //const {graphs} = DBContextObj(woqlClient, dataProduct)
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

    return <React.Fragment>
         <Row className="mt-4"><h2 className="text-success fw-bold ml-3"> {dataProduct} </h2></Row>
         <Row className="mt-5 w-100 justify-content-md-center">
            
         
            {/*<div>
                <Button title={SCHEMA_MODEL_VIEW}
                    variant="link" 
                    className="text-info mr-3"
                    onClick={(e) => setSchemaView(SCHEMA_MODEL_VIEW)}>Model</Button>
                <Button variant="link" 
                    className="m-3 text-info" 
                    title={SCHEMA_CLASSES_VIEW}
                    onClick={(e) => setSchemaView(SCHEMA_CLASSES_VIEW)}>Classes</Button>
                <Button variant="link" 
                    className="m-3 text-info" 
                    title={SCHEMA_PROPERTIES_VIEW}
                    onClick={(e) => setSchemaView(SCHEMA_PROPERTIES_VIEW)}>Properties</Button>
                {/*<Button variant="link"  // nuking OWL text editor for now
                    className="m-3 text-info" 
                    title={SCHEMA_EDITOR_VIEW}
                    onClick={(e) => setSchemaView(SCHEMA_EDITOR_VIEW)}>Text Editor</Button>}
            </div>*/}
            {(schemaView == SCHEMA_MODEL_VIEW) && <Row>
                <GraphObjectProvider mainGraphDataProvider={mainGraphDataProvider} dbName={dataProduct}>
                    <ViewBuilder saveGraph={saveData} 
                        dbName={dataProduct} 
                        custom={true}
                        saveGraph={saveData}
                        />
                </GraphObjectProvider> 
            </Row>}
            {(schemaView == SCHEMA_CLASSES_VIEW) &&  <Row>
                    <ClassesTab woqlClient={woqlClient} dataProduct={dataProduct}/>
                </Row>
            }
            {(schemaView == SCHEMA_PROPERTIES_VIEW) && <Row>
                <PropertiesTab woqlClient={woqlClient} graph={"schema"}/>
            </Row>}
        </Row>
        
    </React.Fragment> 
}