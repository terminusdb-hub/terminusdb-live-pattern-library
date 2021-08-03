import React, {useState} from "react"
import {Button} from "react-bootstrap"
import {FaPlus} from "react-icons/fa"
import {NewDatabaseModal} from "../components/NewDatabaseModal"


export const NewDataProduct = () => {
    const [showModal, setShowModal] = useState(false)
    
    function handleNew (evt) {
        evt.preventDefault()
        evt.stopPropagation()
        setShowModal(true)
    }

    return <React.Fragment>
                <Button className="mr-1 pt-2 pb-2 pr-4 pl-4 btn bg-transparent border border-light btn-sm"  title="Create New Data Product" onClick={handleNew}>
                    <FaPlus className="me-2"/>New
                </Button>
                <NewDatabaseModal setShowModal={setShowModal} showModal={showModal}/>
           </React.Fragment>
}