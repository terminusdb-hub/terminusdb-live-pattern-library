import React from "react"
import {Row, Form} from "react-bootstrap"


export const OptionalDataTypeFrame = ({property, object, onChange}) => {
    return  <Row className="mt-2">
        <Form.Group controlId={property}>
            <Form.Label>{property}</Form.Label>
            <Form.Control placeholder={object["@class"]} onChange={onChange}/>
        </Form.Group>
    </Row>
}