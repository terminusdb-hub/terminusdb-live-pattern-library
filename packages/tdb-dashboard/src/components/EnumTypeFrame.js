

import React, {useState, useEffect} from "react"
import {DocumentControl} from "../hooks/DocumentControl"
import {Row, Form, Col} from "react-bootstrap"
import Select from 'react-select'
import {singleSelectStyle} from "./constants"

export const EnumTypeFrame = ({property, type, onChange}) => {

    const [options, setOptions] = useState(false)

    useEffect(() => {
        if(!type) return
        if(!type["@values"]) return
        let opts =[]
        type["@values"].map(item => {
            opts.push({value: item, label: item})
        })
        setOptions(opts)
    }, [type]) 

    function handleChange (val) {
        if(onChange) onChange(property, val.value)
    }

    return  <Form.Group as={Col} md="12" controlId={property}>
        <Form.Label>{property}</Form.Label>
        <Select options={options}
            onChange={handleChange}
            styles={singleSelectStyle}
        />
    </Form.Group>
}