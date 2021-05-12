import React from "react"
import {ProgressBar} from "react-bootstrap"
import {Container, Row} from "@themesberg/react-bootstrap"

export const Loading = (props) => {

    const percentage= 100

    return <Container>
        <Row>
            <ProgressBar now={percentage} animated className="progress-bar-position" />
        </Row>
        <Row className="justify-content-xl-center">
            {props.message}
        </Row>
        
    </Container>
}