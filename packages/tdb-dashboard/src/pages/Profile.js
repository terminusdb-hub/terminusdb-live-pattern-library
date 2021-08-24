import React from "react"
import {Layout} from "./Layout"
import {LeftSideBar} from "../components/LeftSideBar"
import {useAuth0} from "../react-auth0-spa"
import {Alert, Form, Card, Row, Col} from "react-bootstrap"
import {TokenCard} from "./TokenCard"
import { BiCloud } from "react-icons/bi"

export const Profile = () => {
    const {user} = useAuth0()
    const team = user ? user['http://terminusdb.com/schema/system#team'] : ''
    console.log("user", user)
    let remote_url = ''
    if(process.env.FEEDBACK_URL ){
        remote_url += process.env.FEEDBACK_URL.endsWith('/') ? process.env.FEEDBACK_URL : process.env.FEEDBACK_URL+'/'
    }
    const cloud_url= `${remote_url}${team}/`

    return <Layout sideBarContent={<LeftSideBar/>}>
        <div style={{marginTop: "70px"}}>
            {user && 
            <Row>
            <Col sm="3" className="ml-3">
            <Card className="shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5">
                <div className="cowduck-top-sec bg-transparent border-0 text-center "> 
                    <img className="card-img cowduck-feedback-avatar large-avatar rounded-circle mx-auto" src={user.picture}/>
                </div>
               
                <Form className="mt-3 mb-2 ml-3" >
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
            </Card>
            </Col>
            <Col className="mt-5 mr-5">
                <Card className="p-3 mb-3">
                    <h4 className="mt-4"><strong>Cloud Server Url</strong></h4>
                    <label className="description">The Url can be used to access the TerminusDB Cloud Server</label>
				    <hr className="my-space mt-4 mb-2" />
                    <h5><strong className="text-success">{cloud_url}</strong></h5>
                    <hr className="my-space mt-2 mb-2" />
                    <label className="description">Python client example code to connect to the cloud</label>
                    <Alert variant="secondary">
                        <p>#!/usr/bin/python3</p>
                        <p>from terminusdb_client import WOQLClient</p>
                        <p>key = "eyJhbGciOiJSUzI1NiIsInR5cC..."</p>
                        <p>{`client = WOQLClient("${cloud_url}")`}</p>
                        <p>{`client.connect(account="${team}", jwt_token=key)`}</p>
                        
                    </Alert>
                </Card>
                <TokenCard/>           
            </Col>
            </Row>}
        </div>
    </Layout>
}