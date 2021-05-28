
import React from "react"
import {Form, InputGroup, ListGroup, Row, Col, Button} from "react-bootstrap"
import {AiOutlineSearch, AiOutlinePlus} from "react-icons/ai"
import {FaPlus} from "react-icons/fa"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {NEW_DATA_PRODUCT_BUTTON} from "../pages/constants"
import {WOQLClientObj} from '../init-woql-client'
import {DATA_PRODUCTS} from "../routing/constants"

import {dataProductList} from "../hooks/DataProductList"


const SearchBar = () => {
    return <Form className="navbar-search mr-3">
        <Form.Group id="topbarSearch">
            <InputGroup className="input-group-merge search-bar">
                <InputGroup.Text>
                    <AiOutlineSearch/>
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Search Data Products" className="bg-transparent"/>
            </InputGroup>
        </Form.Group>
    </Form>
}

const List = () => {  
    const {dataProduct, woqlClient,setDataProduct} = WOQLClientObj()
    const {list} = dataProductList(woqlClient)

    function handleClick(e) {
        setDataProduct(e.target.id) 
    }

    return <ListGroup  defaultActiveKey={`key_${dataProduct}`}>
        {list.map(item => <ListGroup.Item action 
            id={item.id}
            eventKey={`key_${item.id}`} 
            onClick={(e) => handleClick(e)} 
            className="bg-transparent text-light border-0">
            {item.label}
        </ListGroup.Item>)}
  </ListGroup>
}

const DatabaseHeader = ({page, handleNew}) => {

    function handleClick(e, handleNew) {
        if(handleNew) handleNew(true)
    }

    return <Row className="mr-2" >
        <Col md={8} className="mb-1">
            <p className="text-muted mt-2">DATA PRODUCTS</p>
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
        <SearchBar/>
        <DatabaseHeader page={page} handleNew={handleNew}/>
        <List/>
    </React.Fragment>
}
