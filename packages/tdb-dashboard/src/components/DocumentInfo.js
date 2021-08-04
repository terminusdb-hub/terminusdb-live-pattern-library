
import React, {useEffect, useState} from "react"
import {Form, Row, Card, Col, Button} from "react-bootstrap"
import {AiOutlineDelete} from "react-icons/ai"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT, EDITOR_READ_OPTIONS, JSON_VIEW, EDIT_DOCUMENT, GET_FRAMES_DOCUMENT, VIEW_DOCUMENT, FORM_VIEW} from "./constants"
import {deleteDocument} from "../hooks/DocumentControl"
import {ToggleJsonAndFormControl} from "./ToggleJsonAndFormControl" 
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {BiEdit, BiEditAlt} from "react-icons/bi"
import {checkIfObject} from "./utils"
import {WOQLClientObj} from '../init-woql-client'

export const DocumentInfo = () => {

    const {
        editDocument,
        documentObject,
        setDocumentObject,
        woqlClient
    } = WOQLClientObj()
    
    const FormField = ({id, val}) => {
        return <Form.Group as={Col} md="12" controlId={id} className="ml-5" style={{marginLeft: "100px !important"}}>
            <Form.Label className="mr-5 text-muted fw-bold" style={{minWidth: "150px"}}>
                {id}
            </Form.Label>
            <Form.Label>
                {val}
            </Form.Label>
        </Form.Group>
    }

    const DocumentContents = ({documentObject}) => {
        if (documentObject.view == JSON_VIEW) return <JsonDocument documentObject={documentObject}/>
        return <DocumentForm docInfo={documentObject.filledFrame}/>
    } 

    

    const DocumentForm = ({docInfo}) => {
        let contents = []
        for (var key in docInfo) {
            let isJson = checkIfObject(docInfo[key]) // review method of checking if sub document 
            if(!isJson) {
                contents.push(
                    <FormField id={key} val={docInfo[key]}/>
                )
            }
            else { // is Json true would mean this can be
                let subDoc = docInfo[key] 
                contents.push(<Form.Group as={Col} md="12" controlId={key} className="ml-5">
                    <Form.Label className="mr-5 text-muted fw-bold" style={{minWidth: "150px"}}>
                        {key}
                    </Form.Label>
                </Form.Group>
                )
                subDoc.map( thing => {
                    if(!thing["@id"]){
                        contents.push(
                            <Row className="ml-5">
                                <Form.Group as={Col} md="12" controlId={thing} className="ml-5">
                                    <Form.Label className="mr-5" style={{minWidth: "150px"}}>
                                        {thing}
                                    </Form.Label>
                                </Form.Group>
                            </Row>
                        )
                    }
                    else {
                        contents.push(
                            <Row className="ml-5">
                                <DocumentForm docInfo={thing}/>
                            </Row>
                        )
                    }
                })
            }
        }
        return contents
    }
    //<FormField id={item} val={thing}/>

    const JsonDocument = ({documentObject}) => {
        let docInfo = documentObject.filledFrame
        var options = EDITOR_READ_OPTIONS
        
        const [value, setValue]=useState(false) // sets value from editor 
        
    
        return <React.Fragment>
            <CodeMirror
                value={JSON.stringify(docInfo, null, 2)}
                options={options}
            />
        </React.Fragment>
    }


    function handleClick (view) { // on toggle of json and form controls
        setDocumentObject({
            action: documentObject.action,
            type: documentObject.type,
            view: view,
            submit: false,
            currentDocument: documentObject.currentDocument,
            frames: documentObject.frames,
            filledFrame: false,
            update: Date.now()
        })

    }

    function onDelete () {
        deleteDocument(woqlClient, setDocumentObject, documentObject)
    }

    function handleEdit () { 
        setDocumentObject({
            action: EDIT_DOCUMENT,
            type: documentObject.type,
            view: documentObject.view,
            submit: false,
            currentDocument: documentObject.currentDocument,
            frames: documentObject.frames,
            filledFrame: documentObject.filledFrame,
            update: Date.now()
        })
    }


    return <main className="content mr-3 ml-5 w-100">
        <Row className="w-100">  
            <Col md={11}> 
                {documentObject.message && documentObject.message}
                <Card className="d-flex w-100">
                    {documentObject.loading && documentObject.loading}
                    <Card.Header className="d-flex w-100">
                        <h5 className="col-md-9"><strong className="text-success">{documentObject.currentDocument}</strong></h5>
                               
                        <Button className="btn btn-sm btn-light mr-2" onClick={handleEdit} title={`Edit ${documentObject.currentDocumen}`}>
                            <BiEdit className="mr-1"/> Edit
                        </Button>

                        <Button className="btn btn-sm btn-danger" title={`Delete ${documentObject.currentDocument}`} onClick={onDelete}>
                            <AiOutlineDelete className="mr-1"/> Delete
                        </Button>

                        <ToggleJsonAndFormControl onClick={handleClick} documentObject={documentObject}/>
                        
                    
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            {documentObject.view && documentObject.update && <DocumentContents documentObject={documentObject}/>}
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </main>
}


