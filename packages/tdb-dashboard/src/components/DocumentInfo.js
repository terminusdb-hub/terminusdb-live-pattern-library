
import React, {useEffect, useState} from "react"
import {Form, Row, Card, Col, Button} from "react-bootstrap"
import {AiOutlineDelete} from "react-icons/ai"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT, EDITOR_READ_OPTIONS, EDITOR_WRITE_OPTIONS, EDIT_DOCUMENT, GET_FRAMES_DOCUMENT, VIEW_DOCUMENT, FORM_VIEW} from "./constants"
import {DocumentControl} from "../hooks/DocumentControl"
import {ToggleJsonAndFormControl} from "./ToggleJsonAndFormControl" 
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {BiEdit, BiEditAlt} from "react-icons/bi"

import {WOQLClientObj} from '../init-woql-client'

export const DocumentInfo = () => {

    const {
        editDocument,
        documentObject,
        setDocumentObject
    } = WOQLClientObj()
    
    const {
        loading,
        reportAlert,
    } = DocumentControl()

    useEffect(() => {
        console.log("documentObject in doc info", documentObject)
    }, [documentObject])



    const DocumentContents = ({documentObject}) => {
        let contents = [], docInfo = documentObject.frames
        for (var key in docInfo) {
            contents.push(
                <Form.Group controlId={key}>
                    <Form.Label className="mr-5 text-muted fw-bold" style={{minWidth: "150px"}}>
                        {key}
                    </Form.Label>
                    <Form.Label>
                        {docInfo[key]}
                    </Form.Label>
                </Form.Group>
            )
        }
        return contents
    }

    const DocumentForm = ({documentObject}) => {
        if(documentObject.action == VIEW_DOCUMENT) return <DocumentContents documentObject={documentObject}/>
        else if (documentObject.action == EDIT_DOCUMENT) return <FrameViewer/>
        /*if(!edit) return <DocumentContents documentInfo={documentInfo}/>
        else return <FrameViewer
            frame={frame}
            mode="edit"/> */
    }

    /*const DocumentJsonView = ({documentInfo, edit, setUpdateJson}) => {
        let docInfo = documentInfo
        var options = EDITOR_READ_OPTIONS
        if(edit) options =EDITOR_WRITE_OPTIONS // on edit 
        
        const [value, setValue]=useState(false) // sets value from editor 
        
        function onUpdate(e) {
            setUpdateJson(JSON.parse(value))
        }

        return <React.Fragment>
                {!edit && <CodeMirror
                    value={JSON.stringify(docInfo, null, 2)}
                    readOnly= {true}
                    options={options}
                />}
                {edit && <React.Fragment>
                    <CodeMirror
                        value={JSON.stringify(docInfo, null, 2)}
                        options={options}
                        onChange={(editor, data, value) => {
                            setValue(value)
                            console.log("value change", value)
                        }}
                        onBlur={(editor, data) => {
                            console.log("value blur", data)
                        }}
                    />
                    <Button className="btn btn-sm mt-2 float-right" variant="info" onClick={onUpdate}>
                        <BiEditAlt className="mr-1"/>Update
                    </Button>
                </React.Fragment>
                }
        </React.Fragment>
    }*/

    //if(!documentInfo) return <div/>

    function handleClick () { // on toggle of json and form controls
        //setJsonView(!jsonView)
    }

    function handleEdit () { 
        setDocumentObject({
            action: EDIT_DOCUMENT,
            type: documentObject.type,
            view: FORM_VIEW,
            submit: false,
            currentDocument: documentObject.currentDocument,
            frames: documentObject.frames
        })
        //setEditDocument(documentInfo)
    }

    console.log("documentObject in doc info", documentObject)

    return <main className="content mr-3 ml-5 w-100">
        <Row className="w-100">
            <Col md={9}> 
                {loading && <Loading message={`Loading ${documentObject.currentDocument} ...`} type={PROGRESS_BAR_COMPONENT}/>}
                {reportAlert && reportAlert}
                <Card className="d-flex w-100">
                    <Card.Header className="d-flex w-100">
                        <h5 className="col-md-9"><strong className="text-success">{documentObject.currentDocument}</strong></h5>
                               
                        <Button className="btn btn-sm btn-light mr-2" onClick={handleEdit} title={`Edit ${documentObject.currentDocumen}`}>
                            <BiEdit className="mr-1"/> Edit
                        </Button>

                        <ToggleJsonAndFormControl onClick={handleClick}/>
                        
                        <Button className="btn btn-sm btn-danger" title={`Delete ${documentObject.currentDocumen}`}>
                            <AiOutlineDelete className="mr-1"/> Delete
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <DocumentContents documentObject={documentObject}/>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}>
            </Col>
        </Row>
    </main>
}


/*
{editDocument && <h5 className="col-md-9">Edit <strong className="text-success">{` ${chosenDocument}`}</strong></h5>}
                 

 {!jsonView && 
                            <Form>
                                <DocumentForm documentInfo={documentInfo} edit={editDocument} frame={frame}/>
                            </Form>
                        }
                        {jsonView && <DocumentJsonView documentInfo={documentInfo} edit={editDocument} setUpdateJson={setUpdateJson}/>}
               
*/                        