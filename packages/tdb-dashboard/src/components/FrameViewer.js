import React, {useState} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {isDataType, isClassType, isObjectType} from "./utils"
import {Form, Button} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {BsPlusSquare} from "react-icons/bs"
import {BiPlus} from "react-icons/bi"

export const FrameViewer = ({frame, mode}) => {

    const {woqlClient, createDocument, setCreateDocument} = WOQLClientObj()
    const {
        documentTypes, 
        setNewDocument
    } = DocumentControl()

    const [formFields, setFormFields] = useState({"@type": createDocument})

    function handleChange(e) { // gather all form fields on change
        e.preventDefault()
        setFormFields({
            ...formFields,
            [e.target.id]: e.target.value
          })
    }

    function submitDocument () {
        setNewDocument(formFields)
    }

    

    function renderProperties () {
        let props = []

        function DataTypeFrame (property, type) {
            return <Form.Group controlId={property}>
                <Form.Label>{property}</Form.Label>
                <Form.Control placeholder={type} onChange={handleChange}/>
            </Form.Group>
        }

        function ClassTypeFrame (property, type) {
            return <Form.Group controlId={property}>
                <Form.Label>{property}</Form.Label>
                <Form.Control placeholder={type} onChange={handleChange}/>
            </Form.Group>
        }

        function SetClassTypeFrame (property, object) {
            return <Form.Group controlId={property}>
                <span className="w-100">
                    <Form.Label>{property}</Form.Label>
                    <BsPlusSquare className="text-success ml-4" style={{cursor: "pointer"}}/>
                </span>
                <Form.Control placeholder={object["@type"]} onChange={handleChange}/>
            </Form.Group>
        }

        for(var item in frame){
            if(frame[item] && isDataType(frame[item])) { // datatype properties
                props.push(DataTypeFrame(item, frame[item]))
            }
            else if (frame[item] && isClassType(frame[item], documentTypes)){ // Other documents
                props.push(ClassTypeFrame(item, frame[item]))
            }
            else if(frame[item] && isObjectType(frame[item], documentTypes)) { // set documents
                props.push(SetClassTypeFrame(item, frame[item]))
            }
          
        }
        return props
    }

    return <Form >
        {renderProperties()}
        <Button className="btn btn-sm mt-2 float-right" variant="info" onClick={submitDocument}>
            <BiPlus className="mr-1"/>Create
        </Button>
    </Form>

}