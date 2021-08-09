import React, { useState, useEffect } from "react"
import {Row, Form, Col} from "react-bootstrap"
import {FaStarOfLife} from "react-icons/fa"
import { CREATE_DOCUMENT, EDIT_DOCUMENT } from "./constants"
import {DocumentationTypeFrame} from "./DocumentationTypeFrame"

// data type frame is usualy xsd or xdd datatype and is required to be filled
export const DataTypeFrame = ({documentObject, property, propertyID, type, onChange}) => {
 
    return <Form.Group as={Col} md="12" controlId={property}>
        <Form.Label className="w-100">
            <FaStarOfLife className="mr-2 text-warning mandatory-icon"/>{property}
            <DocumentationTypeFrame documentObject={documentObject} property={property}/>
        </Form.Label>

        {/* Create document */}
        {(documentObject.action == CREATE_DOCUMENT) && <Form.Control
            required
            type="text"
            placeholder={type}
            onBlur={(e) => onChange(e, propertyID)}
        />}
        
        {/* Edit document where property exists in filled frames, show default value */}
        {(documentObject.action == EDIT_DOCUMENT) && documentObject.frames && (documentObject.filledFrame[property]) && (documentObject.frames["@key"]["@fields"][0]!==property) && <Form.Control
            required
            type="text"
            placeholder={type}
            defaultValue={documentObject.filledFrame[property]}
            onBlur={(e) => onChange(e, propertyID)}
        />}

        {/* Edit document where property dosent exist in filled frames, show placeholder */}
        {(documentObject.action == EDIT_DOCUMENT) && documentObject.frames && (!documentObject.filledFrame[property]) && (documentObject.frames["@key"]["@fields"][0]!==property) && <Form.Control
            required
            type="text"
            placeholder={type}
            onBlur={(e) => onChange(e, propertyID)}
        />}
        
         {/* Edit document make id field appear read only */}
        {(documentObject.action == EDIT_DOCUMENT) && documentObject.frames && (documentObject.frames["@key"]["@fields"][0]===property) && <React.Fragment>
            <Form.Control
                required
                type="text"
                placeholder={type}
                defaultValue={documentObject.filledFrame[property]}
                readOnly 
            />
            </React.Fragment>}
        

        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
            {`Please provide a valid ${property}.`}
        </Form.Control.Feedback>
    </Form.Group>
    
}
