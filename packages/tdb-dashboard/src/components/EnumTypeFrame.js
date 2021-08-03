

import React, {useState, useEffect} from "react"
import {Row, Form, Col} from "react-bootstrap"
import Select from 'react-select'
import {singleSelectStyle} from "./constants"
import { CREATE_DOCUMENT, EDIT_DOCUMENT } from "./constants"
import {WOQLClientObj} from '../init-woql-client'

export const EnumTypeFrame = ({propertyID, property, type, onChange}) => {

    const [options, setOptions] = useState(false)
    const [defaultValue, setDefaultValue] = useState(false)

    const {
        documentObject
    } = WOQLClientObj()

    useEffect(() => {
        if(!type) return
        if(!type["@values"]) return
        let opts =[]
        type["@values"].map(item => {
            opts.push({value: item, label: item})
        })
        setOptions(opts)
        if(documentObject.action == EDIT_DOCUMENT) getDefaultOption(opts, documentObject.filledFrame[property])
    }, [type]) 

    function handleChange (val) {
        if(onChange) onChange(property, val.value, propertyID)
    }

    function getDefaultOption (opts, defaultVal) {
        for (var x=0; x<opts.length; x++) {
            let val = opts[x]
            if(val.value == defaultVal) {
                setDefaultValue(val)
            }
        }
    }

    return  <Form.Group as={Col} md="12" controlId={property}>
        <Form.Label>{property}</Form.Label>
        {(documentObject.action == CREATE_DOCUMENT) && <Select options={options}
            onChange={handleChange}
            styles={singleSelectStyle}
        />}
        {(documentObject.action == EDIT_DOCUMENT) && defaultValue && <Select options={options}
            onChange={handleChange}
            styles={singleSelectStyle}
            defaultValue={defaultValue}
        />}
    </Form.Group>
}