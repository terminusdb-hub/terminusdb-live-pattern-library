import React, {useState, useEffect} from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts"
import {data} from "../../DataProductGraphInfo"
import {WOQLClientObj} from '../init-woql-client'
import {timeConverter} from "../pages/utils"
import {printts} from "../components/utils"
import {AiOutlineDelete} from "react-icons/ai"
import {Col, Button} from "react-bootstrap"
import {BsBarChart} from "react-icons/bs"
import {DATA_PRODUCT_HEALTHY} from "../pages/constants"
import {HealthModal} from "./HealthModal"

export const AboutDataProduct = ({dataProductDetails, setShowDeleteModal, healthColor}) =>{

    const [showHealth, setShowHealth]=useState(false)
    const {
        dataProduct,
        documentClasses,
        branches, 
        branch, 
        ref
    } = WOQLClientObj()

    const [color, setColor]=useState("text-muted")
    const [healthText, setHealthText]=useState(false)

    useEffect(() => {
        if(!healthColor) setColor("text-muted")
        if(healthColor == DATA_PRODUCT_HEALTHY) setColor("text-success")
    }, [healthColor])

    const [branchCount, setBranchCount]= useState(0)

    useEffect(() => {
        let count=0
        for (var key in branches){
            count+=1
        }
        setBranchCount(count)
    }, [branches])
   
    return <React.Fragment>

        <HealthModal showHealth={showHealth} setShowHealth={setShowHealth}/>

        <h4 className="text-muted mb-3 fw-bold">About</h4>
        <span className="d-flex mb-2">
            <h6 className="fw-normal text-muted mb-2 fw-bold">Data Product ID </h6>
            <h6 className="ml-3">{dataProductDetails.name}</h6>
        </span>
        <span className="d-flex mb-2">
            <h6 className="fw-normal text-muted mb-2 fw-bold">Created</h6>
            <h6 className="ml-3">{timeConverter(dataProductDetails.creation_date)}</h6>
        </span>
        {dataProductDetails.comment && <p className="text-muted mb-4">
            {dataProductDetails.comment}
        </p>}
        {!dataProductDetails.comment && <p className="text-muted mb-4">
            No description provided 
        </p>}
        <span className="d-flex">
            <span className="d-flex mb-2 mr-3">
                <h6 className="fw-normal text-muted mb-2 fw-bold">Total Document Classes</h6>
                <h6 className="ml-3">{documentClasses.length}</h6>
            </span>
        </span>
        <span className="d-flex">
            <span className="d-flex mb-2 mr-3">
                <h6 className="fw-normal text-muted mb-2 fw-bold">Total Collections</h6>
                <h6 className="ml-3">{branchCount}</h6>
            </span>
        </span>
        
        {/* Nuking health for now */}
        {/*<hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>*/}

        {/*<h4 className="text-muted mb-3 fw-bold">Health</h4>*/}

        {/*healthText && <p style={{color: color}}>healthText</p>*/}
        {/*!healthText && <p className="text-muted">You can set the health of your Data Product.</p>*/}
        {/*<div className="w-100 d-flex align-items-center gx-0">
            <span class={`h2 mb-0 w-100 ${color}`} >
                <BsBarChart/>
            </span>
            <div className="col-auto">
                <span className="h2 text-muted mb-0">
                    <Button variant="light" className="btn-sm" onClick={(e)=>setShowHealth(true)}>Change</Button>
                </span>
            </div>
        </div>*/}

        <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>

        <h4 className="card-header-title text-muted fw-bold">
        Danger Zone
        </h4>
        <div className="w-100 d-flex align-items-center gx-0">
            <p className="mt-2 text-muted w-100 mb-0"> Delete this Data Product, there is no going back. Please be certain. </p>
            <div className="col-auto">
                <span className="h2 text-muted mb-0">
                    <Button variant="danger" 
                        title={`Delete Data Product ${dataProduct}`} 
                        className=" btn btn-sm"
                        onClick={(e) =>setShowDeleteModal(true)}>
                        Delete 
                    </Button>
                </span>
            </div>
           
        </div>

    </React.Fragment>
}