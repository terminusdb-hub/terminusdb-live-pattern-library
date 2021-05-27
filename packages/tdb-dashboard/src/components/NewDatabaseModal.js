
import React, {useState} from "react"
import {Modal, Button, Form} from "react-bootstrap" 
import {CREATE_NEW_DATA_PRODUCT_BUTTON, newDataProductForm} from "./constants"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {FaPlus} from "react-icons/fa"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT} from "./constants"

export const NewDatabaseModal = ({showNewDataProductModal, setShowNewDataProductModal, setNewDataProductInfo, loading}) => {

    const [id, setID]=useState(false)
    const [label, setLabel]=useState(false)
    const [description, setDescription]=useState(false)

    function handleCreate () {
        event.preventDefault()
        let dbInfo = {id: id, label: label, comment: description}
        if(setNewDataProductInfo) setNewDataProductInfo(dbInfo)
    }

    function handleOnBlur (e) {
        if(e.target.id == newDataProductForm.id.id)
            setID(e.target.value)
        else if (e.target.id == newDataProductForm.label.id)
            setLabel(e.target.value)
        else if (e.target.id == newDataProductForm.description.id)
            setDescription(e.target.value)
    }


    function handleClose (e) {
        if(setShowNewDataProductModal) setShowNewDataProductModal(false)
    }
    
    return <Modal size="lg" className="modal-dialog-right" show={showNewDataProductModal} onHide={handleClose}>
        {loading && <Loading message={`Creating ${label} ...`} type={PROGRESS_BAR_COMPONENT}/>}
        <Modal.Header>
            <Modal.Title className="h6"><FaPlus className="me-2 mr-3"/>Create a New Data Product </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="p-5">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control required id={newDataProductForm.id.id} type={"text"} onBlur={handleOnBlur} placeholder={newDataProductForm.id.placeholder} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control required id={newDataProductForm.label.id} type={"text"} onBlur={handleOnBlur} placeholder={newDataProductForm.label.placeholder} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control id={newDataProductForm.description.id} as="textarea"  onBlur={handleOnBlur} rows="5" placeholder={newDataProductForm.description.placeholder} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <TDBReactButton onClick={handleCreate} className= "float-right" config={CREATE_NEW_DATA_PRODUCT_BUTTON}/>
        </Modal.Footer>
    </Modal>
}