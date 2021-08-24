import React, {useState} from "react"
import {Layout} from "./Layout"
import {LeftSideBar} from "../components/LeftSideBar"
import {useAuth0} from "../react-auth0-spa"
import {Button, Form, Card, Row, Col} from "react-bootstrap"
import {TokenCard} from "./TokenCard"
import { BsClipboard } from "react-icons/bs"
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {EDITOR_READ_OPTIONS} from "../components/constants"
import {copyToClipboard} from "../components/utils"

export const Profile = () => {
    const {user} = useAuth0()
    const team = user ? user['http://terminusdb.com/schema/system#team'] : ''
   
    let remote_url = ''
    if(process.env.FEEDBACK_URL ){
        remote_url += process.env.FEEDBACK_URL.endsWith('/') ? process.env.FEEDBACK_URL : process.env.FEEDBACK_URL+'/'
    }
    const cloud_url= `${remote_url}${team}/`

    const [value, setValue]=useState(false)

    function handleCopy () {
        let snippet = `#!/usr/bin/python3 \nfrom terminusdb_client import WOQLClient\nkey = "eyJhbGciOiJSUzI1NiIsInR5cC..."\nclient = WOQLClient("${cloud_url}")\nclient.connect(account="${team}", jwt_token=key) `
        copyToClipboard(snippet)
    }

    /* adding a comment for text */

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
                    <Form.Group as={Row} className="mb-3" controlId={"team"}>
                        <Col sm="4">
                            <Form.Label >
                                Team
                            </Form.Label>
                        </Col>
                        <Col sm="8">
                            <Form.Label>
                                {team}
                            </Form.Label>
                        </Col>
                    </Form.Group>
                </Form>
            </Card> 
            </Col>
            <Col className="mt-5 mr-5">
                <Card className="p-3 mb-3">
                    <span className="d-block mb-4">
                        <h4 className="mt-4"><strong>Cloud Server Url</strong></h4>
                        <h6 className=" escription text-muted">(Copy the below URL into a browser to access TerminusDB Cloud Server)</h6>
                        <h5><strong className="text-success">{cloud_url}</strong></h5>
                    </span>
                    
                    <span className="d-flex">
                        <h6 className="description fw-bold text-muted w-100 float-left">Python client example code to connect to the cloud</h6>

                    </span>
                    <CodeMirror
                        value={`#!/usr/bin/python3 \nfrom terminusdb_client import WOQLClient\nkey = "eyJhbGciOiJSUzI1NiIsInR5cC..."\nclient = WOQLClient("${cloud_url}")\nclient.connect(account="${team}", jwt_token=key) `}
                        options={EDITOR_READ_OPTIONS}
                        onChange={(editor, data, value) => {
                            setValue(value)
                        }}
                    />
                    <span className="mb-4"/>
                </Card>
                <TokenCard/>           
            </Col>
            </Row>}
        </div>
    </Layout>
}

/*

 <Alert variant="secondary">
                        <p>#!/usr/bin/python3</p>
                        <p>from terminusdb_client import WOQLClient</p>
                        <p>key = "eyJhbGciOiJSUzI1NiIsInR5cC..."</p>
                        <p>{`client = WOQLClient("${cloud_url}")`}</p>
                        <p>{`client.connect(account="${team}", jwt_token=key)`}</p>
                    </Alert> */