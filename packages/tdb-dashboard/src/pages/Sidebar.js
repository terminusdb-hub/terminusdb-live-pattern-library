import React from 'react'
import {DatabaseList} from "../components/DatabaseList"
import {TDBReactAccordian} from '@terminusdb-live/tdb-react-layout'
import {Form, InputGroup} from "react-bootstrap"
import {AiOutlineSearch, AiOutlinePlus} from "react-icons/ai"


export const Sidebar= (props) =>{

    const accordianDatabaseList = 
    [
        {
            id: 1,
            eventKey: "1",
            description: <DatabaseList setSelectedDataProduct={props.setSelectedDataProduct} handleNew={props.handleNew} page={props.page}/>
        }
    ]

    return <div className="flex-column d-flex flex-grow-1">
            <SearchBar />
            <TDBReactAccordian
                defaultKey="1"
                data={accordianDatabaseList} />
            {props.children}
        </div>
}

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