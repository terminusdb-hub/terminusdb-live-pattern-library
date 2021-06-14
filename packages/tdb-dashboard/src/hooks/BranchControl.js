
import React, {useState, useEffect} from "react"
import {newBranchForm, TERMINUS_SUCCESS, TERMINUS_DANGER} from "../components/constants"
import {Alerts} from "../components/Alerts"
import {getBranchCountQuery} from "../queries/BranchQueries"
import {executeQueryHook} from "./executeQueryHook"
import {WOQLClientObj} from '../init-woql-client'
 
export function BranchControl (branches, branch, ref, updateBranches, setHead)  {
    const {woqlClient, dataProduct} = WOQLClientObj()

    //get branch count 
    const [branchCount, setBranchCount]=useState(0)
    const [branchCountQuery, setBranchCountQuery]=useState(getBranchCountQuery())
    const [branchCountDataProvider] = executeQueryHook(woqlClient, branchCountQuery)

    useEffect(() => {
        if(branchCountDataProvider) {
            setBranchCount(branchCountDataProvider[0]['Count']['@value'])
        }
    }, [branchCountDataProvider])

    useEffect(() => {
        if(dataProduct) {
            setBranchCountQuery(getBranchCountQuery())
        }
    }, [dataProduct])

    // branch states
    const [sourceCommit, setSourceCommit] = useState(false)
    const [branchList, setBranchList] = useState([])
    const [newBranch, setNewBranch] = useState(false)
    const [newBranchInfo, setNewBranchInfo] = useState(false)
    const [selectedBranch, setSelectedBranch] = useState(false)

    const [loading, setLoading] = useState(false)
    const [reportAlert, setReportAlert] = useState(false)
    

    useEffect(() => {
        if(ref && !sourceCommit){
            setSourceCommit(ref)
        }
        else if(branch && branches.length >0  && !sourceCommit){
            setSourceCommit(branches[branch].head)
        }
    }, [branch, ref, branches])

    function onCreate (branchInfo) {
        setLoading(true)
        let update_start = Date.now()
        let nc = woqlClient.copy()
        let source_free = (branchInfo.branchType == newBranchForm.select.empty)
        if(branchInfo.branchType != newBranchForm.select.empty){
            nc.ref(sourceCommit)
        }
        nc.branch(branchInfo.id, source_free)
        .then((res) => {
            let message = `Success in creating branch - ${branchInfo.id}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert} time={update_start}/>)
            setNewBranch(false)
            updateBranches(branchInfo.id)
            setBranchCountQuery(getBranchCountQuery())
        })
        .catch((err) => {
            let message = `Error in creating branch - ${branchInfo.id}. ${message}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        })
        .finally(() => {
            setLoading(false)
        }) 
    }

     useEffect(() => {
        if(branches) setBranchList(branches)
    }, [branches])

    useEffect(() => {
        if(newBranchInfo) onCreate(newBranchInfo)
    }, [newBranchInfo])


    function handleDelete (branch) {
        let update_start = Date.now()
        setLoading(true)
        woqlClient.deleteBranch(branch).then((results) => {
            let message = `Success in deleteing branch - ${branch}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert} time={update_start}/>)
            updateBranches("main")
            setBranchCountQuery(getBranchCountQuery())
        })
        .catch((err) => {
            let message = `Error in deleteing branch - ${branch}. ${message}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        
        })
        .finally(() => {
            setLoading(false)
        })
    }

    function handleSwitch (branch) {
        if(!branch) return null
        let message = `Switched to branch - ${branch}`
        //setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert}/>)
        updateBranches(branch)
    }

    function handleBranchClick (branch) {
        setSelectedBranch(branch)
    }

    function handleOptimize (branch){
        let update_start = Date.now()
        setLoading(true)
        woqlClient.optimizeBranch(branch).then(()=>{
            let message = `Optimization Complete on branch - ${branch}`
            setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert} time={update_start}/>)
        })
        .catch((err) => {
            let message = `Error in optimizing branch - ${branch}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert} />)
        })
        .finally(() => setLoading(false))
    }

    function handleReset (branch, commit, setRefresh) {
        let update_start = Date.now()
        setLoading(true)
        woqlClient.resetBranch(branch, commit).then((results) => {
            let message = `Successfull in resetting branch ${branch} to ${commit}`
            setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert} time={update_start}/>)
            setHead(branch, {commit: commit})
            if(setRefresh) setRefresh([ arr => [...arr, arr.length+1]])
        })
        .catch((err) => {
            let message = `Error while resetting branch - ${branch}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        })
        .finally(() => setLoading(false))
    }

    function handleSquash (branch, commitMsg) {
        let update_start = Date.now()
        var new_commit
        setLoading(true)
        woqlClient.squashBranch(branch, commitMsg).then((results) => {
            if(results["api:commit"]){
                var cmt = results["api:commit"].split("/");
                new_commit = cmt.pop()
            }
            woqlClient.resetBranch(branch, new_commit).then((results) => {
                let message = `Successfull in squashing branch ${branch} to new commit  ${new_commit}`
                setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert} time={update_start}/>)
                setHead(branch, {commit: new_commit})
            })
        })
        .catch((err) => {
            let message = `Error while squashing branch - ${branch}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        })
        .finally(() => setLoading(false))
    }

    return {
        branchList,
        newBranch,
        branchCount,
        setNewBranch,
        setNewBranchInfo,
        loading,
        reportAlert,
        handleDelete,
        handleSwitch,
        handleBranchClick,
        selectedBranch,
        setSelectedBranch,
        handleOptimize,
        handleReset,
        handleSquash
    }
}