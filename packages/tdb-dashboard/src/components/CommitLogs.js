import React, {useState, useEffect} from "react"
import {getBranchCommits} from "../queries/BranchQueries"
import {getCommitsTabConfig, getCommitViewTabConfig} from "./ViewConfig"
import {WOQLTable} from '@terminusdb-live/tdb-react-components'
import {ControlledQueryHook} from '@terminusdb-live/tdb-react-components'
import {getRemovedTriplesQuery, getAddedTriplesQuery} from "../queries/BranchQueries"
import {Row, Button, Toast} from "react-bootstrap"
import {getUsing, printts, copyToClipboard} from "./utils"
import {TERMINUS_MESSAGE, EMPTY_ADDED_DATA, EMPTY_REMOVED_DATA} from "./constants"
import {Alerts} from "./Alerts"
import {BsClipboard} from "react-icons/bs"

const AddedData = ({woqlClient, selectedCommit}) => {
    const [query, setQuery] = useState(getAddedTriplesQuery(getUsing(woqlClient, selectedCommit)))
    const [tableConfig, setTableConfig] = useState(false)
    const [emptyAlert, setEmptyAlert] = useState(false)

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
    } = {}//ControlledQueryHook(woqlClient, query, false, 20)

    useEffect(() => {
        if(result && result.bindings.length > 0) {
            let tConf = getCommitViewTabConfig(result)
            setTableConfig(tConf)
            setEmptyAlert(false)
        }
        else setEmptyAlert(EMPTY_ADDED_DATA)
        
    }, [result])

    return <React.Fragment>
        {!emptyAlert && result && tableConfig && <WOQLTable
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
        {emptyAlert && <Alerts message={emptyAlert} type={TERMINUS_MESSAGE}/>}
    </React.Fragment>

}

const RemovedData = ({woqlClient, selectedCommit}) => {
    const [query, setQuery] = useState(getRemovedTriplesQuery(getUsing(woqlClient, selectedCommit)))
    const [tableConfig, setTableConfig] = useState(false)
    const [emptyAlert, setEmptyAlert] = useState(false)

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
    } = {}//ControlledQueryHook(woqlClient, query, false, 20)

    useEffect(() => {
        if(result && result.bindings.length > 0) {
            let tConf = getCommitViewTabConfig(result)
            setTableConfig(tConf)
            setEmptyAlert(false)
        }
        else setEmptyAlert(EMPTY_REMOVED_DATA)
    }, [result])

    return <React.Fragment>
        {!emptyAlert && result && tableConfig && <WOQLTable
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
        {emptyAlert && <Alerts message={emptyAlert} type={TERMINUS_MESSAGE}/>}
    </React.Fragment>

}

const CommitHeader = ({selectedCommit, onClose}) => {
    let dt=printts(selectedCommit.time)

    function handleClose () {
        if(onClose) onClose(false)
    }

    return <React.Fragment> 
        <div className="d-flex align-items-center">
            <div className="d-block col-md-6">
                <h6 className="fw-normal text-muted mb-2">Commit ID</h6>
                <h5>{selectedCommit.id}</h5>
            </div>
            <div className="d-block col-md-3">
                <h6 className="fw-normal text-muted mb-2">Commited at</h6>
                <h5>{dt}</h5>
            </div>
            <div className="d-block col-md-3">
                <h6 className="fw-normal text-muted mb-2">Commited by</h6>
                <h5>{selectedCommit.author}</h5>
            </div>
        </div>
        <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
    </React.Fragment>

    /*return <React.Fragment>
        <h5><BiGitCommit className="me-2"/>{"Commit"} {commit.id} {dt} {commit.author}</h5>
        <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
            Close
        </Button>
    </React.Fragment>*/
        
}

export const CommitView = ({woqlClient, commit, onClose, setSelectedCommit, selectedCommit}) => {
    // commit is an object coming from cell click of WOQL Table 

    return <Row>
        <CommitHeader selectedCommit={selectedCommit} onClose={onClose}/>
        <h5 className="text-muted">Added Data</h5>
        <div style={{width: "100%"}}>
            <AddedData woqlClient={woqlClient} selectedCommit={selectedCommit.id}/>
        </div>
        <h5 className="text-muted">Removed Data</h5>
        <div style={{width: "100%"}}>
            <RemovedData woqlClient={woqlClient} selectedCommit={selectedCommit.id}/>
        </div>
    </Row>

}

export const CommitLogs = ({woqlClient, branch, refresh, setSelectedCommit}) => {
    const [query, setQuery] = useState(getBranchCommits(branch))
    const [tableConfig, setTableConfig] = useState(false)

    const [copied, setCopied] = useState(false)
    const [showCopiedMessage, setShowCopiedMessage] = useState(true);
    const handleCloseCopiedMessage = () => setShowCopiedMessage(false);

    let cellClick = (cell) => {
        let cmt = {}
        cmt.id = cell.row.original["Commit ID"]["@value"]
        cmt.author = cell.row.original["Author"]["@value"]
        cmt.time = cell.row.original["Time"]["@value"]
        setSelectedCommit(cmt)
    }

    useEffect(() => {
        setQuery(getBranchCommits(branch))
    }, [refresh]) 

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
    } = {} //ControlledQueryHook(woqlClient, query, false, 20)

    function handleCopy (commit) {
        copyToClipboard(commit)
        setCopied(commit)
    }

    function getCopyButton (cell) {
        let cmt = cell.row.original["Commit ID"]["@value"]
        return <Button variant="info" size="sm" title={`Copy - ${cmt}`} onClick={(e) => handleCopy(cmt)}>
            <BsClipboard className="mr-2 mb-1"/> {"Copy"}
        </Button>
    }

    useEffect(() => {
        let tConf = getCommitsTabConfig(result, limit, cellClick, getCopyButton)
        setTableConfig(tConf)
    }, [result])


    console.log("result", result)
    console.log("tableConfig", tableConfig)
 

    return <React.Fragment>
        {copied && <Toast show={showCopiedMessage} onClose={handleCloseCopiedMessage} className="bg-light text-white my-3">
            <Toast.Header className="text-white" closeButton={false}>
                <BsClipboard className="me-2"/>
                <strong className="me-auto ms-2">Copied below Text</strong>
                <Button variant="close" size="xs" onClick={handleCloseCopiedMessage} />
            </Toast.Header>
            <Toast.Body>
                {copied} !
            </Toast.Body>
        </Toast>}
        <h6 className="fw-normal text-muted mb-2">{`Latest Updates on ${branch} branch`}</h6>
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
    </React.Fragment>
}