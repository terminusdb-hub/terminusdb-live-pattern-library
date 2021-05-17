
import React from "react"
import {Form, InputGroup, ListGroup} from "@themesberg/react-bootstrap"
import {AiOutlineSearch} from "react-icons/ai"


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

    function handleClick(e, woqlClient) {
        if(woqlClient){
            woqlClient.db(e.target.id)
            setDataProduct(e.target.id)
        } 
        console.log("curr db", woqlClient.db())
    }

    return <ListGroup>
        {list.map(item => <ListGroup.Item action 
            id={item.id}
            eventKey={`key_${item.id}`} 
            onClick={(e) => handleClick(e, woqlClient, e.target.id)} 
            className="bg-transparent text-light border-0">
            {item.label}
        </ListGroup.Item>)}
  </ListGroup>
}

export const DatabaseList = ({list, woqlClient, setDataProduct}) => {
    return <React.Fragment>
        <SearchBar/>
        <List list={list} woqlClient={woqlClient} setDataProduct={setDataProduct}/>
    </React.Fragment>
}