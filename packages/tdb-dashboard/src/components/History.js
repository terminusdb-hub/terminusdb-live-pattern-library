import React, {useEffect, useState} from "react"
import {Card, Button} from "react-bootstrap"
import {BiTimer} from "react-icons/bi"
import {AiOutlineClose} from "react-icons/ai"
import {TimelineCommits} from "./TimelineCommits"
import {DBContextObj} from "../hooks/DBContext"
import {WOQLClientObj} from '../init-woql-client'
import {TERMINUS_SUCCESS, TIME_TRAVEL_BUTTON} from "./constants"
import {Alerts} from "../components/Alerts"
import {CANCEL_BUTTON} from "./constants"

export const History = ({onClose}) => {
    const {woqlClient, dataProduct} = WOQLClientObj()
    const {setHead, branch, ref, branches, DBInfo} = DBContextObj()
    const [chosenCommit, setChosenCommit] = useState({}) 
    const [disbaled, setDisabled] = useState(true)
    const [reportAlert, setReportAlert] = useState(false)

	const setSelectedCommit=(e)=>{
        if(setHead){
           setHead(branch, chosenCommit)
           let message = `The state of data product has been set to date ${chosenCommit.label}`
           setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert}/>)
        }
    }

    useEffect(() => {
        if(chosenCommit) {
            if(chosenCommit.label !== "No Value") {
                setDisabled(false)
            }
        } 
    }, [chosenCommit])


    if(!branches || !dataProduct) return null

    let firstCommit = DBInfo.created || null
    let consoleTime = null


    return <React.Fragment>
           <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
           <Card className="mt-5 mr-4 mb-5">
            <Card.Header as="h3"> 
                Time travel on collection  -  <strong className="text-success">{branch}</strong>
                <div className="float-right d-flex">
                    <Button variant="light" className="mr-3" title={"Close History View"} onClick={(e) => onClose(false)}>
                        <AiOutlineClose className="me-2"/>{CANCEL_BUTTON.label}
                    </Button>
                </div>
            </Card.Header>
            <Card.Body> 
                {reportAlert && <React.Fragment>{reportAlert}</React.Fragment>}
                <TimelineCommits
                    branch={branch}
                    woqlClient={woqlClient}
                    headMessage="Time Travel to this Commit"
                    currentCommit={ref}
                    currentStartTime={consoleTime}
                    firstCommitTime={firstCommit}
                    onChange={setChosenCommit}
                />
            </Card.Body>
            <Card.Footer>
                <div className="float-right d-flex">
                    <Button disabled={disbaled} variant="info" className="mr-3" title={"Time Travel to this Commit"} onClick={setSelectedCommit}>
                        <BiTimer className="me-2"/>{TIME_TRAVEL_BUTTON}
                    </Button>
                </div>
            </Card.Footer>
        </Card>
        </React.Fragment>
}
