
import React from "react"
import {Form, InputGroup, ListGroup, Row, Col, Button} from "@themesberg/react-bootstrap"
import {AiOutlineSearch, AiOutlinePlus} from "react-icons/ai"
import {FaPlus} from "react-icons/fa"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {NEW_DATA_PRODUCT_BUTTON} from "../pages/constants"


const SearchBar = () => {
    return <Form className="navbar-search mr-3 mt-3">
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

const List = ({list, woqlClient, setDataProduct}) => {

    function handleClick(e, woqlClient, setDataProduct) {
        if(woqlClient){
            woqlClient.db(e.target.id)
            if(setDataProduct) setDataProduct(e.target.id)
        } 
    }

    return <ListGroup>
        {list.map(item => <ListGroup.Item action 
            id={item.id}
            eventKey={`key_${item.id}`} 
            onClick={(e) => handleClick(e, woqlClient, setDataProduct)} 
            className="bg-transparent text-light border-0">
            {item.label}
        </ListGroup.Item>)}
  </ListGroup>
}

const DatabaseHeader = ({handleNew}) => {

    function handleClick(e) {
        if(handleNew) handleNew(true)
    }

    return <Row className="mr-4" >
        <Col md={8} className="mb-1">
            <p className="text-muted mt-2">DATA PRODUCTS</p>
        </Col>
        <Col md={4} className="mb-3 d-grid mt-1 mb-1">
            <Button variant="info" className="float-right" size="sm" title="Create New Data Product" onClick={(e) => handleClick(e)}>
                <FaPlus className="me-2"/>New
            </Button>
        </Col>
       {/* <Col md={4} class="col-md-2 d-grid mt-1">
            <TDBReactButton config={NEW_DATA_PRODUCT_BUTTON}/>
        </Col>*/}
    </Row>
}

export const DatabaseList = ({list, woqlClient, setDataProduct}) => {
    return <React.Fragment>
        <SearchBar/>
        <List list={list} woqlClient={woqlClient} setDataProduct={setDataProduct}/>
    </React.Fragment>
}

export const ProductViewDatabaseList = ({list, woqlClient, setDataProduct, handleNew}) => {
    return <React.Fragment>
        <SearchBar/>
        <DatabaseHeader handleNew={handleNew}/>
        <List list={list} woqlClient={woqlClient} setDataProduct={setDataProduct}/>
    </React.Fragment>

}