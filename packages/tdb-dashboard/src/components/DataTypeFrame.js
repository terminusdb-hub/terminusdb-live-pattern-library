import React from "react"
import {Row, Form} from "react-bootstrap"
import {FaStarOfLife} from "react-icons/fa"
import {DocumentControl} from "../hooks/DocumentControl"

export const DataTypeFrame = ({property, type, onChange, mode, formFields, setFormFields}) => {

    const {
        currentDocumentInfo
    } = DocumentControl()


    function handleChange (e) {
        console.log("e.target.value", e.target.value)
        console.log("e.target.id", e.target.id)
        setFormFields({
            ...formFields,
            [e.target.id]: e.target.value
        })
    }

    const FilledFormFields = ({onChange, property, type, currentDocumentInfo}) => {

        // get match of filed fields in frames
        for (var item in currentDocumentInfo){
            if(item == property) {
                return <Form.Control defaultValue ={currentDocumentInfo[property]} onChange={onChange}/>
            }
        }

        return  <Form.Control placeholder={type} onChange={onChange}/>
    }

    return  <Row className="mt-2">
        <Form.Group controlId={property}>
            <Form.Label><FaStarOfLife className="mr-2 text-warning mandatory-icon"/>{property}</Form.Label>

            {(mode!=="edit") && <Form.Control placeholder={type} onChange={handleChange}/>}

            {(mode=="edit") && currentDocumentInfo && <FilledFormFields 
                onChange={handleChange} 
                property={property} 
                type={type} 
                currentDocumentInfo={currentDocumentInfo}/>}
        </Form.Group>
    </Row>

}