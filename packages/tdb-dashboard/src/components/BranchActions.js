
import React, {useState} from "react"
import {Row, Col, Form, Card, Button} from 'react-bootstrap'
import {branchActionConfig, squashFormConfig, resetFormConfig, RESET_BUTTON_CONFIG, CANCEL_BUTTON, SQUASH_BUTTON_CONFIG} from './constants'
import {BiGitMerge} from "react-icons/bi"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {AiOutlineUndo, AiOutlineCompress, AiOutlineDelete, AiOutlineCheckCircle} from "react-icons/ai"
import {DBContextObj} from "../hooks/DBContext"
import {BranchControl} from "../hooks/BranchControl"

export const BranchActions = ({woqlClient, branch, handleClose, setRefresh}) => {

    const {branches, ref, updateBranches, setHead}=DBContextObj()
    const [resetForm, setResetForm] = useState(false)
    const [squashForm, setSquashForm] = useState(false)
    const [commit, setCommit] = useState(false)

    const { 
        reportAlert,
        handleDelete,
        handleOptimize,
        handleReset,
        handleSquash
    } = BranchControl(woqlClient, branches, branch, ref, updateBranches, setHead)


    function onDelete () {
        if(handleDelete) handleDelete(branch)
        if(handleClose) handleClose()
    }

    function onOptimize () {
        if(handleOptimize) handleOptimize(branch)
    }

    function onReset () {
        setResetForm(true)
        setSquashForm(false)
    }

    function onSquash () {
        setSquashForm(true)
        setResetForm(false)
    }

    function handleOnBlur (e) {
        setCommit(e.target.value)
    }

    function submitReset () {
        if(handleReset) handleReset(branch, commit, setRefresh)
        setResetForm(false)
    }

    function submitSquash () {
        if(handleSquash) handleSquash(branch, commit, setRefresh)
        setSquashForm(false)
    }


    return <Row>
        <Col lg={12}>
            <div className="flex-column flex-sm-row d-flex ">
                <Button variant="light" className="m-1" title={branchActionConfig.merge.title}>
                    <BiGitMerge className="me-2" /> {branchActionConfig.merge.label}
                </Button>
                <Button variant="light" className="m-1" onClick={onReset}  title={branchActionConfig.reset.title}>
                    <AiOutlineUndo className="me-2" /> {branchActionConfig.reset.label}
                </Button>
                <Button variant="light" className="m-1" title={branchActionConfig.squash.title} onClick={onSquash}>
                    <AiOutlineCompress className="me-2" /> {branchActionConfig.squash.label}
                </Button>
                {/*<Button variant="light" className="m-1" title={branchActionConfig.optimize.title} onClick={onOptimize}>
                    <AiOutlineCheckCircle className="me-2" /> {branchActionConfig.optimize.label}
                </Button>*/}
                <Button variant="danger" className="m-1" title={branchActionConfig.delete.title} onClick={onDelete}>
                    <AiOutlineDelete className="me-2" /> {branchActionConfig.delete.label}
                </Button>
                
            </div>

            {reportAlert && <div className="d-grid pb-3">
                {reportAlert}
            </div>}

            {resetForm && <Card variant="dark" border="light" className="mt-5">
                <Card.Header>
                    <b>{resetFormConfig.title}</b>
                    <TDBReactButton onClick={(e) => setResetForm(false)} className= "cancel-button" config={CANCEL_BUTTON}/>
                </Card.Header>
                <Card.Body>
                    <Card.Text className="text-muted">
                        {resetFormConfig.description}
                    </Card.Text>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control required id={resetFormConfig.id} type={"text"} onBlur={handleOnBlur} placeholder={resetFormConfig.placeholder} />
                        </Form.Group>
                        
                        <TDBReactButton onClick={submitReset} className= "float-right" config={RESET_BUTTON_CONFIG}/>
                    </Form>
                </Card.Body>
            </Card>}

            {squashForm && <Card variant="dark" border="light" className="mt-5">
                    <Card.Header>
                        <b>{squashFormConfig.title}</b>
                        <TDBReactButton onClick={(e) => setSquashForm(false)} className= "cancel-button" config={CANCEL_BUTTON}/>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className="text-muted">
                            {squashFormConfig.description}
                        </Card.Text>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control required id={squashFormConfig.id} type={"text"} onBlur={handleOnBlur} placeholder={squashFormConfig.placeholder} />
                            </Form.Group>
                            
                            <TDBReactButton onClick={submitSquash} className= "float-right" config={SQUASH_BUTTON_CONFIG}/>
                        </Form>
                    </Card.Body>
                </Card>
            }
        </Col>
  </Row>
}