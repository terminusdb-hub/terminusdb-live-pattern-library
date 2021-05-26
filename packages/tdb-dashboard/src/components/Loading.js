import React from "react"
import {ProgressBar} from "react-bootstrap"
import {Container, Row} from "react-bootstrap"
import {PROGRESS_BAR_COMPONENT} from "./constants"

export const Loading = (props) => {

    const percentage= 100

    if(props.type == PROGRESS_BAR_COMPONENT) 
        return <ProgressBar now={percentage} animated label={props.message}/>

    return <Container>
        <Row>
            <ProgressBar now={percentage} animated className="progress-bar-position" />
        </Row>
        <Row className="justify-content-xl-center">
            {props.message}
        </Row>
        
    </Container>
}