import React  from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {IconBar} from './IconBar'
import SplitPane from 'react-split-pane'
import {MainNavBar} from './MainNavBar'
import {DatabaseCard}  from './DatabaseCard'


export function MainLayout(props){

  let list = props.list || []


    return <Container fluid className="p-0 flex-row">
      
        <SplitPane split="vertical" minSize={70} defaultSize={350} primary="first">                                                    
            
            <div className="side-black h-100">
                <IconBar />
            </div>

            <div className="h-100">

              {<MainNavBar/>}
              
              {/*<Row fluid className="m-4" >

                {list.map(item => <Col className="col-md-6 ">
                  <DatabaseCard title={item.label} description={item.comment} id={item.id}/>
                </Col>)}
                
                
              </Row>   */}

              <div class="row equal">
                {list.map(item => <div class="col-md-6 d-grid pb-3">
                    <DatabaseCard title={item.label} description={item.comment} id={item.id}/>
                  </div>)}
              </div>

            </div>
        </SplitPane>
    </Container>




}


/*
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
                */
