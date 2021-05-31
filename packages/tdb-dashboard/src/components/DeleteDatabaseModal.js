import React, {useState} from "react"
import {Modal, Button, Form} from "react-bootstrap" 
import {deleteDataProductForm} from "./constants"
import {AiOutlineDelete} from "react-icons/ai"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT} from "./constants"

export const DeleteDatabaseModal = ({showDeleteDataProductModal, setShowDeleteDataProductModal, setDeleteDataProductInfo, loading, dataProductDetails}) => {
    const [id, setID]=useState(false)

    function handleClick () {
        event.preventDefault()
        let dbInfo = {id: id}
        if(setDeleteDataProductInfo) setDeleteDataProductInfo(dbInfo)
    }

    function handleOnBlur (e) {
        if(e.target.id == deleteDataProductForm.id.id)
            setID(e.target.value)
    }
 
    function handleClose (e) {
        if(setShowDeleteDataProductModal) setShowDeleteDataProductModal(false)
    }
    
    return <Modal size="lg" className="modal-dialog-right" show={showDeleteDataProductModal} onHide={handleClose}>
        {loading && <Loading message={`Deleting Data Product ${dataProductDetails.id} ...`} type={PROGRESS_BAR_COMPONENT}/>}
        <Modal.Header>
            <Modal.Title className="h6">{`Delete Data Product - ${dataProductDetails.label}`} </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="p-5">
            <div className="d-flex align-items-center col-md-12 mb-3">
                <h6 class="fw-normal text-muted mb-2">Data Product ID </h6>
                <h6 className="ml-3">{dataProductDetails.id}</h6>
            </div>
            <div className="d-flex align-items-center col-md-12 mb-3">
                <h6 class="fw-normal text-muted mb-2">Name </h6>
                <h6 className="ml-3">{dataProductDetails.label}</h6>
            </div>
            <div className="d-flex align-items-center col-md-12 mb-3">
                {dataProductDetails.comment}
            </div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control required id={deleteDataProductForm.id.id} type={"text"} onBlur={handleOnBlur} placeholder={deleteDataProductForm.id.placeholder} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" title={`Delete Data Product ${dataProductDetails.id}`} onClick={handleClick}>
                <AiOutlineDelete className="me-2" /> Delete 
            </Button>
        </Modal.Footer>
    </Modal>
}

