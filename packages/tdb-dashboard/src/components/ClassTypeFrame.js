import React, {useState, useEffect} from "react"
import {Row, Form, Col} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import Select from 'react-select'
import {FaStarOfLife} from "react-icons/fa"
import {singleSelectStyle} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import {Accordion} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import {getDocumentsOfClassOfInterest} from "../hooks/DocumentControl"
import {DocumentFrameAccordian} from "./DocumentFrameAccordian"

const SelectedDocumentAccordian = ({selected}) => {

    // on click of sub frames
    function handleSubSetFrames(document) {
        //setCurrentDocument(document[0])
    }
    return <Accordion  className="mt-3 ml-5" onChange={handleSubSetFrames}>
        <DocumentFrameAccordian item={selected}/>
    </Accordion>
}

export const ClassTypeFrame = ({property, type, onChange}) => {
    const [selected, setSelected]=useState(false)
    const [options, setOptions] = useState(false)

    const [documentObjectTemp, setDocumentObjectTemp] = useState(false)

    const {
        woqlClient
    } = WOQLClientObj()


    function handleSelect(val) {
        onChange(property, val.value)
        setSelected(val)
    }

    useEffect(() => { // get all instances of type to display in select
        if (!type) return
        getDocumentsOfClassOfInterest (woqlClient, type, setDocumentObjectTemp)
    }, [type])

    useEffect(() => { //propulate instances of class type
        if(!documentObjectTemp) return
        let opts =[]
        documentObjectTemp.map(item => {
            opts.push({value: item["@id"], label: item["@id"], color: "#498205", frame: item})
        })
        setOptions(opts)
    }, [documentObjectTemp])

    return <Form.Group as={Col} md="12" controlId={property}>
        <Form.Label><FaStarOfLife className="mr-2 text-warning mandatory-icon"/>{property}</Form.Label>
        <Select options={options}
            onChange={handleSelect}
            styles={singleSelectStyle}
        />
        {selected && <SelectedDocumentAccordian selected={selected}/>}
    </Form.Group>
}
