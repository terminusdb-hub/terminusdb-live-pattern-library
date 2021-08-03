
import React, {useState, useEffect} from "react"
import {ListGroup} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {getCountOfDocumentClass, getTotalNumberOfDocuments} from "../queries/GeneralQueries"
import {executeQueryHook} from "../hooks/executeQueryHook"
import {WOQLClientObj} from '../init-woql-client'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import {JsonViewer} from "./JsonViewer"

export const DocumentSummary = () => {
  

    const {
        perDocumentCount, 
        totalDocumentCount, 
        documentObject
    } = WOQLClientObj()

    const DocumentStats = ({dataProvider}) => {
        let arr=[]
        for (var key in dataProvider[0]) { 
            let val = dataProvider[0][key]["@value"]
            arr.push(
                <ListGroup.Item className="d-flex">
                    <h6 className="text-muted fw-bold col-md-11">{key}</h6>
                    <h6 className="float-right">{val}</h6>
                </ListGroup.Item>
            )
        }
        return arr
    }

    const TotalDocuments = ({dataProviderCount}) => {
        var count =0
        for (var key in dataProviderCount[0]) { 
            if(key == "Count") {
                count = dataProviderCount[0][key]["@value"]
            }
        }

        return <span className="d-flex "> 
            <h6 className="text-muted fw-bold mr-2 mb-2">Total Documents</h6>
            <h6 className="float-right">{count}</h6>
        </span>
    }

    function onChange() {

    }

    return <React.Fragment>
            <ListGroup className="col-md-12">
                {totalDocumentCount && <TotalDocuments dataProviderCount={totalDocumentCount}/>}
                {perDocumentCount && <DocumentStats dataProvider={perDocumentCount}/>}
            </ListGroup>
            {/*documentObject.type && <Accordion className="mt-3 ml-5" onChange={onChange}>
                <AccordionItem key={documentObject.type} uuid={documentObject.type}>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            {`Look up for ${documentObject.type}`}
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        {documentObject.update && documentObject.frames && <JsonViewer json={JSON.stringify(documentObject.frames, null, 2)}/>}
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>*/}
        </React.Fragment>
}