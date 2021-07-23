import React, { useState, useEffect } from "react"
import {Row, Form, Col} from "react-bootstrap"
import {FaStarOfLife} from "react-icons/fa"
import {WOQLClientObj} from '../init-woql-client'
import { CREATE_DOCUMENT, EDIT_DOCUMENT } from "./constants"

// data type frame is usualy xsd or xdd datatype and is required to be filled
export const DataTypeFrame = ({property, type, onChange}) => {
 
    const {
        documentObject,
        setDocumentObject,
    } = WOQLClientObj()

    return <Form.Group as={Col} md="12" controlId={property}>
        <Form.Label><FaStarOfLife className="mr-2 text-warning mandatory-icon"/>{property}</Form.Label>

        {(documentObject.action == CREATE_DOCUMENT) && <Form.Control
            required
            type="text"
            placeholder={type}
            onChange={onChange}
        />}

        {(documentObject.action == EDIT_DOCUMENT) && documentObject.frames && (documentObject.frames[property]) && <Form.Control
            required
            type="text"
            placeholder={type}
            defaultValue={documentObject.frames[property]}
            onChange={onChange}
        />}

        {/*(documentObject.action == EDIT_DOCUMENT) && documentObject.frames && (!documentObject.frames[property]) && <Form.Control
            required   // not sure if this check is required
            type="text"
            placeholder={type}
            defaultValue={documentObject.frames[property]}
            onChange={onChange}
        />*/}
        
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
            {`Please provide a valid ${property}.`}
        </Form.Control.Feedback>
    </Form.Group>
    
}
