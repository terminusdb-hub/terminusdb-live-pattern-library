import React, {useState, useEffect} from "react"
import {Row, Form, Col} from "react-bootstrap"
import Select from 'react-select'
import {FaStarOfLife} from "react-icons/fa"
import {singleSelectStyle} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import {Accordion} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import {getDocumentsOfClassOfInterest} from "../hooks/DocumentControl"
import {DocumentFrameAccordian} from "./DocumentFrameAccordian"
import { CREATE_DOCUMENT, EDIT_DOCUMENT } from "./constants"
import {DocumentationTypeFrame} from "./DocumentationTypeFrame"

const SelectedDocumentAccordian = ({selected}) => {

    // on click of sub frames
    function handleSubSetFrames(document) {
        //setCurrentDocument(document[0])
    }
    return <Accordion  className="mt-3 ml-5" onChange={handleSubSetFrames}>
        <DocumentFrameAccordian item={selected}/>
    </Accordion>
} 
 
export const ClassTypeFrame = ({documentObject, propertyID, property, type, onChange}) => {
    const [selected, setSelected]=useState(false)
    const [options, setOptions] = useState(false)
    const [defaultValue, setDefaultValue] = useState(false)

    const [documentObjectTemp, setDocumentObjectTemp] = useState(false)

    const {
        woqlClient
    } = WOQLClientObj()


    function handleSelect(val) {
        onChange(property, val.value, propertyID)
        setSelected(val)
    }

    useEffect(() => { // get all instances of type to display in select
        if (!type) return
        getDocumentsOfClassOfInterest (woqlClient, type, setDocumentObjectTemp)
    }, [type])

    function getDefaultOption (opts, defaultVal) {
        for (var x=0; x<opts.length; x++) {
            let val = opts[x]
            if(val.value == defaultVal) {
                setDefaultValue(val)
            }
        }
    }

    useEffect(() => { //propulate instances of class type
        if(!documentObjectTemp) return
        let opts =[]
        documentObjectTemp.map(item => {
            opts.push({value: item["@id"], label: item["@id"], color: "#498205", frame: item})
        })
        setOptions(opts)
        if(documentObject.action == EDIT_DOCUMENT) getDefaultOption(opts, documentObject.filledFrame[property])
    }, [documentObjectTemp])

    return <Form.Group as={Col} md="12" controlId={property}>
        <Form.Label className="w-100">
            <FaStarOfLife className="mr-2 text-warning mandatory-icon"/>
            {property}
            <DocumentationTypeFrame documentObject={documentObject} property={property}/>
        </Form.Label> 
        {(documentObject.action == CREATE_DOCUMENT) && <Select options={options}
            required
            onChange={handleSelect}
            styles={singleSelectStyle}
        />}
        {(documentObject.action == EDIT_DOCUMENT) && defaultValue && <Select options={options}
            required
            onChange={handleSelect}
            styles={singleSelectStyle}
            defaultValue={defaultValue}
        />}
        {(documentObject.action == EDIT_DOCUMENT) && !defaultValue && <Select options={options}
            required
            onChange={handleSelect}
            styles={singleSelectStyle}
        />}
        {selected && <SelectedDocumentAccordian selected={selected}/>}

        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
            {`Please provide a valid ${property}.`}
        </Form.Control.Feedback>
        
    </Form.Group>
}
