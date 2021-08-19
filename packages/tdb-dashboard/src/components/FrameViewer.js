import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {Form, Button, Row, Col, InputGroup} from "react-bootstrap"
import {BiPlus,BiEditAlt} from "react-icons/bi"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT, NEW_OBJECT, CREATE_DOCUMENT, EDIT_DOCUMENT} from "./constants"
import {EnumTypeFrame} from "./EnumTypeFrame"
import {RenderFrameProperties} from "./RenderFrameProperties"
import { v4 as uuidv4 } from 'uuid'
import {DocumentControlObj} from '../hooks/DocumentControlContext'

export const FrameViewer = () => { 

    const {
        documentClasses
    } = WOQLClientObj() //documentObjectWithFrames

    const {
        documentObject,
        setDocumentObject,
        documentObjectWithFrames
    } = DocumentControlObj()

    //const [currentFrame, setCurrentFrame]=useState(false)
    const [formFields, setFormFields] = useState({})
    const [validated, setValidated] = useState(false)

    useEffect(() => {
        setValidated(false)
    }, [documentObject.type])
 

    useEffect(() => {
        //console.log("documentObject", documentObject)
        //if(documentObject.action == CREATE_DOCUMENT) setCurrentFrame (documentObject.frames)
        if(documentObject.action == EDIT_DOCUMENT) {
            //setCurrentFrame (documentObject.frames)
            setFormFields(documentObject.filledFrame)
        }
    }, [documentObject.frames, documentObject.filledFrame])

    function handleChange(e) { // gather all form fields inputs on change
        setFormFields({
            ...formFields,
            [e.target.id]: e.target.value
          }) 
    }

    function handleSelect(id, value) { // gather all form fields select on change
        setFormFields({
            ...formFields,
            [id]: value
          })
    }

    function handleSetSelect(id, arr) {
        setFormFields({
            ...formFields,
            [id]: arr
          })
    }

    function handleCreateDocument () {
        formFields["@type"]=documentObject.type
        setDocumentObject({
            action: CREATE_DOCUMENT,
            type: documentObject.type,
            view: documentObject.view,
            submit: true,
            frames: formFields,
            filledFrame: {},
            message: false,
            update: false,
            loading: <Loading message={`Creating new ${documentObject.type} ...`} type={PROGRESS_BAR_COMPONENT}/>
        })
    }

    function handleUpdateDocument () {
        formFields["@type"]=documentObject.type
        setDocumentObject({
            action: EDIT_DOCUMENT,
            type: documentObject.type,
            view: documentObject.view,
            submit: true,
            frames: formFields,
            filledFrame: documentObjectWithFrames.filledFrame,
            message: false,
            update: false,
            loading: <Loading message={`Updating ${documentObjectWithFrames.filledFrame["@id"]} ...`} type={PROGRESS_BAR_COMPONENT}/>
        })
    }

    
    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        else {
            if(documentObject.action==CREATE_DOCUMENT) handleCreateDocument()
            else handleUpdateDocument()
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
       
      }


    return <React.Fragment> 
        {documentObject.message && documentObject.message}
        <Form  noValidate validated={validated} onSubmit={handleSubmit}>
            {/*documentObject.loading && documentObject.loading*/}
            {/*currentFrame && renderProperties(currentFrame)*/} 
            {documentObjectWithFrames.frames && <RenderFrameProperties documentObject={documentObjectWithFrames} 
                documentClasses={documentClasses} 
                handleChange={handleChange}
                handleSelect={handleSelect}
                handleSetSelect={handleSetSelect} 
                setFormFields={setFormFields}
                formFields={formFields}
                propertyID={uuidv4()}/>}
            {
                documentObject.action==CREATE_DOCUMENT && 
                    <Button type="submit" className="btn btn-sm mt-2 float-right" variant="info">
                        <BiPlus className="mr-1"/>Create
                    </Button>
            }
            {
                documentObject.action==EDIT_DOCUMENT && <React.Fragment>
                    <Button type="submit" className="btn btn-sm mt-2 float-right" variant="info">
                            <BiEditAlt className="mr-1"/>Update
                    </Button>
                </React.Fragment>
            }
        </Form>
    </React.Fragment>

}
