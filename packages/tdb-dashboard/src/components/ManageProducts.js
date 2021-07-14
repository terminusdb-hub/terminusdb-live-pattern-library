import React, { useState } from "react"
import {Card, Button} from "react-bootstrap"
import {AiOutlinePlus, AiOutlineClose} from "react-icons/ai"
import {BsBriefcase} from "react-icons/bs"
import {BranchInfoModal} from "../components/BranchInfo"
import {BranchControl} from "../hooks/BranchControl"
import {WOQLClientObj} from '../init-woql-client'
import {DisplayBranchList} from "../components/DisplayBranchList"
import {NewBranchModal} from "../components/NewBranchModal"
import {MANAGE_COLLECTIONS, CREATE_NEW_BRANCH_BUTTON} from "./constants"

export const ManageProducts = ({setDataProductSettings}) => {
    const {woqlClient, dataProduct,branches, branch} = WOQLClientObj()
    
    const { 
       // branchList,
        createBranch,
        newBranch,
        setNewBranch,
        setNewBranchInfo,
        branchCount,
        loading,
        reportAlert,
        handleSwitch,
        handleDelete,
        handleBranchClick,
        setSelectedBranch
    } = BranchControl()

    const [showDefault, setShowDefault] = useState(false)
    const [selectedCommit, setSelectedCommit] = useState(false)

    const [history, setHistory] = useState(false)

    const handleClose = () => {
        setSelectedBranch(false)
        setShowDefault(false)
    }

    
    return <React.Fragment>
        <Card className="mt-5 mr-4 mb-5">
        <Card.Header as="h3"> 
            {`Manage ${MANAGE_COLLECTIONS} `}
            <div className="float-right d-flex">
                {/*<Button variant="light" className="mr-3" title={VIEW_HISTORY.title} onClick={(e) => setHistory(true)}>
                    <MdTimer className="me-2"/>{VIEW_HISTORY.label}
                </Button>*/}
                <Button variant="light" className="mr-3" title={CREATE_NEW_BRANCH_BUTTON.title} onClick={(e) => setNewBranch(true)}>
                    <AiOutlinePlus className="me-2"/>{CREATE_NEW_BRANCH_BUTTON.label}
                </Button>
                <Button variant="light" title={"Close Manage Products"} onClick={(e) => setNewBranch(true)}>
                    <AiOutlineClose className="me-2" onClick={(e) => setDataProductSettings(false)}/>
                </Button>
            </div>
        </Card.Header>
        <Card.Body>
            <Card.Text className="ms--2 mb-3 mt-3 h6 text-gray"> 
                <BsBriefcase className="me-2"/>
                {`You are currently in collection - `} 
                <strong className="text-success">{branch}</strong>
            </Card.Text>

            <NewBranchModal newBranch={newBranch} 
                onCancel={setNewBranch} 
                setNewBranchInfo={setNewBranchInfo} 
                loading={loading} 
                branches={branches}
                createBranch={createBranch}/>

            <DisplayBranchList branchList={branches} 
                branch={branch} 
                setShowDefault={setShowDefault} 
                branchCount={branchCount}
                handleSwitch={handleSwitch} 
                handleDelete={handleDelete}
                handleBranchClick={handleBranchClick}
                reportAlert={reportAlert}/>

            <BranchInfoModal woqlClient={woqlClient} 
                branch={branch} 
                showDefault={showDefault} 
                handleClose = {handleClose} 
                handleSwitch={handleSwitch} 
                dataProduct={dataProduct} 
                setSelectedCommit={setSelectedCommit}
                selectedCommit={selectedCommit}/>

        </Card.Body>
    </Card>
</React.Fragment>
}
