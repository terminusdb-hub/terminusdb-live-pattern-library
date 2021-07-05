
import React, {useState, useEffect} from "react"
import { Card, Row, Col, Container } from "react-bootstrap"
import packageJson from "../../package.json"
import {WOQLClientObj} from '../init-woql-client'
import {Layout} from "./Layout"
import {LeftSideBar} from "../components/LeftSideBar"
import {INFO} from "../routing/constants"

export const TerminusInfo = (props) => {

    const {woqlClient} = WOQLClientObj()
    const [serverVersion, setServerVersion]=useState(false)

    useEffect(() => {
        woqlClient.info().then((results) => {
            setServerVersion(results["api:info"].terminusdb.version)
        })
    }, [woqlClient])

    return <Layout sideBarContent={<LeftSideBar route={INFO}></LeftSideBar>}>
        <Container style={{marginTop: "125px"}}>
            <Card className="shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5" style={{width: "500px"}}>
                <div className="cowduck-top-sec bg-transparent border-0 text-center "> 
                    <img className="card-img cowduck-feedback-avatar large-avatar rounded-circle mx-auto" src="../assets/CowDuckHead.png"/>
                </div>
                <div>
                    <h5 className="text-center mt-2">About TerminusX  </h5>
                    <Row className="w-100 mt-5 ml-5">
                        <Col md={5} className="text-muted">Console Version</Col>
                        <Col md={7}>{packageJson.version}</Col>
                    </Row>
                    <Row className="w-100 mt-3 ml-5">
                        <Col md={5} className="text-muted">Server Version</Col>
                        <Col md={7}>{serverVersion}</Col>
                    </Row>
                    <Row className="w-100 mt-3 ml-5 mb-4">
                        <Col md={5} className="text-muted">Server Url</Col>
                        <Col md={7}>{woqlClient.connectionConfig.serverURL()}</Col>
                    </Row>
                </div>
            </Card>
        </Container>
    </Layout>
}