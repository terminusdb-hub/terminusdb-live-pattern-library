import React, { useState } from "react"
import {DBContextObj} from "../hooks/DBContext"
import {Card, Button} from "react-bootstrap"
import {AiOutlinePlus, AiOutlineClose} from "react-icons/ai"
import {BsFillCollectionFill} from "react-icons/bs"
import {CREATE_NEW_BRANCH_BUTTON} from "./constants"
import {BranchInfoModal} from "../components/BranchInfo"
import {BranchControl} from "../hooks/BranchControl"
import {WOQLClientObj} from '../init-woql-client'
import {CANCEL_BUTTON} from "./constants"
import {DisplayBranchList} from "../components/DisplayBranchList"
import {NewBranchModal} from "../components/NewBranchModal"
 

export const ManageProducts = ({setDataProductSettings}) => {
    const {woqlClient, dataProduct} = WOQLClientObj()
    const {branches, branch, ref, updateBranches}=DBContextObj()

    const { 
        branchList,
        newBranch,
        setNewBranch,
        setNewBranchInfo,
        branchCount,
        loading,
        reportAlert,
        handleSwitch,
        handleDelete,
        handleBranchClick,
        selectedBranch,
        setSelectedBranch
    } = BranchControl(branches, branch, ref, updateBranches)

    const [showDefault, setShowDefault] = useState(false)
    const [selectedCommit, setSelectedCommit] = useState(false)

    const handleClose = () => {
        setSelectedBranch(false)
        setShowDefault(false)
    }
      
    return <Card className="mt-5 mr-4">
        <Card.Header as="h3"> 
            Collections 
            <div className="float-right d-flex">
                <Button variant="info" className="mr-3" title={CREATE_NEW_BRANCH_BUTTON.title} onClick={(e) => setNewBranch(true)}>
                    <AiOutlinePlus className="me-2"/>{CREATE_NEW_BRANCH_BUTTON.label}
                </Button>
                <Button variant="light" className="mr-3" title={CANCEL_BUTTON.label.title} onClick={(e) => setDataProductSettings(false)}>
                    <AiOutlineClose className="me-2"/>{CANCEL_BUTTON.label}
                </Button>
            </div>
        </Card.Header>
        <Card.Body>
            <Card.Text className="ms--2 mb-3 mt-3 h6 text-muted"> 
                <BsFillCollectionFill className="me-2"/>
                {`You are currently in collection - `} 
                <strong className="text-success">{branch}</strong>
            </Card.Text>

            <NewBranchModal newBranch={newBranch} 
                onCancel={setNewBranch} 
                setNewBranchInfo={setNewBranchInfo} 
                loading={loading} 
                branches={branches}/>

            <DisplayBranchList branchList={branchList} 
                branch={branch} 
                setShowDefault={setShowDefault} 
                branchCount={branchCount}
                handleSwitch={handleSwitch} 
                handleDelete={handleDelete}
                handleBranchClick={handleBranchClick}
                reportAlert={reportAlert}/>
            
            <BranchInfoModal woqlClient={woqlClient} 
                branch={selectedBranch} 
                showDefault={showDefault} 
                handleClose = {handleClose} 
                handleSwitch={handleSwitch} 
                dataProduct={dataProduct} 
                setSelectedCommit={setSelectedCommit}
                selectedCommit={selectedCommit}/>

        </Card.Body>
    </Card>
}
