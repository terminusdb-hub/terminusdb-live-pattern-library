import React, { useState, useEffect } from "react"
import {DBContextObj} from "../hooks/DBContext"
/*import TerminusClient from '@terminusdb/terminusdb-client'
import {Card, Row, Col} from "react-bootstrap"
import {AiOutlineBranches} from "react-icons/ai"
import {BiGitCommit, BiCircle} from "react-icons/bi"
import {RiBubbleChartLine} from "react-icons/ri"
import {GoLink} from "react-icons/go"
import {BsPencil} from "react-icons/bs"*/
import {Card, Row, Col, ListGroup, Button, Badge} from "react-bootstrap"
import {AiOutlineDelete, AiOutlineSend} from "react-icons/ai"
import {NEW_BRANCH_CONFIG} from "./constants"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {timeConverter} from "./utils"
import {NewBranchCard, BranchInfoModal} from "../components/BranchInfo"
import {BranchControl} from "../hooks/BranchControl"

export const ManageProducts = ({woqlClient, dataProduct}) => {

    const {branches, branch, ref, updateBranches}=DBContextObj()

    const { 
        branchList,
        newBranch,
        setNewBranch,
        setNewBranchInfo,
        branchCount,
        loading,
        handleNewBranch,
        reportAlert,
        handleDelete,
        handleSwitch,
        handleBranchClick,
        selectedBranch,
        setSelectedBranch,
        handleOptimize
    } = BranchControl(woqlClient, branches, branch, ref, updateBranches)

    const [showDefault, setShowDefault] = useState(false)
    const [selectedCommit, setSelectedCommit] = useState(false)

    const handleClose = () => {
        setSelectedBranch(false)
        setShowDefault(false)
    }

    const BranchItem = (props) => {
        const { id, head, updated, branch, setShowDefault } = props

        function handleOnClick (id) {
            if(handleBranchClick) handleBranchClick(id)
            updateBranches(id)
            setSelectedCommit(false)
            if(setShowDefault) setShowDefault(true)
        }

        return (
          <ListGroup.Item className="px-0">
            <Row className="align-items-center">
              <Col className="ms--2 click-list" onClick={(e) => handleOnClick(id)}>
                    {(id == branch) && <h5 className="fw-bold text-success">{id}</h5>}
                    {(id !== branch) && <h6>{id}</h6>}
              </Col>
              <Col className="ms--2 click-list" onClick={(e) => handleOnClick(id)}>
                <h6>{head}</h6>
              </Col>
              <Col className="ms--2 click-list" onClick={(e) => handleOnClick(id)}>
                <h6>{timeConverter(updated)}</h6>
              </Col>
              <Col className="col-auto">
                {(id ==  "main") && <Button disabled variant="danger" size="sm" title={`delete branch ${id}`} onClick={(e) => handleDelete(id)}>
                    <AiOutlineDelete className="mr-2 mb-1"/> {"Delete"}
                </Button>}
                {(id !==  "main") && <Button variant="danger" size="sm" title={`delete branch ${id}`} onClick={(e) => handleDelete(id)}>
                    <AiOutlineDelete className="mr-2 mb-1"/> {"Delete"}
                </Button>}
              </Col>
              <Col className="col-auto">
                <Button variant="info" size="sm" title={`Switch to branch ${id}`} onClick={(e) => handleSwitch(id)}>
                    <AiOutlineSend className="mr-2 mb-1"/> {"Switch"}
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        )
      }

      const List = ({branchList, branch, setShowDefault}) => {
          let lst = []
          for (var key in branchList) {
            if (branchList.hasOwnProperty(key)) {
                let item = branchList[key]
                lst.push(<BranchItem branch={branch} setShowDefault={setShowDefault} key={`team-member-${item.id}`} {...item} />)
            }
        }
        return lst
      } 

      const DisplayBranchList = ({branchList, branch, setShowDefault}) => {
         return <React.Fragment> 
             <Row>
                <div class="col-md-1 d-grid">
                    <TDBReactButton config={NEW_BRANCH_CONFIG} onClick={handleNewBranch}/>
                </div>
            </Row>
            <Row>
                {newBranch && <div className="col-md-4 d-grid pb-3">
                        <NewBranchCard onCancel={setNewBranch} loading={loading} setNewBranchInfo={setNewBranchInfo} branches={branches}/>
                    </div> 
                }
                {reportAlert && <div className="col-md-12 d-grid pb-3">
                    {reportAlert}
                </div>}
            </Row>
            
            <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
            <Col className="ms--2 mb-3 mt-3">
                <span className="text-success">● </span>
                <span>{`Connected to branch - ${branch}`}</span>
            </Col>
            <Card border="light" className="shadow-sm">
                <Card.Header className="border-bottom border-light d-flex justify-content-between">
                    <h5 className="mb-0">Branches 
                        {branchCount && <Badge bg="info text-dark ml-3">{branchCount}</Badge>}
                    </h5>
                    <Button variant="secondary" size="sm">See all</Button>
                </Card.Header>
                <Card.Body>
                    <ListGroup className="list-group-flush list my--3">
                        <List branchList={branchList} branch={branch} setShowDefault={setShowDefault}/>
                    </ListGroup>
                </Card.Body>
            </Card>
         </React.Fragment>
      }

      return <main className="content mr-3 ml-5 w-100">
          <DisplayBranchList branchList={branchList} branch={branch} setShowDefault={setShowDefault}/>
          <BranchInfoModal woqlClient={woqlClient} 
                branch={selectedBranch} 
                showDefault={showDefault} 
                handleClose = {handleClose} 
                handleSwitch={handleSwitch} 
                dataProduct={dataProduct} 
                setSelectedCommit={setSelectedCommit}
                selectedCommit={selectedCommit}/>
      </main>
}
