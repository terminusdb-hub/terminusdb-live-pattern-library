
import React, {useState, useEffect} from "react"
import {newBranchForm, TERMINUS_SUCCESS, TERMINUS_DANGER} from "../components/constants"
import {Alerts} from "../components/Alerts"

export function BranchControl (woqlClient, branches, branch, ref, updateBranches)  {

    const [sourceCommit, setSourceCommit] = useState(false)

    const [branchList, setBranchList] = useState([])

    const [newBranch, setNewBranch] = useState(false)
    const [loading, setLoading] = useState(false)
    const [newBranchInfo, setNewBranchInfo] = useState(false)

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


    function handleNewBranch () {
        setNewBranch(true)
    }

    function handleDelete (branch) {
        let update_start = Date.now()
        setLoading(true)
        woqlClient.deleteBranch(branch).then((results) => {
            let message = `Success in deleteing branch - ${branch}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert} time={update_start}/>)
            updateBranches("main")
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
        let message = `Switched to branch - ${branch}`;
        setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert}/>)
        updateBranches(branch)
    }

    return {
        branchList,
        newBranch,
        setNewBranch,
        setNewBranchInfo,
        loading,
        handleNewBranch,
        reportAlert,
        handleDelete,
        handleSwitch
    }
}