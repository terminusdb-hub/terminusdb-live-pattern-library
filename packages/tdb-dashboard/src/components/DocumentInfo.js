
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
import {DocumentControlObj} from '../hooks/DocumentControlContext'
import {
    CollapsibleComponent,
    CollapsibleHead,
    CollapsibleContent
} from "react-collapsible-component"

export const DocumentInfo = () => {

    const {
        woqlClient
    } = WOQLClientObj()

    const {
        documentObjectWithFrames,
        documentObject,
        setDocumentObject
    } = DocumentControlObj()

    const [currentView, setCurrentView]=useState(documentObject.view)
    
    const FormField = ({id, val}) => {
        return <Form.Group as={Col} md="12" controlId={id} className="ml-5" style={{marginLeft: "100px !important"}}>
            {(id != "@id") && <React.Fragment>
                <Form.Label className="mr-5 text-muted fw-bold" style={{minWidth: "150px"}}>
                    {id}
                </Form.Label>
                <Form.Label>
                    {val}
                </Form.Label>
            </React.Fragment>}
            {(id == "@id") && <div className="subdoc-block d-flex">
                <span className="p-1 bg-secondary idfield">
                    {id}
                </span>
                <Form.Label>
                    {val}
                </Form.Label>
            </div>}
                        
            
        </Form.Group>
    }

    const DocumentContents = ({documentObject, currentView}) => {
        if (currentView == JSON_VIEW) return <JsonDocument documentObject={documentObject}/>
        return <DocumentForm docInfo={documentObject.filledFrame}/>
    } 


    const showSubDocument = (subDoc, contents) => {

        if(!subDoc["@id"]){
            contents.push(
                <Row className="ml-5">
                    <Form.Group as={Col} md="12" controlId={subDoc} className="ml-5">
                        <Form.Label className="mr-5" style={{minWidth: "150px"}}>
                            {subDoc}
                        </Form.Label>
                    </Form.Group>
                </Row>
            )
        }
        else {
            contents.push(
                <Row className="ml-5">
                    <DocumentForm docInfo={subDoc}/>
                </Row>
            )
        } 
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
            else { // is Json true would mean this can be subdoc
                let subDoc = docInfo[key] 
                contents.push(<Form.Group as={Col} md="12" controlId={key} className="ml-5">
                    <Form.Label className="mr-5 text-muted fw-bold" style={{minWidth: "150px"}}>
                        {key}
                    </Form.Label>
                </Form.Group>
                )
               
                if(Array.isArray(subDoc)){ // can be a list/set of subdocuments
                    subDoc.map( thing => {
                        showSubDocument(thing, contents)
                    })
                }
                else { // can be a single subdocument
                    showSubDocument(subDoc, contents)
                }
                
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
        let docObj = documentObjectWithFrames
        docObj.view=view
        setCurrentView(view)
        setDocumentObject(docObj)
    }

    function onDelete () {
        deleteDocument(woqlClient, setDocumentObject, documentObject)
    }

    function handleEdit () { 
        setDocumentObject({
            action: EDIT_DOCUMENT,
            type: documentObjectWithFrames.type,
            view: documentObject.view,
            submit: false,
            currentDocument: documentObjectWithFrames.currentDocument,
            frames: documentObjectWithFrames.frames,
            filledFrame: documentObjectWithFrames.filledFrame,
            update:false
        })
    }


    return <main className="content mr-3 ml-5 w-100">
        <Row className="w-100 mb-5">  
            <Col md={11}> 
                {documentObjectWithFrames.message && documentObjectWithFrames.message}
                <Card className="d-flex w-100">
                    {documentObjectWithFrames.loading && documentObjectWithFrames.loading}
                    <Card.Header className="d-flex w-100">
                        <span className="float-left">
                            <h5><strong className="text-success">{documentObjectWithFrames.currentDocument}</strong></h5>
                        </span>    
                        <span className="w-100 float-right">  
                            <Button className="float-right btn btn-sm btn-light mr-2 text-dark" onClick={handleEdit} title={`Edit ${documentObjectWithFrames.currentDocumen}`}>
                                <BiEdit className="mr-1"/> Edit
                            </Button>

                            <Button className="float-right btn btn-sm btn-danger mr-2" title={`Delete ${documentObjectWithFrames.currentDocument}`} onClick={onDelete}>
                                <AiOutlineDelete className="mr-1"/> Delete
                            </Button>

                            <ToggleJsonAndFormControl onClick={handleClick} documentObject={documentObjectWithFrames}/>
                            
                        </span>
                    
                    </Card.Header>
                    <Card.Body> 
                        <Form>
                            {currentView && <DocumentContents documentObject={documentObjectWithFrames} currentView={currentView}/>}
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </main>
}


