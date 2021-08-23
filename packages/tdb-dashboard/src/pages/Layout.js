import React, {useState} from 'react'
import {Container, Card} from "react-bootstrap"
import {MainNavBar} from '../components/MainNavBar'
import SplitPane from 'react-split-pane'
import {IconBar} from "../components/IconBar"
import {TimeTravelContainer} from "../components/TimeTravelContainer"
import {WOQLClientObj} from '../init-woql-client'
import {AiOutlineMail} from "react-icons/ai"
import {Feedback} from "./Feedback"

export const Layout = (props) => { 
    const {dataProduct} = WOQLClientObj()

    const [showTimeTravel, setShowTimeTravel] = useState(false)
    const [showFeedbackForm, setShowFeedbackForm] = useState(false)

    return <Container fluid className="p-0 flex-row">                              
            <SplitPane split="vertical" minSize={70} defaultSize={350} primary="first">                                                    
                <div className="side-black h-100 d-flex">
                    <IconBar />
                    {props.sideBarContent}
                </div>
                <div className="h-100 main-content">
                    <MainNavBar setShowTimeTravel={setShowTimeTravel}/>
                    <div class="container-fluid">
                       {props.children} 
                       <TimeTravelContainer show={showTimeTravel} setShowTimeTravel={setShowTimeTravel}/>
                    </div>
                    <div>
                        {!showFeedbackForm && <Card className="feedback-card" 
                            onClick={(e) => setShowFeedbackForm(true)}>
                            <Card.Body className="d-flex justify-content-center">
                                <AiOutlineMail className="feedback-card-icon-color" style={{fontSize: "30px"}}/> 
                            </Card.Body>
                        </Card>}
                        {
                            showFeedbackForm && <Feedback setShowFeedbackForm={setShowFeedbackForm}/>
                        }
                    </div>
                </div>
            </SplitPane>
        </Container>
}




