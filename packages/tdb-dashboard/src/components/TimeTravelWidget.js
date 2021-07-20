import React, {useEffect, useState} from "react"
import {Card, Button, Row, Col, Form} from "react-bootstrap"
import {BiTimer} from "react-icons/bi"
import {WOQLClientObj} from '../init-woql-client'
import {TimeTravel}  from "./TimeTravel"
import {AiOutlineClose} from "react-icons/ai"
import {BsBriefcase} from "react-icons/bs"
//import AnchorLink from 'react-anchor-link-smooth-scroll'

export const TimeTravelWidget = (props) => {
    const [showTimeTravel, setShowTimeTravel] = useState(false)
      
    //const [iconColor, setIconColor] = useState("#00bc8c")

    const {branches,branch,chosenCommit}=WOQLClientObj()
    
    const [cssWidget, setCssWidget] = useState("")
    const [cssTimeTravel, setCssTimeTravel] = useState("display-none")

    const iconColor = chosenCommit && chosenCommit.time ? "#f39c12" : "#00bc8c"

   /* useEffect(() => {
      // set status and current time on time travel jump
      function getCommitTime() {
        if (consoleTime) {
            //if(setCurrentCommit) setCurrentCommit(printts(consoleTime))
            if(setIconColor) setIconColor("#f39c12")
            if(setStatus) setStatus("text-warning")
        }
        else {
            setIconColor("#00bc8c")
            if(setStatus)setStatus("text-muted")
        }
      }


      getCommitTime(consoleTime, null, null, setIconColor)
    }, [consoleTime])*/

    function handleTimeTravel() {
      setCssTimeTravel("")
      setCssWidget("display-none")
      setShowTimeTravel(true)
    }

    function handleCloseTimeTravel () {
      setCssWidget("")
      setCssTimeTravel("display-none")
      setShowTimeTravel(false)
    }

    function handleOnChange (e) {
      updateBranches(e.target.value)
    }

    const BranchOptions = ({branchList}) => {
      if(!branchList) return []
      let opts = []
      for (var item in branchList) {
        opts.push(
          <option key={`opt_${item}`}>{item}</option>
        )
      }
      return opts
    }

  return <React.Fragment>

      {!showTimeTravel && 
        <Button className=" time-travel-control time-travel-widget" title="Time Travel through history of Data Product" onClick={handleTimeTravel} style={{top: "55"}}> 
            <h3  style={{color: iconColor}}><BiTimer /></h3>
        </Button>
      }  

      {/*
        <AnchorLink href={`#${chosenCommit.commit}`}>
          <Button className={` ${cssWidget} time-travel-control time-travel-widget`} title="Time Travel through history of Data Product" onClick={handleTimeTravel} style={{top: "55"}}> 
            <h3  style={{color: iconColor}}><BiTimer /></h3>
          </Button>
        </AnchorLink> 
      */}

    {<div className={` ${cssTimeTravel} time-travel-control`}>
        <Card className="mt-5">
            <Card.Header className="d-flex justify-content-end"> 
                <h6 className="mr-4 mt-2">Time travel on collection  -  <strong className="text-success">{branch}</strong></h6>
                <BsBriefcase className="me-2 mr-5 mt-2" style={{fontSize: "20px"}}/>
                <Form className="mb-0 mr-4 ml-3">
                    <Form.Group controlId="timetravel_select" className="mb-0">
                        <Form.Control as="select" 
                          onChange={handleOnChange} 
                          className="bg-transparent border-1-light text-light mb-0" 
                          style={{width: "270px"}}>
                            <option defaultValue>{branch}</option>
                            <BranchOptions branchList={branches}/>
                        </Form.Control>
                    </Form.Group>
                </Form>
                <div className="float-right d-flex ml-4">
                  <Button variant="info" className="mr-3" title={"Close Time Travel View"} onClick={handleCloseTimeTravel}>
                      <AiOutlineClose className="me-2"/>
                  </Button>
                </div>
                
            </Card.Header>
            <Card.Body className="time-travel-card-body overflow-auto">
              <TimeTravel/>
   
            </Card.Body>   
          </Card>
      
    </div>}

  </React.Fragment>

    
}
//<TimeTravel/>