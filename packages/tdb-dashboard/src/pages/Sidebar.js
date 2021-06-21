import React from 'react'
import {DatabaseList} from "../components/DatabaseList"
import {TDBReactAccordian} from '@terminusdb-live/tdb-react-layout'
import {Form, InputGroup} from "react-bootstrap"
import {AiOutlineSearch, AiOutlinePlus} from "react-icons/ai"
import {DatabaseHeader}from "../components/DatabaseList"
import {CurrentDataProductState, CurrentDataProductStateHeader} from "../components/CurrentDataProductState"
import {WOQLClientObj} from '../init-woql-client'

export const Sidebar= (props) =>{
    const {dataProduct} = WOQLClientObj()

    const accordianDatabaseList = 
    [
        {
            id: 1,
            eventKey: "1",
            description: <DatabaseList handleNew={props.handleNew} page={props.page}/>,
            icon: 'fas fa-chevron-down',
            title: <DatabaseHeader handleNew={props.handleNew} page={props.page}/>
        }
        
    ]

    const connectedDatabase = [
        {
            id: 1,
            eventKey: "1",
            description: <CurrentDataProductState />,
            icon: 'fas fa-chevron-down',
            title: <CurrentDataProductStateHeader/>
        }
    ]

    return <div className="flex-column d-flex flex-grow-1">
            <SearchBar />
            <TDBReactAccordian
                defaultKey="1"
                data={accordianDatabaseList} />
            {dataProduct && <TDBReactAccordian
                defaultKey="1"
                data={connectedDatabase} />}
            {props.children}
        </div>
}

const SearchBar = () => {
    return <Form className="navbar-search mr-3 ml-3 mt-3">
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