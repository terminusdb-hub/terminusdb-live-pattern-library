import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {isDataType, isClassType, isSetType, isOptionalType, isEnumType, isSubDocumentType} from "./utils"
import {Form, Button, Row, Col, InputGroup} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {BiPlus,BiEditAlt} from "react-icons/bi"
import {DataTypeFrame} from "./DataTypeFrame"
import {ClassTypeFrame} from "./ClassTypeFrame"
import {ClassSetTypeFrame} from "./ClassSetTypeFrame"
import {OptionalFrames} from "./OptionalFrames"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT, NEW_OBJECT, CREATE_DOCUMENT, EDIT_DOCUMENT} from "./constants"
import {EnumTypeFrame} from "./EnumTypeFrame"
import {SubDocumentTypeFrame} from "./SubDocumentTypeFrame"

export const FrameViewer = () => {

    const {
        documentObject,
        setDocumentObject
    } = WOQLClientObj()

    const {
        loading,
        reportAlert,
        documentClasses,
        frame
    } = DocumentControl()

    const [currentFrame, setCurrentFrame]=useState(false)
    const [formFields, setFormFields] = useState({"@type": documentObject.type})

    console.log("formFields", formFields)

    useEffect(() => {
        if(documentObject.action == CREATE_DOCUMENT) setCurrentFrame (documentObject.frames)
        if(documentObject.action == EDIT_DOCUMENT) setCurrentFrame (frame)
    }, [documentObject, frame])

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
        setDocumentObject({
            action: CREATE_DOCUMENT,
            type: documentObject.type,
            view: false,
            submit: true,
            frames: formFields
        })
    }

    function handleUpdateDocument () {
        //console.log("formFields on update", formFields)
        //etUpdateJson(formFields)
    }

  
    function renderProperties (frame) {
        let props = [] 

        for(var item in frame){
            if(frame[item] && isDataType(frame[item])) { // datatype properties like xsd:/ xdd:
                props.push(<DataTypeFrame property={item} type={frame[item]} onChange={handleChange}/>)
            }
            else if (frame[item] && isClassType(frame[item], documentClasses)){ // Other documents
                props.push(<ClassTypeFrame property={item} type={frame[item]} onChange={handleSelect}/>) 
            } 
            else if (frame[item] && isEnumType(frame[item])) { // enums
                props.push(<EnumTypeFrame property={item} type={frame[item]} onChange={handleSelect}/>)
            }
            else if (frame[item] && isSubDocumentType(frame[item])) { // subdocuments
                props.push(<SubDocumentTypeFrame property={item} type={frame[item]} onChange={handleSelect}/>)
            }
            else if(frame[item] && isSetType(frame[item], documentClasses)) { // set documents
                props.push(<ClassSetTypeFrame property={item} object={frame[item]} onChange={handleSetSelect}/>)
            }
            else if (frame[item] && isOptionalType(frame[item])) { // if Optional xsd:/ xdd:
                props.push(<OptionalFrames property={item} object={frame[item]} onChange={handleChange}/>)
            }
          
        }
        return props
    }


    const [validated, setValidated] = useState(false)
    // check all fields are validated
    const handleSubmit = (event) => {

        const form = event.currentTarget
        if (form.checkValidity() === false) {
            handleCreateDocument()
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
    }

    

    return <React.Fragment>
        {loading && <Loading message={`Loading frames for ${documentObject.type} ...`} type={PROGRESS_BAR_COMPONENT}/>}
        {reportAlert && reportAlert}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {currentFrame && renderProperties(currentFrame)}
            {
                documentObject.action==CREATE_DOCUMENT && 
                    <Button className="btn btn-sm mt-2 float-right" variant="info" onClick={handleCreateDocument}>
                        <BiPlus className="mr-1"/>Create
                    </Button>
            }
            {
                documentObject.action==EDIT_DOCUMENT && 
                    <Button className="btn btn-sm mt-2 float-right" variant="info" onClick={handleUpdateDocument}>
                        <BiEditAlt className="mr-1"/>Update
                    </Button>
            }
        </Form>
    </React.Fragment>

}
