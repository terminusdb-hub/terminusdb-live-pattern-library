import React from "react"
import {Row, Form} from "react-bootstrap"
import {FaStarOfLife} from "react-icons/fa"

export const DataTypeFrame = ({property, type, onChange}) => {

    return  <Row className="mt-2">
        <Form.Group controlId={property}>
            <Form.Label><FaStarOfLife className="mr-2 text-warning mandatory-icon"/>{property}</Form.Label>
            <Form.Control placeholder={type} onChange={onChange}/>
        </Form.Group>
    </Row>

}