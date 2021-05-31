import React, { useState, useEffect } from "react"
import {DBContextObj} from "../hooks/DBContext"
import {Card, Row, Col, ListGroup, Button, Badge} from "react-bootstrap"
import {AiOutlineDelete, AiOutlineSend, AiOutlinePlus, AiOutlineClose} from "react-icons/ai"
import {BsFillCollectionFill} from "react-icons/bs"
import {CREATE_NEW_BRANCH_BUTTON} from "./constants"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {timeConverter} from "../pages/utils"
import {NewBranchCard, BranchInfoModal} from "../components/BranchInfo"
import {BranchControl} from "../hooks/BranchControl"
import {WOQLClientObj} from '../init-woql-client'
import {CANCEL_BUTTON} from "./constants"
 

export const ManageProducts = ({setManageDataProduct}) => {
    const {woqlClient, dataProduct} = WOQLClientObj()
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
    } = BranchControl(branches, branch, ref, updateBranches)

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
                {newBranch && <div className="col-md-4 d-grid pb-3">
                        <NewBranchCard onCancel={setNewBranch} loading={loading} setNewBranchInfo={setNewBranchInfo} branches={branches}/>
                    </div> 
                }
                {reportAlert && <div className="col-md-12 d-grid pb-3">
                    {reportAlert}
                </div>}
            </Row>
            
            <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
            <Card border="light" className="shadow-sm">
                <Card.Header className="border-bottom border-light d-flex justify-content-between">
                    <h5 className="mb-0">Collections 
                        {branchCount && <Badge variant="info" className="text-dark ml-3">{branchCount}</Badge>}
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

      return <Card className="mt-5 mr-4">
        <Card.Header as="h3"> 
            Advanced Settings 
            <div className="float-right d-flex">
                <Button variant="light" className="mr-3" title={CREATE_NEW_BRANCH_BUTTON.title} onClick={(e) => setNewBranch(true)}>
                    <AiOutlinePlus className="me-2"/>{CREATE_NEW_BRANCH_BUTTON.label}
                </Button>
                <Button variant="light" className="mr-3" title={CANCEL_BUTTON.label.title} onClick={(e) => setManageDataProduct(false)}>
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
            <DisplayBranchList branchList={branchList} branch={branch} setShowDefault={setShowDefault}/>
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
