

import React, {useState, useEffect} from "react"
import {DocumentControl} from "../hooks/DocumentControl"
import {Row, Form} from "react-bootstrap"
import Select from 'react-select'
import {singleSelectStyle} from "./constants"
import {FaStarOfLife} from "react-icons/fa"

export const EnumTypeFrame = ({property, type, onChange}) => {

    const [options, setOptions] = useState(false)

    const {
        enums
    } = DocumentControl()

    useEffect(() => {
        if(!enums) return
        let opts =[]
        enums.map(item => {
            if(type == item["@id"]){
                let valArray = item["@value"]
                valArray.map (val =>{
                    opts.push({value: val, label: val})
                })
                return
            }
        })
        console.log("opts", opts)
        setOptions(opts)
    }, [enums])

    function handleChange () {

    }

    return <Row className="mt-2">
        <Form.Group controlId={property}>
            <Form.Label><FaStarOfLife className="mr-2 text-warning mandatory-icon"/>{property}</Form.Label>
            <Select options={options}
                onChange={handleChange}
                styles={singleSelectStyle}
            />
            
            
        </Form.Group>
      
    </Row>
}