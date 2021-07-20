import React, {useState, useEffect} from "react"
import {Row, Form} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import Select from 'react-select'
import {FaStarOfLife} from "react-icons/fa"

export const ClassTypeFrame = ({property, type, onChange}) => {
    const [options, setOptions] = useState(false)

    const {
        setClassOfInterest,
        documentsOfClassOfInterest
    } = DocumentControl()

    useEffect(() => {
        setClassOfInterest(type)
    }, [type])

    useEffect(() => {
        if(!documentsOfClassOfInterest) return
        let opts =[]
        documentsOfClassOfInterest.map(item => {
            opts.push({value: item["@id"], label: item["@id"]})
        })
        setOptions(opts)
    }, [documentsOfClassOfInterest])

    const styles = {
        singleValue: (base, state) => {
          return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
        }
    }


    function handleChange(val) {
        onChange(property, val.value)
    }


    //console.log("documentsOfClassOfInterest", documentsOfClassOfInterest)

    return <Row className="mt-2">
        <Form.Group controlId={property}>
            <Form.Label><FaStarOfLife className="mr-2 text-warning mandatory-icon"/>{property}</Form.Label>
            <Select options={options}
                onChange={handleChange}
                styles={styles}
            />
            
            
        </Form.Group>
      
    </Row>
}

/*<Form.Control placeholder={type} onChange={onChange}/>*/