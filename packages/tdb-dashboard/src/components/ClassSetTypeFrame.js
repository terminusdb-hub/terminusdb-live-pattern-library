
import React, {useState, useEffect} from "react"
import {Row, Form, Col, Button, Card} from "react-bootstrap"
import {BsPlus} from "react-icons/bs"
import {AiOutlineClose} from "react-icons/ai"
import Select from 'react-select'
import {multiSelectStyle, NEW_OBJECT} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import {Accordion} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import {FrameViewer} from "./FrameViewer"
import {getDocumentsOfClassOfInterest} from "../hooks/DocumentControl"
import {DocumentFrameAccordian} from "./DocumentFrameAccordian"
import {DocumentationTypeFrame} from "./DocumentationTypeFrame"

const SelectedDocumentAccordian = ({selected}) => {
    let acc=[]

    // on click of sub frames
    function handleSubSetFrames(document) {
        //setCurrentDocument(document[0])
    }

    // show list of selected document classes as part of sub frame
    selected.map(item=> {
        acc.push(<DocumentFrameAccordian item={item}/>)
    })
   
    return <Accordion allowMultipleExpanded  className="mt-3 ml-5" onChange={handleSubSetFrames}>
        {acc}
    </Accordion>
}

export const ClassSetTypeFrame = ({documentObject, property, object, onChange}) => {
    const [selected, setSelected]=useState(false)
    const [options, setOptions] = useState(false)

    const [documentObjectTemp, setDocumentObjectTemp] = useState(false)

    const {
        woqlClient
    } = WOQLClientObj()

    function handleSelect (val) { // store all class set into subset array 
        let arr=[]
        val.map(item => {
            arr.push(item.value)
        })
        onChange(property, arr)
        setSelected(val)
    }

    useEffect(() => { // get all instances of type to display in select
        if (!object["@class"]) return
        getDocumentsOfClassOfInterest (woqlClient, object["@class"], setDocumentObjectTemp)
    }, [object["@class"]])

    useEffect(() => { //propulate instances of class type
        if(!documentObjectTemp) return
        let opts =[]
        documentObjectTemp.map(item => {
            opts.push({value: item["@id"], label: item["@id"], color: "#498205", frame: item})
        })
        setOptions(opts)
    }, [documentObjectTemp])
    
    return <Form.Group as={Col} md="12" controlId={property}>
        <span className="w-100">
            <Form.Label className="w-100"> 
                {property}
                <DocumentationTypeFrame documentObject={documentObject} property={property}/>
            </Form.Label>

            <Select options={options}
                onChange={handleSelect}
                isMulti
                styles={multiSelectStyle}
                defaultValue={`Choose from available ${object["@type"]} ...`}
            />
        </span>
        {selected.length>0 && <SelectedDocumentAccordian selected={selected}/>}
    </Form.Group>
}

