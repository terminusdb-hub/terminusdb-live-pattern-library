import React from "react"
import {Form, Card, Button} from '@themesberg/react-bootstrap'
import {organizationForm} from "../constants"
import { useAuth0 } from "../../react-auth0-spa"

export const OrganizationForm = (props) => {
    const {isAuthenticated, user, loading, loginWithRedirect, logout } = useAuth0()

    function handleOrganizationSubmit () {
        let layoutHomeURL = window.location + "products"
        window.location.assign(layoutHomeURL);
    }

    function handleSubmit (e) {
        loginWithRedirect()
        handleOrganizationSubmit()
    }

    return <Card border="light" className="shadow-sm">
        <Card.Body>
            <Form>
                <Form.Group className="mb-3">
                <Form.Label>{organizationForm.label}</Form.Label>
                    <Form.Control required type="text" placeholder={organizationForm.placeholder} />
                </Form.Group>
            </Form>
            {!isAuthenticated && !user && 
                <Button variant="info" className="animate-hover" onClick={handleSubmit}>{organizationForm.submit}</Button>
            }
        </Card.Body>
    </Card>
}