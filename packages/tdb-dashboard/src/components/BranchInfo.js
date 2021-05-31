import React, {useState, useEffect} from "react"
import {Card} from 'react-bootstrap'
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {CANCEL_BUTTON, CREATE_NEW_BRANCH_BUTTON, newBranchForm} from "./constants"
import {Form, Button, Modal} from "react-bootstrap"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT, SWITCH_TO_BRANCH} from "./constants"
import {Alerts} from "./Alerts"
import {TERMINUS_WARNING} from "./constants"
import {legalURLID} from "./utils"
import {BranchActions} from "./BranchActions"
import {BranchDetails} from "./BranchDetails"
import {CommitLogs, CommitView} from "./CommitLogs"


function checkSubmission(newID, branches, setReportAlert){
    if(newID && newID.length){
        let nid = newID.trim()
        if(typeof branches[nid] != "undefined"){
            let message = "A branch already exists with the same ID - choose a new ID"
            setReportAlert(<Alerts message={message} type={TERMINUS_WARNING} onCancel={setReportAlert}/>)
            return false
        }
        else {
            if(!legalURLID(nid)){
                let message = "Branch IDs can only include lowercase characters, numbers and underscores and be no more than 40 characters long"
                setReportAlert(<Alerts message={message} type={TERMINUS_WARNING} onCancel={setReportAlert}/>)
                return false
            }
            return true
        }
    }
    else {
        let message = "You must supply an ID for the new branch"
        setReportAlert(<Alerts message={message} type={TERMINUS_WARNING} onCancel={setReportAlert}/>)
        return false
    }
}


export const NewBranchCard = ({onCancel, setNewBranchInfo, loading, branches}) => {
    const [id, setID]=useState(false)
    const [select, setSelect]=useState(newBranchForm.select.head)
    const [reportAlert, setReportAlert]=useState(false)


    function handleCancel (e) {
        if (onCancel) onCancel(false) // set show new db card to false
    }

    function handleCreate (e) {
        event.preventDefault()
        if (checkSubmission(id, branches, setReportAlert)) {
            setNewBranchInfo({id: id, branchType: select})
        }
    }

    function handleOnBlur (e) {
        setID(e.target.value)
    }

    function handleOnChange (e) {
        setSelect(e.target.value)
    }

    return <Card border="info">
        {loading && <Loading message={`Creating branch ${id} ...`} type={PROGRESS_BAR_COMPONENT}/>}
        <Card.Header>
            <b>{newBranchForm.header}</b>
            <TDBReactButton onClick={handleCancel} className= "cancel-button" config={CANCEL_BUTTON}/>
        </Card.Header>
        {reportAlert && reportAlert}
        <Card.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control required id={newBranchForm.id.id} type={"text"} onBlur={handleOnBlur} placeholder={newBranchForm.id.placeholder} />
                </Form.Group>
                <Form.Select onChange={handleOnChange} className="bg-transparent border-1-light text-light">
                    <option defaultValue>{newBranchForm.select.head}</option>
                    <option>{newBranchForm.select.empty}</option>
                    <option>{newBranchForm.select.choose}</option>
                </Form.Select>
                <TDBReactButton onClick={handleCreate} className= "float-right" config={CREATE_NEW_BRANCH_BUTTON}/>
            </Form>
        </Card.Body>
    </Card>
}
 
export const BranchInfoModal = ({woqlClient, branch, showDefault, handleClose, handleSwitch, dataProduct, setSelectedCommit, selectedCommit}) => {
    const [refresh, setRefresh] = useState(0)
    

    function handleSwitchToBranch () {
        if(handleSwitch) handleSwitch(branch)
        if(handleClose) handleClose()
    }

    const CommitInfo = () => {
        if(selectedCommit) return <CommitView woqlClient={woqlClient} selectedCommit={selectedCommit} onClose={setSelectedCommit}/>
        else return <CommitLogs woqlClient={woqlClient} branch={branch} refresh={refresh} setSelectedCommit={setSelectedCommit}/>
    }

    return <Modal size="xl" as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title className="h6">Switched to branch - <strong className="text-info"> {branch} </strong></Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="p-5">
            <BranchActions branch={branch} handleClose={handleClose} woqlClient={woqlClient} setRefresh={setRefresh}/>
            <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
            
            <BranchDetails woqlClient={woqlClient} branch={branch} dataProduct={dataProduct}/>
            <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
            
            
            <CommitInfo/>
    
        </Modal.Body>
        <Modal.Footer>
            <Button variant="info" onClick={handleSwitchToBranch}>
                {SWITCH_TO_BRANCH + branch}
            </Button>
       
        </Modal.Footer>
    </Modal>
}