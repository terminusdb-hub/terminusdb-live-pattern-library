import React,{useEffect,useState} from "react"
import {DBGraphs} from "../../hooks/DBContext"
import {SchemaBuilder, modelCallServerHook, GraphObjectProvider, ViewBuilder} from "@terminusdb/terminusdb-react-components"
import {Row, Button} from "@themesberg/react-bootstrap"
import {SCHEMA_MODEL_VIEW, SCHEMA_CLASSES_VIEW, SCHEMA_PROPERTIES_VIEW, SCHEMA_EDITOR_VIEW} from "../constants"
import {PropertiesTab} from "../../components/PropertiesTab"

export const ModelBuilder = ({woqlClient, dataProductId}) =>{   
    

    let {graphs} =  DBGraphs(woqlClient)
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
    } = modelCallServerHook(woqlClient, branch, ref)


    return <main className="content mr-3 ml-5 w-100">
        <Row className={"w-100"}>
            <h4>Connected to  - {dataProductId}</h4>
        </Row>
        <div>
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
            <Button variant="link" 
                className="m-3 text-info" 
                title={SCHEMA_EDITOR_VIEW}
                onClick={(e) => setSchemaView(SCHEMA_EDITOR_VIEW)}>Text Editor</Button>
        </div>
        {(schemaView == SCHEMA_MODEL_VIEW) && <Row>
            <GraphObjectProvider mainGraphDataProvider={mainGraphDataProvider} dbName={dataProductId}>
                <ViewBuilder saveGraph={saveData} 
                    dbName={dataProductId} 
                    custom={true}
                    saveGraph={saveData}
                    />
            </GraphObjectProvider> 
        </Row>}
        {(schemaView == SCHEMA_PROPERTIES_VIEW) && <Row>
            <PropertiesTab woqlClient={woqlClient} graph={"schema"}/>
        </Row>}
        
    </main> 
}