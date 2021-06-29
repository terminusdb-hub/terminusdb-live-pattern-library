import React from "react"
import {AiOutlineSearch} from "react-icons/ai"
import {Form, InputGroup} from "react-bootstrap"

export const SearchBox = ({placeholder, onBlur}) => {
    return <Form className="navbar-search mr-3 ml-3 mt-3">
    <Form.Group id="topbarSearch">
        <InputGroup className="input-group-merge search-bar">
            <InputGroup.Text style={{border: "1px solid rgb(102, 102, 102)"}}>
                <AiOutlineSearch/>
            </InputGroup.Text>
            <Form.Control type="text" placeholder="Search Data Products" className="bg-transparent"/>
        </InputGroup>
    </Form.Group>
</Form>
}