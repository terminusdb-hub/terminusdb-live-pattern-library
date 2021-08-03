import React from "react"
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import {Row, Form} from "react-bootstrap"

// on clicf of a sub frame => show information of the document 
const Info = ({frame}) => {
    let fields = []
   for(var key in frame){
        fields.push(
            <Row>
                <Form.Group className="d-flex">
                    <span className="ml-3 mr-3 text-muted fw-bold col-md-1"> 
                        {key}
                    </span>
                    <span md={4} className="mr-5">
                        {frame[key]} 
                    </span>
                    
                </Form.Group>
            </Row>
        )
    }
    return <React.Fragment>
        {fields}
    </React.Fragment>
}

export const DocumentFrameAccordian = ({item}) => {
    return <AccordionItem key={item.value} uuid={item.value}>
    <AccordionItemHeading>
        <AccordionItemButton>
            {item.value}
        </AccordionItemButton>
    </AccordionItemHeading>
    <AccordionItemPanel>
        <Info frame={item.frame}/>
    </AccordionItemPanel>
</AccordionItem>
}