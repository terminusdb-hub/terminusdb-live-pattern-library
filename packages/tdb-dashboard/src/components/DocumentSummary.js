
import React, {useState, useEffect} from "react"
import {ListGroup, Container, Card, Row, Col, Button} from "react-bootstrap"
import {BiPlus, BiNetworkChart} from "react-icons/bi"
import {WOQLClientObj} from '../init-woql-client'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import { PRODUCT_MODELS } from "../routing/constants"
import {handleCreate} from "./documents.utils"


export const DocumentSummary = ({setDocumentObject}) => {
  

    const {
        perDocumentCount, 
        totalDocumentCount, 
        documentObject,
        setRoute
    } = WOQLClientObj()

    const DocumentStats = ({dataProvider}) => {
        let arr=[]
        for (var key in dataProvider[0]) { 
            let val = dataProvider[0][key]["@value"]
            let type=key
            arr.push(
                <Col md={4} className="py-2">
                    <Card bg="dark" className="m-3">
                        <Card.Header className="bg-transparent border-0 d-flex">
                            <h4 className="col-md-10 text-muted">{key}</h4>
                            <h4 className="text-muted">{val}/{getTotalNumberOfDocuments(totalDocumentCount)}</h4>
                        </Card.Header>
                        <Card.Body>
                            <Row className="w-50 ml-3">
                                <h1>{val}</h1>
                                {/*<Button className="btn btn-sm btn-lg" 
                                    title={`Create new ${type}`} 
                                    style={{margin: "80px"}} 
                                    variant="info"
                                    key={type} 
                                    onClick={(e) => handleCreate(type, setDocumentObject)}>
                                    <BiPlus className="mr-1"/>{`New ${type}`}
                                </Button>*/}
                            </Row>
                        </Card.Body>
                        {<Card.Footer className="d-flex">
                            {/*<small className="text-muted col-md-10">{`Number of ${type} ${val}`}</small>*/}
                            <small className="text-muted">{`Total ${getTotalNumberOfDocuments(totalDocumentCount)}`}</small>
                        </Card.Footer>}
                    </Card>
                </Col>
            )
        }
        return arr
    }

    function getTotalNumberOfDocuments (dataProviderCount) {
        var count =0
        if(!dataProviderCount) return 
        for (var key in dataProviderCount[0]) { 
            if(key == "Count") {
                count = dataProviderCount[0][key]["@value"]
            }
        }

        return count
    }

    

  
    return  <main className="content mr-3 ml-5 w-100">
        <Container>
            <Row>  
                {perDocumentCount && <DocumentStats dataProvider={perDocumentCount}/>}
                {!perDocumentCount && <Col xs={11} className="d-block ml-5 mr-3">
                    <div class="card card-fil m-3">
                        <div class="card-body w-100 text-center">
                            <h4 className="text-muted mt-3 mb-3">{`No document classes created yet...`}</h4>
                        </div>
                    </div>
                </Col>}
            </Row>
        </Container>
    </main>
                
} 
