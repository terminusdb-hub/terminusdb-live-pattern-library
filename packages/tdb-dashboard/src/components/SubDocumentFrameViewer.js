import React, {useState, useEffect} from "react"
import {Card, Button, Form} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {RenderFrameProperties} from "./RenderFrameProperties"
import {BsPlus} from "react-icons/bs"
import { v4 as uuidv4 } from 'uuid'
import { CREATE_DOCUMENT, EDIT_DOCUMENT } from "./constants"
import {WOQLClientObj} from '../init-woql-client'

export const SubDocumentFrameViewer = ({property, documentFrame, setFormFields, formFields}) => {
    const [subDocArray, setSubDocArray] = useState([])
    const [propertyFill, setPropertyFill]=useState([])

    const [propertyFormFields, setPropertyFormFields]=useState([])

    const {
        documentObject
    } = WOQLClientObj()

    const {
        documentClasses,
    } = DocumentControl() 

    /*{ example of forlm field to uuid of sub doc
    75b71314-8f9e-4b57-b58a-6183c183e4e3: [{email_to: "asd"}, {"note": "sakjd"}]
    65556fe1-336b-4fe3-a90a-38d689709ce6: [{email_to: "asd"}]
    e0ab0bdc-8ab4-4fb4-8ac2-26ae97471990: [{email_to: "sadsadasdasdsadasdasdasdasdasd"}]
        }
    */

        /*
        "invitations": [
        {
            "email_to": "kitzkan@gmail.com",
            "invited_by": "User_apple",
            "note": "somenore"
        },
        {
            "email_to": "reyhan@gmail.com",
            "invited_by": "User_apple",
            "note": "some other blah"
        }
    ]
    */

    function gatherPropertiesToCreate(propertyFill) {
        let extractedJson = []
        for (var item in propertyFill) { 
            let arr = propertyFill[item]
            let newJson ={} 
            for (var x=0; x<arr.length; x++) {
                let stuff = arr[x] 
                for (var key in stuff) {
                    newJson[key] = stuff[key] 
                } 
            }
            extractedJson.push(newJson)
        }
        return extractedJson
    }

    useEffect(() => {

        if(propertyFill.length > 0) {
            setFormFields({
                ...formFields,
                [property]: gatherPropertiesToCreate(propertyFill)
            })
        }
    }, [propertyFill])

    useEffect(() => {
        if(documentObject.action == CREATE_DOCUMENT) { // on create document
            let newDocumentObject={
                action: CREATE_DOCUMENT,
                type: property,
                view: "form",
                submit: false,
                frames: documentFrame,
                filledFrame: {},
                message: false
            }
            setSubDocArray(arr => [...arr, <SubDoc 
                property={property} 
                documentFrame={newDocumentObject} 
                propertyID={uuidv4()}    
                documentClasses={documentClasses}
                setPropertyFill={setPropertyFill}/>])
        }
        if(documentObject.action == EDIT_DOCUMENT) {// on edit document display filled frames of sub documents 
            let subDocProperty = documentObject.filledFrame[property]
            
            if(!subDocProperty) return
            
            subDocProperty.map(item => {
                let newDocumentObject={
                    action: EDIT_DOCUMENT,
                    type: property,
                    view: "form",
                    submit: false,
                    frames: documentFrame,
                    filledFrame: item,
                    message: false
                }

                //setPropertyFormFields(gatherProperties(propertyFormFields, propertyID, e.target.id, e.target.value))
                for(var filled in item){
                    setPropertyFormFields(gatherProperties(propertyFormFields, newDocumentObject.filledFrame["@id"], filled, item[filled]))
                }
                   /* here we pass real sub document id instead of uuidv4 */
                setSubDocArray(arr => [...arr, <SubDoc 
                    property={property} 
                    documentFrame={newDocumentObject} 
                    propertyID={newDocumentObject.filledFrame["@id"]}    
                    documentClasses={documentClasses}
                    setPropertyFill={setPropertyFill}/>])
            })
        }
        
    }, [property])

    console.log("propertyFormFields///", propertyFormFields)

    function gatherProperties(propertyFormFields, propertyID, id, value) {
        // gather properties for subdocuments
        var populatedArray = []
        if(propertyFormFields[propertyID]){
            populatedArray = propertyFormFields[propertyID]
            var match = false
            for(var x=0; x<populatedArray.length; x++){
                let thing = populatedArray[x]
                for (var key in thing) {
                    if(key == id) {
                        match=true
                        thing[key] = value // replace existing 
                    }
                }
            }
            if(!match) populatedArray.push({[id] : value})
            propertyFormFields[propertyID] = populatedArray
        }
        else propertyFormFields[propertyID] = [{[id] : value}]

        return propertyFormFields
    }

  

    const SubDoc = ({propertyID, property, documentFrame, documentClasses, setPropertyFill}) => {
        
        function handleChange (e, propertyID) {
            setPropertyFormFields(gatherProperties(propertyFormFields, propertyID, e.target.id, e.target.value))
            let arr = []
             for (var key in propertyFormFields) {
                arr.push(propertyFormFields[key])
                setPropertyFill(arr)
            }
        }

        function handleSelect(id, value, propertyID) {
            setPropertyFormFields(gatherProperties(propertyFormFields, propertyID, id, value))
            let arr = []
            for (var key in propertyFormFields) {
                arr.push(propertyFormFields[key])
                setPropertyFill(arr)
            }
        }

        function handleSetSelect(id, valArr, propertyID) {
            setPropertyFormFields(gatherProperties(propertyFormFields, propertyID, id, valArr))
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
                        documentObject={documentFrame} 
                        documentClasses={documentClasses}
                        handleChange={handleChange}
                        handleSelect={handleSelect}
                        handleSetSelect={handleSetSelect}
                        propertyID={propertyID}
                    />
                </Form>
            </Card.Body>
        </Card>
    }


    // add new subdocument
    function addNewSubDocument (property, documentFrame, documentClasses) {

        let newDocumentObject={
            action: CREATE_DOCUMENT,
            type: property,
            view: "form",
            submit: false,
            frames: documentFrame,
            filledFrame: {},
            message: false
        }

        setSubDocArray(arr => [...arr, <SubDoc 
            property={property} 
            documentFrame={newDocumentObject} 
            propertyID={uuidv4()}    
            documentClasses={documentClasses}
            setPropertyFill={setPropertyFill}/>])
    }

    return <React.Fragment>

        {subDocArray.length>0 && subDocArray}

        <Button className="btn btn-sm mt-2 mb-1 ml-5" 
            variant="light" 
            onClick={(e) => addNewSubDocument(property, documentFrame, documentClasses)}>
            <BsPlus className="mr-1"/>{`Add new ${property}`}
        </Button>

    </React.Fragment>

}