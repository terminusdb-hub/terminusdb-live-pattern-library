import React from "react"
import {Row, Form, Col} from "react-bootstrap"
import {printts, checkIfObject} from "./utils"
import {RenderFrameProperties} from "./RenderFrameProperties"
import {WOQLClientObj} from '../init-woql-client'
import { v4 as uuidv4 } from 'uuid'
import {FORM_VIEW, JSON_VIEW, EDIT_DOCUMENT, CREATE_DOCUMENT} from "./constants"

// this is optional field
export const OptionalFrames = ({documentObject, propertyID, property, object, onChange}) => {

    const {
        documentClasses
    } = WOQLClientObj()


    const ObjectFrameViewer = () => {
        let documentFrame=object["@class"]
        let newDocumentObject={
            action: CREATE_DOCUMENT,
            type: property,
            view: FORM_VIEW,
            submit: false,
            frames: documentFrame,
            filledFrame: {},
            message: false
        }
        
        return <RenderFrameProperties 
            documentObject={newDocumentObject} 
            documentClasses={documentClasses}
            propertyID={propertyID}
        />
    } 

    const DataFrameViewer = ({onChange}) => { // for type {@class: "xsd:dateTime", @type: "Optional"}
        return <React.Fragment>
            {(documentObject.action == CREATE_DOCUMENT) &&  <Form.Control 
                placeholder={object["@class"]} 
                type="text"
                onBlur={(e) => onChange(e, propertyID)}/>}

            {(documentObject.action == EDIT_DOCUMENT) &&  documentObject.frames 
                && (documentObject.filledFrame[property]) && <Form.Control 
                placeholder={object["@class"]} 
                type="text"
                defaultValue={documentObject.filledFrame[property]}
                onBlur={(e) => onChange(e, propertyID)}/>}
            
            {(documentObject.action == EDIT_DOCUMENT) &&  documentObject.frames 
                && !(documentObject.filledFrame[property]) && <Form.Control 
                placeholder={object["@class"]} 
                type="text"
                onBlur={(e) => onChange(e, propertyID)}/>}

        </React.Fragment> 
    }

    

    return <Form.Group as={Col} md="12" controlId={property}>
        <Form.Label>{property}</Form.Label>

        {!checkIfObject(object["@class"]) && <DataFrameViewer onChange={onChange}/>}
        {checkIfObject(object["@class"]) && <ObjectFrameViewer/>}

    </Form.Group>
}


/*
{(documentObject.action == CREATE_DOCUMENT) && !checkIfObject(object["@class"]) && <Form.Control 
            placeholder={object["@class"]} 
            type="text"
            onChange={onChange}
            onBlur={(e) => onChange(e, propertyID)}/>
        }

        {(documentObject.action == CREATE_DOCUMENT) && checkIfObject(object["@class"]) && <RenderFrameProperties 
            documentObject={object["@class"]} 
            documentClasses={documentClasses}
            propertyID={uuidv4()}
        />}

        {(documentObject.action == EDIT_DOCUMENT) && !checkIfObject(object["@class"]) && 
            documentObject.frames && (documentObject.filledFrame[property]) && <Form.Control 
            placeholder={object["@class"]} 
            type="text"
            defaultValue={documentObject.filledFrame[property]}
            onChange={onChange}
            onBlur={(e) => onChange(e, propertyID)}/>
        }
*/