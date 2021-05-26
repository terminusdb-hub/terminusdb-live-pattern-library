
import React from "react"
import {Form, InputGroup, ListGroup} from "react-bootstrap"
import {AiOutlineSearch} from "react-icons/ai"
import {WOQLClientObj} from '../init-woql-client'
import {dataProductList} from "../hooks/DataProductList"

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

const List = (props) => {  
    const {woqlClient,setDataProduct,dataProduct} = WOQLClientObj()
    const {list} = dataProductList(woqlClient)

    function handleClick(e) {
        setDataProduct(e.target.id) 
    }

    return <ListGroup  defaultActiveKey={`key_${dataProduct}`}>
        {list.map(item => <ListGroup.Item action 
            id={item.id}
            eventKey={`key_${item.id}`} 
            onClick={(e) => handleClick(e, woqlClient, setDataProduct)} 
            className="bg-transparent text-light border-0">
            {item.label}
        </ListGroup.Item>)}
  </ListGroup>
}

export const DatabaseList = (props) => {
    return <React.Fragment>
        <SearchBar/>
        <p className="text-muted">Connect to a Data Product</p>
        <List/>
    </React.Fragment>
}