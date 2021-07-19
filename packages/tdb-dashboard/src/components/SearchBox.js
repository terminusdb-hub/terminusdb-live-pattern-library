import React, {useState} from "react"
import {AiOutlineSearch} from "react-icons/ai"
import {Form, InputGroup} from "react-bootstrap"

export const SearchBox = ({placeholder, onChange}) => {
    const [searchWarning, setSearchWarning]=useState(false)
    const [inputSearch, setInputSearch]=useState("")

    function handleOnChange(e) {
        let searchText = e.target.value
        setInputSearch(searchText)
        if(searchText.length>3){
            setSearchWarning(false)
            onChange(searchText)
        }
        else if(searchText.length == 0) {
            setSearchWarning(false)
            onChange(false)
        }
        else {
            setSearchWarning(true)
        }
    }

    return <Form className="navbar-search mr-3 mt-3">
        {searchWarning && <p className="text-warning mt-1 mb-1">Please enter at least 3 characters to search...</p>}
        <Form.Group id="topbarSearch">
            <InputGroup className="input-group-merge search-bar">
                <InputGroup.Text style={{border: "1px solid rgb(102, 102, 102)"}}>
                    <AiOutlineSearch/>
                </InputGroup.Text>
                <Form.Control type="text" placeholder={placeholder} value={inputSearch} className="bg-transparent search-input" onChange={handleOnChange}/>
            </InputGroup>
        </Form.Group>
    </Form>
}