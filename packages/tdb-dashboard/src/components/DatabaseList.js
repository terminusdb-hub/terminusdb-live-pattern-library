
import React from "react"
import {ListGroup, Row, Col, Button} from "react-bootstrap"
import {FaPlus} from "react-icons/fa"
import {WOQLClientObj} from '../init-woql-client'
import {DATA_PRODUCTS} from "../routing/constants"

import {dataProductList} from "../hooks/DataProductList"

const List = () => {  
    const {dataProduct, woqlClient, setDataProduct} = WOQLClientObj()
    const {list} = dataProductList(woqlClient)

    function handleClick(e) {
        setDataProduct(e.target.id) 
    }

    return  <ListGroup  defaultActiveKey={`key_${dataProduct}`}>
        {list.map(item => <ListGroup.Item action 
            id={item.name}
            eventKey={`key_${item.name}`} 
            onClick={(e) => handleClick(e)} 
            className="bg-transparent text-light border-0 ">
            {item.label}
        </ListGroup.Item>)}
  </ListGroup>
 
}

export const DatabaseHeader = ({page, handleNew}) => {

    function handleClick(e, handleNew) {
        if(handleNew) handleNew(true)
    }

    return <Row className="w-100 text-left ml-1" >
        <Col md={8} className="mb-1">
            <h6 className="text-muted mt-2">DATA PRODUCTS</h6>
        </Col>
        {(page == DATA_PRODUCTS) && handleNew && <Col md={4} className="mb-3 d-grid mt-1 mb-1">
            <Button variant="info" className="float-right" size="sm" title="Create New Data Product" onClick={(e) => handleClick(e, handleNew)}>
                <FaPlus className="me-2"/>New
            </Button>
        </Col>}
     
    </Row>
}

export const DatabaseList = ({page, handleNew}) => {
    return <React.Fragment>
        
            <List/>
    </React.Fragment>
}

//<DatabaseHeader page={page} handleNew={handleNew}/>
