import React, {useState} from "react"
import {Card} from '@themesberg/react-bootstrap'
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {CANCEL_BUTTON, CREATE_NEW_DATA_PRODUCT_BUTTON, newDataProductForm} from "./constants"
import {Form, Button} from "@themesberg/react-bootstrap"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT} from "./constants"
 
export function DatabaseCard (props) {

    let label = props.label || props.id
    let id = props.id
    let description = props.description || false

    return <Card variant={"dark"}>
        <Card.Body>
            <Card.Title>{label}</Card.Title>
            <Card.Text>{description}</Card.Text>
            {/*<Card.Text>
              <small className="text-muted mr-3">ID <span className="text-primary">{id}</span></small>        
              <small className="text-muted mr-3 ">Branches <span className="text-primary">2 </span></small>
              <small className="text-muted mr-3">Size <span className="text-primary">123 KB </span></small>
              </Card.Text>
            <Card.Text>
                <small className="text-muted mr-3">Last updated <span className="text-primary">3 mins ago, by someone </span></small>
            </Card.Text>*/}
        </Card.Body>
    </Card>

}

export function NewDatabaseCard ({onCancel, setNewDataProductInfo, loading}) {
    const [id, setID]=useState(false)
    const [label, setLabel]=useState(false)
    const [description, setDescription]=useState(false)


    function handleCancel (e) {
        if (onCancel) onCancel(false) // set show new db card to false
    }

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

    return <Card border="info">
        {loading && <Loading message={`Creating ${label} ...`} type={PROGRESS_BAR_COMPONENT}/>}
        <Card.Header>
            <b>{newDataProductForm.header}</b>
            <TDBReactButton onClick={handleCancel} className= "cancel-button" config={CANCEL_BUTTON}/>
        </Card.Header>
        <Card.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control required id={newDataProductForm.id.id} type={"text"} onBlur={handleOnBlur} placeholder={newDataProductForm.id.placeholder} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control required id={newDataProductForm.label.id} type={"text"} onBlur={handleOnBlur} placeholder={newDataProductForm.label.placeholder} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control id={newDataProductForm.description.id} as="textarea"  onBlur={handleOnBlur} rows="1" placeholder={newDataProductForm.description.placeholder} />
                </Form.Group>
                <TDBReactButton onClick={handleCreate} className= "float-right" config={CREATE_NEW_DATA_PRODUCT_BUTTON}/>
            </Form>
        </Card.Body>
    </Card>

}


/*


 <Card.Footer>
            <TDBReactButton onClick={handleCreate} className= "float-right" config={CREATE_NEW_DATA_PRODUCT_BUTTON}/>
        </Card.Footer>


        */