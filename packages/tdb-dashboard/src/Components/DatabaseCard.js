import React from "react"
import {Card} from '@themesberg/react-bootstrap'


 
export function DatabaseCard (props) {

    let label = props.label || props.id
    let description = props.description || false

    return <Card>
        <Card.Body>
            <Card.Title>{label}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Text>
        </Card.Body>
    </Card>

}
