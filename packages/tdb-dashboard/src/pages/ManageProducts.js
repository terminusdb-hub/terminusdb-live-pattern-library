import React, { useState, useEffect } from "react"
import {ControlledQueryHook} from '@terminusdb/terminusdb-react-components'
import {WOQLTable} from '@terminusdb/terminusdb-react-components'
import {getBranchQuery} from "../queries/BranchQueries"
import {DBContextObj} from "../hooks/DBContext"
import TerminusClient from '@terminusdb/terminusdb-client'
import {Card, Row, Col, ListGroup, Button} from "@themesberg/react-bootstrap"
import {AiOutlineDelete, AiOutlineSend} from "react-icons/ai"
import {BiGitCommit, BiCircle} from "react-icons/bi"
import {RiBubbleChartLine} from "react-icons/ri"
import {GoLink} from "react-icons/go"
import {BsPencil, BsThreeDots, BsLayoutThreeColumns} from "react-icons/bs"
import {NEW_BRANCH_CONFIG} from "./constants"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {ScopedDetails} from "../hooks/ScopedDetails"
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
        loading,
        handleNewBranch,
        reportAlert,
        handleDelete,
        handleSwitch,
        handleBranchClick,
        selectedBranch,
        setSelectedBranch
    } = BranchControl(woqlClient, branches, branch, ref, updateBranches)

    const [showDefault, setShowDefault] = useState(false);
    const handleClose = () => {
        setSelectedBranch(false)
        setShowDefault(false)
    }

    const BranchItem = (props) => {
        const { id, head, updated, branch, setShowDefault } = props

        function handleOnClick (id) {
            if(handleBranchClick) handleBranchClick(id)
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
            <Card border="light" className="shadow-sm">
                <Card.Header className="border-bottom border-light d-flex justify-content-between">
                    <h5 className="mb-0">Branches</h5>
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
          <BranchInfoModal woqlClient={woqlClient} branch={selectedBranch} showDefault={showDefault} handleClose = {handleClose} handleSwitch={handleSwitch} dataProduct={dataProduct}/>
      </main>
}

/*export const ManageProducts = ({woqlClient, dataProduct}) => {
    const {branches}=DBContextObj()

    const [branchList, setBranchList] = useState([])
    const [branchDetails, setBranchDetails] = useState(ScopedDetails(woqlClient, dataProduct))

    const [newBranch, setNewBranch] = useState(false)

    console.log("branchDetails", branchDetails)

    useEffect(() => {
        if(branches) setBranchList(branches)
    }, [branches])


    const BranchCards = ({branchList}) => {
        let cards = []
        if (branchList.length == 0) return <div>LOADING</div>
        for(var item in branchList) {
            cards.push(
                <Card variant="dark" className="text-center mb-5">
                    <Card.Body className="p-0">
                        <Row className="d-block d-xl-flex align-items-center">
                            <Col md={3} className="text-xl-center d-flex align-items-center justify-content-xl-center">
                                <h3 className="border-right-1 text-light">{branchList[item].id}</h3>
                            </Col>
                            <Col md={9} className="px-xl-0">
                                <div className="d-flex align-items-center">
                                    <BsLayoutThreeColumns className="mr-2 mb-1 text-success"/> <h6 className="mr-3">234 KB</h6>
                                    <BsThreeDots className="mr-2 ml-3 mb-1 text-success"/> <h6 className="mr-3">234 triples</h6>
                                    <BiGitCommit className="mr-2 ml-3 mb-1 text-success"/> <h6 className="mr-3">223</h6>
                                    <RiBubbleChartLine className="ml-3 mr-2 mb-1 text-success"/> <h6 className="mr-3"> 2 Graphs </h6>
                                    <BiCircle className="mr-2 mb-1 ml-3 text-success"/> <h6 className="mr-3"> 3 classes </h6>
                                    <GoLink className="mr-2 mb-1 ml-3 text-success"/> <h6 className="mr-3"> 5 properties </h6>
                                    <BsPencil className="mr-2 mb-1 ml-3 text-success"/> <h6 className="mr-3"> Last commited by kitty Jse </h6>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )
        }
        return cards

    }

    function handleNewBranch () {
        setNewBranch(true)
    }

    function NewDatabase

    return <main className="content mr-3 ml-5 w-100">
        <TDBReactButton config={NEW_BRANCH_CONFIG} 
            onClick={handleNewBranch} 
        />
        <hr className="my-3 mr-3 border-indigo dropdown-divider nav-bar-dropdown-divider" role="separator"></hr>
        <BranchCards branchList={branchList}/>

    </main>
}*/


/*export const ManageProducts = ({woqlClient, dataProduct}) => {
    const {branches}=DBContextObj()
    const [query, setQuery] = useState(getBranchQuery(dataProduct, woqlClient))
    const {
        updateQuery,
        changeOrder,
        changeLimits,
        woql,
        result,
        limit,
        start,
        orderBy,
        loading,
        rowCount,
    } = ControlledQueryHook(woqlClient, query, false, 20)

    /*function getBranchQuery(){
        return TerminusClient.WOQL.lib().branches()
    }*/

    /*let onBranchClick = function(cell){
        let row = cell.row
        if(row) {
            let branchID=row.original["Branch ID"]["@value"]
            /*updateBranches(branchID)
            setHead(branchID)
            setBranchAction({branch: branchID})*/
       /* }
    }


    const tableConfig= TerminusClient.View.table();
    tableConfig.column_order("Branch ID", "Commit ID", "Time", "Delete")
    tableConfig.column("Time").header("Last Commit Time").minWidth(50).width(80).renderer({type: "time"}).click(onBranchClick)
    /*tableConfig.column("Delete").minWidth(80).width(80).unsortable(true).click(deleteBranch).render(getDeleteButton)
    tableConfig.column("Commit ID").header("Latest Commit").click(onBranchClick)
    tableConfig.column("Branch ID").click(onBranchClick)*/
    /*tableConfig.pager("remote")
    tableConfig.pagesize(10)
 
    return <main className="content mr-3 ml-5 w-100">
        {result && tableConfig && <WOQLTable
            result={result}
            freewidth={true}
            view={(tableConfig ? tableConfig.json() : {})}
            limit={limit}
            start={start}
            orderBy={orderBy} 
            setLimits={changeLimits}
            setOrder={changeOrder}
            query={query}
            loading={loading}
            totalRows={rowCount}
        />}
    </main>
}

*/