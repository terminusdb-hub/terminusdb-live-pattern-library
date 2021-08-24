import React from "react"
import {Card, Button} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {AiOutlineClose} from "react-icons/ai"
import {TimeTravel} from "./TimeTravel"

export const TimeTravelContainer = ({show, setShowTimeTravel}) => { 
    const {branches, branch, chosenCommit}=WOQLClientObj()

    let sliderClass = 'time-travel-slider'
    if(show) {
        sliderClass = 'time-travel-slider open'
    }

    return <div className={sliderClass}>
        <Card variant="dark" className="time-travel-scroller">
                <Card.Header className="d-flex">
                    <h6 className="mr-4 mt-2 w-100 float-left">Time travel on collection  -  <strong className="text-success">{branch}</strong></h6>
                    <div className="float-right w-100 text-right">
                        <Button variant="light" className="mr-3" title={"Close Time Travel View"} onClick={(e) => setShowTimeTravel(false)}>
                            <AiOutlineClose />
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <TimeTravel show={show}/>
                </Card.Body>
        </Card>
    </div>
}