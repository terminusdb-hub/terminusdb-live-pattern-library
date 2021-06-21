import React, {useState} from "react"
import {Card, Button, OverlayTrigger, Popover, Col, Row} from "react-bootstrap"
import {AiOutlineClose} from "react-icons/ai"
import {CANCEL_BUTTON, newBranchForm, USE_QUERY_CONFIG} from "./constants"
import {queryDescription} from "../queryDescription"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {trimWOQL} from "./utils"

export const QueryBuilder = ({showQueryBuilder}) => {

    const [info, setinfo] = useState(false)

    /* Description of selected query */
    const Documentation = ({info}) => { 
        return <Card  size="sm" className="query-description-card">
            <Card.Header>
                <strong className="mt-1">{trimWOQL(info.id)}</strong>
            </Card.Header>
            <Card.Body className="d-block">
                <h6>{info.description}</h6>
                {info.params.length>0 && <React.Fragment>
                    <h6>Params</h6>
                    <Params params={info.params}/>
                </React.Fragment>}
                {info.examples && <React.Fragment>
                    <h6>Examples</h6>
                    <code>{info.examples[0]}</code> <br/>
                    <TDBReactButton className="mb-0 float-right"
                        config={USE_QUERY_CONFIG} />
                </React.Fragment> }
                
            </Card.Body>
            
        </Card>
    }

    /* list of queries */
    const Queries = () => {
        let arr=[]

        function handleClick (e, item) {
            setinfo(item)
        }

        queryDescription.map((item) => {
            arr.push(<OverlayTrigger
                trigger="click"
                key={"left"}
                placement={"left"}
                overlay={
                
                  <div id={`popover-positioned-${"left"}`}>
                    <Documentation info={item}/>
                  </div>
                }
              >
                <pre variant="dark">{trimWOQL(item.id)}</pre>
            </OverlayTrigger>
            )
        })
        return arr
    } 

    /*const Queries = () => {
        let arr=[]

        function handleClick (e, item) {
            setinfo(item)
        }

        queryDescription.map((item) => {
            arr.push(<React.Fragment>
                <div className="query d-flex w-100" 
                    onClick={(e) => handleClick(e, item)}>
                    <pre className="query-name-pre">{trimWOQL(item.id)}</pre>
                    <br/>
                    {/*show && <Button className="query-description"> Use </Button>*//*}
                </div>
            </React.Fragment>)
        })
        return arr
    } */

    /* params of selected query */
    const Params = ({params}) => {
        let arr = []
        params.map(item => {
            arr.push(
                <React.Fragment>
                   {item.name}
                   {item.description}
                </React.Fragment>
            )
        })
        return arr
    }

    


    return <Card variant="dark">  
        <Card.Body className= "d-flex" style={{background: "#444"}}>
            <Col className="query-builder-card">
                <Queries/>
            </Col>
            {/*<Col md={8}>
                {info && <Documentation info={info}/>}
            </Col>*/}
        </Card.Body>
    </Card>
}