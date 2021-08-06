import React, {useState, useEffect } from "react"
import {WOQLClientObj} from '../init-woql-client'
import {Row, Form, Col} from "react-bootstrap"
import {getSubDocumentFrame} from "../hooks/DocumentControl"
import {SubDocumentFrameViewer} from "./SubDocumentFrameViewer"

export const SubDocumentTypeFrame = ({property, type, setFormFields, formFields}) => {
    const [documentFrame, setDocumentFrame]=useState(false)

    const {
        woqlClient
    } = WOQLClientObj()

    
    useEffect(() => { // get all instances of type to display in select
        if (!type) return
        getSubDocumentFrame (woqlClient, type["@class"]["@class"], setDocumentFrame)
    }, [type])

    return <Form.Group as={Col} md="12" controlId={property}>
        <Form.Label>{property}</Form.Label>
        {documentFrame && <SubDocumentFrameViewer 
            property={property} 
            documentFrame={documentFrame}
            setFormFields={setFormFields}
            formFields={formFields}/>}
    </Form.Group>
}