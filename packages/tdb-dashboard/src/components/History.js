import React from "react"
import {Card, Button} from "react-bootstrap"
import {CANCEL_BUTTON} from "./constants"
import {AiOutlineClose} from "react-icons/ai"
import {TimelineCommits} from '@terminusdb/terminusdb-react-components'
import {DBContextObj} from "../hooks/DBContext"
import {WOQLClientObj} from '../init-woql-client'

export const History = ({setDataProductSettings}) => {
    const {woqlClient, dataProduct} = WOQLClientObj()
    const {setHead, branch, ref, branches} = DBContextObj()

	const setCurrentItem=(item)=>{
        setHead(branch, item)
	}

    if(!branches || !dataProduct) return null

    //let firstCommit = DBInfo.created || null
    let firstCommit = null, consoleTime = null


    return <Card className="mt-5 mr-4">
        <Card.Header as="h3"> 
            History 
            <div className="float-right d-flex">
                <Button variant="light" className="mr-3" title={CANCEL_BUTTON.label.title} onClick={(e) => setDataProductSettings(false)}>
                    <AiOutlineClose className="me-2"/>{CANCEL_BUTTON.label}
                </Button>
            </div>
        </Card.Header>
        <Card.Body>
            <TimelineCommits
                branch={branch}
                woqlClient={woqlClient}
                setHead={setCurrentItem}
                headMessage="Time Travel to this Commit"
                currentCommit={ref}
                currentStartTime={consoleTime}
                firstCommitTime={firstCommit}
            />
        </Card.Body>
    </Card>
}