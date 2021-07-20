import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {isDataType, isClassType, isSetType, isOptionalType} from "./utils"
import {Form, Button, Row} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {BiPlus} from "react-icons/bi"
import {DataTypeFrame} from "./DataTypeFrame"
import {ClassTypeFrame} from "./ClassTypeFrame"
import {ClassSetTypeFrame} from "./ClassSetTypeFrame"
import {OptionalDataTypeFrame} from "./OptionalDataTypeFrame"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT, NEW_OBJECT} from "./constants"

export const FrameViewer = ({frame, mode, type}) => {

    const {
        woqlClient, 
        createNewDocument
    } = WOQLClientObj()

    const {
        documentClasses, 
        setNewDocumentInfo,
        reportAlert,
        loading
    } = DocumentControl()


    const [formFields, setFormFields] = useState({"@type": createNewDocument})

    function handleChange(e) { // gather all form fields on change
        setFormFields({
            ...formFields,
            [e.target.id]: e.target.value
          })
    }

    function handleSelect(id, value) { // gather all form fields on change
        setFormFields({
            ...formFields,
            [id]: value
          })
    }

    function submitDocument () {
        setNewDocumentInfo(formFields)
    }

    function renderProperties () {
        let props = []

        for(var item in frame){
            if(frame[item] && isDataType(frame[item])) { // datatype properties like xsd:/ xdd:
                props.push(<DataTypeFrame property={item} type={frame[item]} onChange={handleChange}/>)
            }
            else if (frame[item] && isClassType(frame[item], documentClasses)){ // Other documents
                props.push(<ClassTypeFrame property={item} type={frame[item]} onChange={handleSelect}/>) 
            } 
            else if(frame[item] && isSetType(frame[item], documentClasses)) { // set documents
                props.push(<ClassSetTypeFrame property={item} object={frame[item]} onChange={handleChange}/>)
               
            }
            else if (frame[item] && isOptionalType(frame[item])) { // if Optional xsd:/ xdd:
                props.push(<OptionalDataTypeFrame property={item} object={frame[item]} onChange={handleChange}/>)
            }
          
        }
        return props
    }

    return <React.Fragment>
        {loading && <Loading message={`Creating new ${createNewDocument} ...`} type={PROGRESS_BAR_COMPONENT}/>}
        {reportAlert && reportAlert}
        <Form >
            {renderProperties()}
            <Button className="btn btn-sm mt-2 float-right" variant="info" onClick={submitDocument}>
                <BiPlus className="mr-1"/>Create
            </Button>
        </Form>
    </React.Fragment>

}