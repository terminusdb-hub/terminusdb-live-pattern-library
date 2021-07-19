
import React, {useState, useEffect} from "react"
import {Row, Form, Col, Button, Card} from "react-bootstrap"
import {DocumentControl, getDocumentFrame} from "../hooks/DocumentControl"
import {BsPlus} from "react-icons/bs"
import {AiOutlineClose} from "react-icons/ai"
import Select from 'react-select'
import {multiSelectStyle, NEW_OBJECT} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import {FrameViewer} from "./FrameViewer"

export const ClassSetTypeFrame = ({property, object, onChange}) => {
    const [subSet, setSubSet] = useState([])
    const [options, setOptions] = useState(false) 
    const [frame, setFrame] = useState(false)

    const {
        woqlClient,
        setCurrentDocument,
        currentDocument
    } = WOQLClientObj()

    // get select options of type object["@class"]
    const {
        setClassOfInterest,
        documentsOfClassOfInterest,
        currentDocumentInfo,
        setLoading, 
        setReportAlert
    } = DocumentControl()


    useEffect(() => {
        setClassOfInterest(object["@class"])
    }, [object["@class"]])


    useEffect(() => {
        if(!documentsOfClassOfInterest) return
        let opts =[]
        documentsOfClassOfInterest.map(item => {
            opts.push({value: item["@id"], label: item["@id"], color: "#498205"})
        })
        setOptions(opts)
    }, [documentsOfClassOfInterest])
    
   

    function handleChange (val) { // store all class set into subset array 
        setSubSet(val)
    }

    const SubSetFrames = ({subSet, object}) => { // subset 
        let acc = []

        // on click of sub frames
        function handleSubSetFrames(document) {
            setCurrentDocument(document[0])
        }

        //console.log("documentIdInfo", documentIdInfo)
        
        // on clicf of a sub frame => show information of the document 
        const Info = ({documentInfo}) => {
            let fields = []
           for(var key in documentInfo[0]){
                fields.push(
                    <Row>
                        <Form.Group className="d-flex">
                            <span className="ml-3 mr-3 text-muted fw-bold"> 
                                {key}
                            </span>
                            <span md={4} className="mr-5">
                                {documentInfo[0][key]} 
                            </span>
                            
                        </Form.Group>
                    </Row>
                )
            }
            return <React.Fragment>
                {fields}
            </React.Fragment>
        }

        
        // show list of selected document classes as part of sub frame
        subSet.map(item=> {
            acc.push(<AccordionItem key={item.value} uuid={item.value}>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        {item.value}
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <Info documentInfo={currentDocumentInfo}/>
                </AccordionItemPanel>
            </AccordionItem>)
        })
       
        return <Accordion allowZeroExpanded className="mt-3 ml-5" onChange={handleSubSetFrames}>
            {acc}
        </Accordion>
        
    }

    // on adding new object class
    function onAddNewObjectClass (object) {
        getDocumentFrame (woqlClient, object["@class"], setFrame, setLoading, setReportAlert)
    }

    function onClose() {
        setFrame(false)
    }


    return <Row className="mt-2">
        <Form.Group controlId={property}>
            <span className="w-100">
                <Form.Label> {property}</Form.Label>
                <Button className="btn btn-sm ml-4" variant="primary" onClick={(e) => onAddNewObjectClass(object)}>
                    <BsPlus className="mr-1" title={`Add a new ${object["@class"]}`}/>
                    {`Add a new ${object["@class"]}`}
                </Button>
            </span>

          
            <Select options={options}
                onChange={handleChange}
                isMulti
                styles={multiSelectStyle}
                defaultValue={`Choose from available ${object["@type"]} ...`}
            />

            {frame && <Card className="ml-5 mt-3" bg="secondary" >
                <Card.Header className="d-flex">
                    <h6 className="col-md-11">Create new <strong className="text-success mr-1"> {object["@class"]}</strong></h6>
                    <div className="float-right col-md-2">
                        <Button variant="danger" className="mr-3 btn btn-sm" title={"Close"} onClick={(e) => onClose(false)}>
                            <AiOutlineClose className="mr-1"/>Close
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    {frame && <FrameViewer
                        frame={frame}
                        mode="edit"
                        type={NEW_OBJECT}
                    />}
                </Card.Body>
            </Card>}

            {subSet.length>0 && <SubSetFrames subSet={subSet} object={object}/>}
            
        </Form.Group>
    </Row>
}

