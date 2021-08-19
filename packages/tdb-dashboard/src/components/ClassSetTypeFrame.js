
import React, {useState, useEffect} from "react"
import {Form, Col} from "react-bootstrap"
import Select from 'react-select'
import {multiSelectStyle} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import {getDocumentsOfClassOfInterest} from "../hooks/DocumentControl"
import {DocumentFrameAccordian} from "./DocumentFrameAccordian"
import {DocumentationTypeFrame} from "./DocumentationTypeFrame"
import {SubDocumentTypeFrame} from "./SubDocumentTypeFrame"
import {Accordion} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'

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
   
    return <Accordion allowZeroExpanded  className="mt-3 ml-5" onChange={handleSubSetFrames}>
        {acc}
    </Accordion>
}

export const ClassSetTypeFrame = ({documentObject, property, object, onChange, propertyID, setFormFields, formFields}) => {
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
        if(object["@class"]["@class"]) { //sub document

        }
        else getDocumentsOfClassOfInterest (woqlClient, object["@class"], setDocumentObjectTemp) // another document class
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

            {/* For subdocuments list or set */}
            {object["@class"]["@class"] && <SubDocumentTypeFrame documentObject={documentObject} property={property} type={object["@class"]} setFormFields={setFormFields} formFields={formFields} propertyID={propertyID} set={true}/>}
            
            {/* For other document class list or set */}
            {!object["@class"]["@class"] && <React.Fragment>
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
            </React.Fragment> }
        </span>
        {selected.length>0 && !object["@class"]["@class"] && <SelectedDocumentAccordian selected={selected}/>}
    </Form.Group>
}

