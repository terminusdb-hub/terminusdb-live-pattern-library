import React, { useState, useEffect } from "react"
import {Row, Form, Col} from "react-bootstrap"
import {FaStarOfLife} from "react-icons/fa"
import {DocumentControl} from "../hooks/DocumentControl"

// data type frame is usualy xsd or xdd datatype and is required to be filled
export const DataTypeFrame = ({property, type, mode, onChange}) => {

    const {
        currentDocumentInfo
    } = DocumentControl()


    return <Form.Group as={Col} md="12" controlId={property}>
        <Form.Label>{property}</Form.Label>

        {(mode!=="edit") && <Form.Control
            required
            type="text"
            placeholder={type}
            onChange={onChange}
        />}
        
        {(mode=="edit") && currentDocumentInfo && currentDocumentInfo[property] && <Form.Control
                required
                type="text"
                placeholder={type}
                defaultValue={currentDocumentInfo[property]}
                onChange={onChange}
            />}

        {(mode=="edit") && currentDocumentInfo && !currentDocumentInfo[property] && <Form.Control
                required
                type="text"
                placeholder={type}
                onChange={onChange}
            />}

        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
            {`Please provide a valid ${property}.`}
        </Form.Control.Feedback>
    </Form.Group>
    
}
