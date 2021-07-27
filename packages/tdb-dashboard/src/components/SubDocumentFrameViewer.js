import React, {useState, useEffect} from "react"
import {Card, Button, Form} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {RenderFrameProperties} from "./RenderFrameProperties"
import {BsPlus} from "react-icons/bs"
import { v4 as uuidv4 } from 'uuid';

export const SubDocumentFrameViewer = ({property, documentFrame, setFormFields, formFields}) => {
    const [subDocArray, setSubDocArray] = useState([])
    const [propertyFill, setPropertyFill]=useState([])

    const [propertyFormFields, setPropertyFormFields]=useState([])

    const {
        documentClasses,
    } = DocumentControl() 

    /*{ example of forlm field to uuid of sub doc
    75b71314-8f9e-4b57-b58a-6183c183e4e3: [{email_to: "asd"}, {"note": "sakjd"}]
    65556fe1-336b-4fe3-a90a-38d689709ce6: [{email_to: "asd"}]
    e0ab0bdc-8ab4-4fb4-8ac2-26ae97471990: [{email_to: "sadsadasdasdsadasdasdasdasdasd"}]
        }
    */

    useEffect(() => {
        console.log("///propertyFill",propertyFill)
        if(propertyFill.length > 0) {
            setFormFields({
                ...formFields,
                [property]: propertyFill
            })
        }
    }, [propertyFill])

    console.log("///formFields",formFields)


    const SubDoc = ({propertyID, property, documentFrame, documentClasses, setPropertyFill}) => {
        
        function handleChange (e, id) {
           propertyFormFields[id] =  {[e.target.id] : e.target.value}
           setPropertyFormFields(propertyFormFields)
           let arr = []
           for (var key in propertyFormFields) {
                
                arr.push(propertyFormFields[key])
                setPropertyFill(arr)
            }
        }

        return <Card bg="secondary" className="ml-5 mt-2 mb-2">
            <Card.Header> {property}</Card.Header>
            <Card.Body>
                <Form  >
                    <RenderFrameProperties 
                        frame={documentFrame} 
                        documentClasses={documentClasses}
                        handleChange={handleChange}
                        propertyID={propertyID}
                    />
                </Form>
            </Card.Body>
        </Card>
    }


    // add new subdocument
    function addNewSubDocument (property, documentFrame, documentClasses) {

        setSubDocArray(arr => [...arr, <SubDoc 
            property={property} 
            documentFrame={documentFrame} 
            propertyID={uuidv4()}    
            documentClasses={documentClasses}
            setPropertyFill={setPropertyFill}/>])
    }

    return <React.Fragment>
        <SubDoc property={property} 
            documentFrame={documentFrame}
            propertyID={uuidv4()}
            documentClasses={documentClasses}
            setPropertyFill={setPropertyFill}/>

        {subDocArray.length>0 && subDocArray}

        <Button className="btn btn-sm mt-2 mb-1 ml-5" 
            variant="light" 
            onClick={(e) => addNewSubDocument(property, documentFrame, documentClasses)}>
            <BsPlus className="mr-1"/>{`Add new ${property}`}
        </Button>

    </React.Fragment>

}