import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {isDataType, isClassType, isSetType, isOptionalType, isEnumType} from "./utils"
import {Form, Button, Row, Col, InputGroup} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {BiPlus,BiEditAlt} from "react-icons/bi"
import {DataTypeFrame} from "./DataTypeFrame"
import {ClassTypeFrame} from "./ClassTypeFrame"
import {ClassSetTypeFrame} from "./ClassSetTypeFrame"
import {OptionalFrames} from "./OptionalFrames"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT, NEW_OBJECT} from "./constants"
import {EnumTypeFrame} from "./EnumTypeFrame"

export const FrameViewer = ({frame, mode, type}) => {

    const {
        woqlClient, 
        createNewDocument,
        editDocument,
    } = WOQLClientObj()

    const {
        documentClasses, 
        setNewDocumentInfo,
        reportAlert,
        loading,
        currentDocumentInfo,
        enums,
        setUpdateJson
    } = DocumentControl()

    const [formFields, setFormFields] = useState({})

    useEffect(() => {
        if(mode !== "edit") setFormFields({"@type": createNewDocument})
        if(mode == "edit") setFormFields(editDocument)
    }, [mode])

    function handleChange(e) { // gather all form fields inputs on change
        setFormFields({
            ...formFields,
            [e.target.id]: e.target.value
          })
    }

    console.log("formFields", formFields)

    function handleSelect(id, value) { // gather all form fields select on change
        setFormFields({
            ...formFields,
            [id]: value
          })
    }

    function handleCreateDocument () {
        setNewDocumentInfo(formFields)
    }

    function handleUpdateDocument () {
        console.log("formFields on update", formFields)
        setUpdateJson(formFields)
    }

  
    function renderProperties () {
        let props = []

        for(var item in frame){
            if(frame[item] && isDataType(frame[item])) { // datatype properties like xsd:/ xdd:
                props.push(<DataTypeFrame property={item} type={frame[item]} onChange={handleChange} mode={mode}/>)
            }
            else if (frame[item] && isClassType(frame[item], documentClasses)){ // Other documents
                props.push(<ClassTypeFrame property={item} type={frame[item]} onChange={handleSelect}/>) 
            } 
            /*else if (frame[item] && isEnumType(frame[item], enums)) { // enums
                props.push(<EnumTypeFrame property={item} type={frame[item]} onChange={handleSelect}/>)
            }*/
            else if(frame[item] && isSetType(frame[item], documentClasses)) { // set documents
                props.push(<ClassSetTypeFrame property={item} object={frame[item]} onChange={handleChange}/>)
               
            }
            else if (frame[item] && isOptionalType(frame[item])) { // if Optional xsd:/ xdd:
                props.push(<OptionalFrames property={item} object={frame[item]} onChange={handleChange} mode={mode}/>)
            }
          
        }
        return props
    }


    const [validated, setValidated] = useState(false)
    // check all fields are validated
    const handleSubmit = (event) => {
        const form = event.currentTarget
        setValidated(true)
        if(mode!=="edit") handleCreateDocument()
        if(mode=="edit") handleUpdateDocument()
        event.preventDefault() // stop from refresh
        event.stopPropagation()
    }

    return <React.Fragment>
        {loading && <Loading message={`Creating new ${createNewDocument} ...`} type={PROGRESS_BAR_COMPONENT}/>}
        {reportAlert && reportAlert}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {renderProperties()}
            <Button type="submit">Submit form</Button>
        </Form>
        
        {/*<Form >
            {renderProperties()}
            {
                (mode !== "edit") && <Button className="btn btn-sm mt-2 float-right" variant="info" onClick={handleCreateDocument}>
                    <BiPlus className="mr-1"/>Create
                </Button>
            }
            {
                (mode == "edit") && <Button className="btn btn-sm mt-2 float-right" variant="info" onClick={handleUpdateDocument}>
                    <BiEditAlt className="mr-1"/>Update
                </Button>
            }
        </Form>*/}
    </React.Fragment>

}