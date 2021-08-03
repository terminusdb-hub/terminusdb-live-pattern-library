
import React, {useState} from "react"
import {Modal, Button, Form} from "react-bootstrap" 
import {CREATE_NEW_DATA_PRODUCT_BUTTON, newDataProductForm} from "./constants"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {FaPlus} from "react-icons/fa"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT} from "./constants"
import {WOQLClientObj} from "../init-woql-client"

export const NewDatabaseModal = ({showModal, setShowModal}) => {
    const {
        woqlClient, 
        reconnectToServer
    } = WOQLClientObj()

    const [loading, setLoading] = useState(false)
    const [id, setID]=useState(false)
    const [label, setLabel]=useState(false)
    const [description, setDescription]=useState(false)
   
    function handleCreate (evt) {
        //evt.preventDefault()
        //evt.stopPropagation()
        let dbInfo = {id: id, label: label, comment: description, organization:woqlClient.organization()}
        if(woqlClient && dbInfo.id && dbInfo.label) {
            setLoading(true)
            woqlClient.createDatabase(dbInfo.id, dbInfo).then((res) => {
                setLoading(false)
                
            }).catch((err) => console.log(err))
            .finally(() => {
                setShowModal(false)
                reconnectToServer(dbInfo.id)
            })
        }
    }

    function handleOnBlur (e) {
        e.preventDefault()
        e.stopPropagation()
        if(e.target.id == newDataProductForm.id.id)
            setID(e.target.value)
        else if (e.target.id == newDataProductForm.label.id)
            setLabel(e.target.value)
        else if (e.target.id == newDataProductForm.description.id)
            setDescription(e.target.value)
    }

    //block the click propagation
    function onClickPrevent(e){
        e.preventDefault()
        e.stopPropagation()
    }

 
    function handleClose (e) {
        if(setShowModal) setShowModal(false)
    }
    
    return <Modal onClick={onClickPrevent} size="lg" className="modal-dialog-right" show={showModal} onHide={handleClose}>
        {loading && <Loading message={`Creating ${label} ...`} type={PROGRESS_BAR_COMPONENT}/>}
        <Modal.Header>
            <Modal.Title className="h6"><FaPlus className="me-2 mr-3"/>Create a New Data Product </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="p-5">
            <Form >
                <Form.Group className="mb-3">
                    <Form.Control  required id={newDataProductForm.id.id} type={"text"} onBlur={handleOnBlur} placeholder={newDataProductForm.id.placeholder} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control  required id={newDataProductForm.label.id} type={"text"} onBlur={handleOnBlur} placeholder={newDataProductForm.label.placeholder} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control  id={newDataProductForm.description.id} as="textarea"  onBlur={handleOnBlur} rows="5" placeholder={newDataProductForm.description.placeholder} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <TDBReactButton onClick={handleCreate} className= "float-right" config={CREATE_NEW_DATA_PRODUCT_BUTTON}/>
        </Modal.Footer>
    </Modal>
}