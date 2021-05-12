import React from "react"
import {Form, Card, Button} from '@themesberg/react-bootstrap'
import {organizationForm} from "../constants"
import {handleOrganizationSubmit} from "./utils"

export const OrganizationForm = (props) => {

    return <Card border="light" className="shadow-sm">
        <Card.Body>
            <Form>
                <Form.Group className="mb-3">
                <Form.Label>{organizationForm.label}</Form.Label>
                    <Form.Control required type="text" placeholder={organizationForm.placeholder} />
                </Form.Group>
            </Form>
            <Button variant="primary" className="animate-hover" onClick={handleOrganizationSubmit}>{organizationForm.submit}</Button>
        </Card.Body>
    </Card>
}