import React from "react"
import {Row, Form, Col} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {printts} from "./utils"

// this is optional field
export const OptionalFrames = ({property, object, onChange, mode}) => {

    const {
        currentDocumentInfo
    } = DocumentControl()

    const FilledFormFields = ({onChange, property, type, currentDocumentInfo}) => {
        // get match of filed fields in frames
        for (var item in currentDocumentInfo){
            if(item == property) {
                return <Form.Control value={currentDocumentInfo[property]} onChange={onChange}/>
            }
        }

        return  <Form.Control placeholder={type} onChange={onChange}/>
    }


    return  <Form.Group as={Col} md="12" controlId={property}>
        <Form.Label>{property}</Form.Label>

        {(mode!=="edit") && <Form.Control 
            placeholder={object["@class"]} 
            type="text"
            onChange={onChange}/>}

        {(mode=="edit") && currentDocumentInfo && <FilledFormFields 
            onChange={onChange} 
            property={property} 
            type={object["@class"]} 
            currentDocumentInfo={currentDocumentInfo}/>}

    </Form.Group>
}