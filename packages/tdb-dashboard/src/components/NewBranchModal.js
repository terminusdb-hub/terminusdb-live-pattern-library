import React, {useState, useEffect} from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {CREATE_NEW_BRANCH_BUTTON, newBranchForm} from "./constants"
import {Form, Button, Modal} from "react-bootstrap"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT} from "./constants"
import {Alerts} from "./Alerts"
import {TERMINUS_WARNING} from "./constants"
import {legalURLID} from "./utils"
import {DBContextObj} from "../hooks/DBContext"
import {FaPlus} from "react-icons/fa"

export const NewBranchModal = ({newBranch, onCancel, setNewBranchInfo, loading}) => {
    const {branches, branch, ref, updateBranches}=DBContextObj()

    const [id, setID]=useState(false)
    const [select, setSelect]=useState(newBranchForm.select.head)
    const [reportAlert, setReportAlert]=useState(false)

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


    return  <Modal size="lg" className="modal-dialog-right" show={newBranch} onHide={(e) => onCancel(false)}>
        {loading && <Loading message={`Creating ${id} ...`} type={PROGRESS_BAR_COMPONENT}/>}
        <Modal.Header>
            <Modal.Title className="h6"><FaPlus className="me-2 mr-3"/>{newBranchForm.header}</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={(e) => onCancel(false)} />
        </Modal.Header>
        <Modal.Body className="p-5">
           {reportAlert && reportAlert}
           <Form>
                <Form.Group className="mb-3">
                    <Form.Control required id={newBranchForm.id.id} type={"text"} onBlur={handleOnBlur} placeholder={newBranchForm.id.placeholder} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control as="select" onChange={handleOnChange} className="bg-transparent border-1-light text-light">
                        <option defaultValue>{newBranchForm.select.head}</option>
                        <option>{newBranchForm.select.empty}</option>
                        <option>{newBranchForm.select.choose}</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <TDBReactButton onClick={handleCreate} className= "float-right" config={CREATE_NEW_BRANCH_BUTTON}/>
        </Modal.Footer>
    </Modal>
}

function checkSubmission(newID, branches, setReportAlert){
    if(newID && newID.length){
        let nid = newID.trim()
        if(typeof branches[nid] != "undefined"){
            let message = "A Collection already exists with the same ID - choose a new ID"
            setReportAlert(<Alerts message={message} type={TERMINUS_WARNING} onCancel={setReportAlert}/>)
            return false
        }
        else {
            if(!legalURLID(nid)){
                let message = "Collection IDs can only include lowercase characters, numbers and underscores and be no more than 40 characters long"
                setReportAlert(<Alerts message={message} type={TERMINUS_WARNING} onCancel={setReportAlert}/>)
                return false
            }
            return true
        }
    }
    else {
        let message = "You must supply an ID for the new Collection"
        setReportAlert(<Alerts message={message} type={TERMINUS_WARNING} onCancel={setReportAlert}/>)
        return false
    }
}
