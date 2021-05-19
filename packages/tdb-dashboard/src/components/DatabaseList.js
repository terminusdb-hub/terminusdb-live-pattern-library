import {ListGroup,Form} from "react-bootstrap"
import React from 'react';

export const DatabaseList = (props) => {

    return (<div className="flex-column d-flex">
            <Form>
                <Form.Control placeholder="Search" />
            </Form>
            
            <ListGroup>
                <ListGroup.Item disabled>DB 01</ListGroup.Item>
                <ListGroup.Item>DB 01</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
            </div>)
}