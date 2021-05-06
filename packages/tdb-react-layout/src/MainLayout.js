import React  from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {IconBar} from './IconBar'
import SplitPane from 'react-split-pane'
import {MainNavBar} from './MainNavBar'
import {DatabaseCard}  from './DatabaseCard'
export function MainLayout(props){
    return <Container fluid className="p-0 flex-row">                              
                <SplitPane split="vertical" minSize={70} defaultSize={350} primary="first">                                                    
                    <div className="side-black h-100"><IconBar />
                        side bar</div>
                    <div className="h-100">
                      <MainNavBar/>
                      <Row fluid className="m-4" >
                        <Col className="col-md-4">
                          <DatabaseCard/>
                        </Col>
                        <Col className="col-md-4">
                          <DatabaseCard/>
                        </Col>
                        <Col className="col-md-4">
                          <DatabaseCard/>
                        </Col>
                        <Col className="col-md-4">
                          <DatabaseCard/>
                        </Col>
                        <Col className="col-md-4">
                          <DatabaseCard/>
                        </Col>
                        <Col className="col-md-4">
                          <DatabaseCard/>
                        </Col>
                      </Row>                    
                    </div>
                </SplitPane>
            </Container>




}
