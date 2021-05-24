import React, { useState, useEffect } from "react"
import {ControlledQueryHook} from '@terminusdb/terminusdb-react-components'
import {WOQLTable} from '@terminusdb/terminusdb-react-components'
import {getBranchQuery} from "../../queries/GeneralQueries"
import {DBContextObj} from "../../hooks/DBContext"
import TerminusClient from '@terminusdb/terminusdb-client'
import {Card, Row, Col} from "@themesberg/react-bootstrap"
import {AiOutlineBranches} from "react-icons/ai"
import {BiGitCommit, BiCircle} from "react-icons/bi"
import {RiBubbleChartLine} from "react-icons/ri"
import {GoLink} from "react-icons/go"
import {BsPencil} from "react-icons/bs"

export const ManageProducts = ({woqlClient, dataProduct}) => {
    const {branches}=DBContextObj()

    const [branchList, setBranchList] = useState([])

    useEffect(() => {
        if(branches) setBranchList(branches)
    }, [branches])

    console.log("branchList", branchList)

    const BranchCards = ({branchList}) => {
        let cards = []
        if (branchList.length == 0) return <div>LOADING</div>
        for(var item in branchList) {
            cards.push(
                <Card variant="dark" className="text-center mb-5">
                    <Card.Body className="p-0">
                        <Row className="d-block d-xl-flex align-items-center">
                            <Col md={3} className="text-xl-center d-flex align-items-center justify-content-xl-center">
                                <h3 className="border-right-1" variant="primary">{branchList[item].id}</h3>
                            </Col>
                            <Col md={9} className="px-xl-0">
                                <div className="d-flex align-items-center">
                                    <BiGitCommit className="mr-2"/> <h6 className="mr-3">234 KB</h6>
                                    <RiBubbleChartLine className="mr-2"/> <h6 className="mr-3"> 2 Graphs </h6>
                                    <BiCircle className="mr-2"/> <h6 className="mr-3"> 3 classes </h6>
                                    <GoLink className="mr-2"/> <h6 className="mr-3"> 5 properties </h6>
                                    <BsPencil className="mr-2"/> <h6 className="mr-3"> Last commited by kitty Jse </h6>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )
        }
        return cards

    }

    return <main className="content mr-3 ml-5 w-100">
        <BranchCards branchList={branchList}/>
    </main>
}


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