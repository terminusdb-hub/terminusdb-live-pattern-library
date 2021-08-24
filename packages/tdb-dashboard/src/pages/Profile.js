import React from "react"
import {Layout} from "./Layout"
import {LeftSideBar} from "../components/LeftSideBar"
import {useAuth0} from "../react-auth0-spa"
import {Container, Form, Card, Row, Col} from "react-bootstrap"

export const Profile = () => {
    const {user} = useAuth0()

    console.log("user", user)


    return <Layout sideBarContent={<LeftSideBar/>}>
        <Container style={{marginTop: "205px"}}>
            {user && <Card className="shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5" style={{width: "500px"}}>
                <div className="cowduck-top-sec bg-transparent border-0 text-center "> 
                    <img className="card-img cowduck-feedback-avatar large-avatar rounded-circle mx-auto" src={user.picture}/>
                </div>
                <div>
                <Form className="mt-5 mb-5" style={{marginLeft: "120px"}}>
                    <Form.Group as={Row} className="mb-3" controlId={"user_given_name"}>
                        <Col sm="4">
                            <Form.Label >
                                Given Name
                            </Form.Label>
                        </Col>
                        <Col sm="8">
                            <Form.Label>
                                {user.given_name}
                            </Form.Label>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId={"user_family_name"}>
                        <Col sm="4">
                            <Form.Label >
                                Family Name
                            </Form.Label>
                        </Col>
                        <Col sm="8">
                            <Form.Label>
                                {user.family_name}
                            </Form.Label>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId={"user_nick_name"}>
                        <Col sm="4">
                            <Form.Label >
                                Nick Name
                            </Form.Label>
                        </Col>
                        <Col sm="8">
                            <Form.Label>
                                {user.nickname}
                            </Form.Label>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId={"user_email"}>
                        <Col sm="4">
                            <Form.Label >
                                Email
                            </Form.Label>
                        </Col>
                        <Col sm="8">
                            <Form.Label>
                                {user.email}
                            </Form.Label>
                        </Col>
                    </Form.Group>
                </Form>
                    
                </div>
            </Card>}
        </Container>
    </Layout>
}