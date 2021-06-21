import React from "react"
import {Col, Card, Button, Row} from "react-bootstrap"
import {NoDataProductSelectedStyle, NO_DATA_PRODUCT_SELECTED_MESSAGE} from "./constants"
import {BsFillChatSquareDotsFill} from "react-icons/bs"
import {AiOutlineDatabase} from "react-icons/ai"

export const NoDataProductSelected = (props) => {

    return <div>
        <div style={NoDataProductSelectedStyle}>
            <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
                <img src="../assets/favicon-dark.png" style={{width: "5%"}}/>
                <h1 className="text-dark mt-5">
                    TerminusX
                </h1>
            </Col>
            <Col className="text-center d-block align-items-center justify-content-center">
                <h2>Welcome to TerminusX. Let's get you started!</h2>
                <h6>Create your first data product in few steps awway.</h6>
                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                        <Card size="sm" border="light" className="shadow-sm mt-5">
                            <Card.Body>
                                <div>
                                    <h4><BsFillChatSquareDotsFill className="mr-4"/>Interactive Tutorial</h4>
                                    <h5 className="mb-1">Step by step guide to get you started.</h5>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}></Col>
                </Row>

                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                        <Card size="sm" border="light" className="shadow-sm mt-5">
                            <Card.Body>
                                <div className="d-none d-sm-block">
                                    <h4> <AiOutlineDatabase className="mr-4"/> Launch an example data product</h4>
                                    <h5 className="mb-1">Get a sample data product running with a single click.</h5>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}></Col>
                </Row>
            
            </Col>
        </div>
    </div>
    /*return <div style={NoDataProductSelectedStyle}>
        <Col xs={12} className="text-center d-block align-items-center justify-content-center">
            <img src="../assets/favicon-dark.png" style={{width: "10%"}}/>
            <h1 className="text-dark mt-5">
                {NO_DATA_PRODUCT_SELECTED_MESSAGE}
            </h1>
        </Col>
    </div>*/
}