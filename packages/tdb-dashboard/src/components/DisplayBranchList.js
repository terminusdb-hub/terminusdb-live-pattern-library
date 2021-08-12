
import React from "react"
import {Card, Row, Badge, Button, ListGroup, Col} from 'react-bootstrap'
import {FiMoreHorizontal} from "react-icons/fi"
import {RiDeleteBin7Line} from "react-icons/ri"
import {timeConverter} from "../pages/utils"


const BranchItem = (props) => {
    const { name, head, timestamp, branch, branches, setShowDefault, handleSwitch, handleDelete, handleBranchClick} = props
    const id=name
    function handleOnClick (id) {
        if(handleBranchClick) handleBranchClick(id)
        //setSelectedCommit(false)
        handleSwitch(id)
    }

    function handleDetails (id) {
        setShowDefault(true)
        handleSwitch(id)
    }

    return (
      <ListGroup.Item className="px-0">
        <Row className="align-items-center">
          <Col className="ms--2">
                {(id == branch) && <h5 className="fw-bold text-success">{id}</h5>}
                {(id !== branch) && <h6>{id}</h6>}
          </Col>
          <Col className="ms--2">
            <h6><span className="text-muted"> {`Head Commit `} </span>{head}</h6>
          </Col>
          <Col className="ms--2">
            <h6><span className="text-muted"> {`Updated on `} </span>{timeConverter(timestamp)}</h6>
          </Col>
          <Col className="col-auto">
            {(id ==  "main") && <RiDeleteBin7Line className="mr-2 mb-1 react-icons danger disabled"/>}
            {(id !==  "main") && <span  title={`delete branch ${id}`} >
                <RiDeleteBin7Line className="mr-2 mb-1 react-icons danger" onClick={(e) => handleDelete(id)}/>
            </span>}
          </Col>
          <Col className="col-auto">
            <span title={`View Commit Logs and preform actions on Collection ${id}`}>
                <FiMoreHorizontal className="mr-2 mb-1 react-icons info" onClick={(e) => handleDetails(id)}/> 
            </span>
          </Col>
        </Row>
      </ListGroup.Item>
    )
}

  const List = ({branchList, branch, setShowDefault, handleSwitch, handleBranchClick, handleDelete}) => {
      let lst = []
      for (var key in branchList) {
          let item = branchList[key]
          lst.push(<BranchItem branch={branch} handleBranchClick={handleBranchClick} handleSwitch={handleSwitch} handleDelete={handleDelete} setShowDefault={setShowDefault} key={`team-member-${item.id}`} {...item} />)
    }
    return lst
} 


export const DisplayBranchList = ({branchCount, branchList, branch, setShowDefault, reportAlert, handleSwitch, handleDelete, handleBranchClick}) => {

    return <React.Fragment> 
       <Row>
           {reportAlert && <div className="col-md-12 d-grid pb-3">
               {reportAlert}
           </div>}
       </Row>

       <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
       <Card className="shadow-sm">
           <Card.Header className=" d-flex justify-content-between">
               <h6 className="mb-0 mt-1">Collections 
                   {branchCount && <Badge variant="info" className="text-dark ml-3">{branchCount}</Badge>}
               </h6>
           </Card.Header>
           <Card.Body>
               <ListGroup className="list-group-flush list my--3">
                   <List branchList={branchList} branch={branch} setShowDefault={setShowDefault} handleDelete={handleDelete} handleSwitch={handleSwitch} handleBranchClick={handleBranchClick}/>
               </ListGroup>
           </Card.Body>
       </Card>
    </React.Fragment>
 }