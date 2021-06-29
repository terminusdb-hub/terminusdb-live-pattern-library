import React, {useState, useEffect} from "react"
import {DBContextObj} from "../hooks/DBContext"
import {WOQLClientObj} from '../init-woql-client'
import {BsBriefcase, BsFillExclamationTriangleFill} from "react-icons/bs"
import {Col, Row} from "react-bootstrap"
import {getCommitTime} from "./utils"
import {SidebarAccordianTitle} from "./SidebarAccordianTitle"

export const CurrentDataProductState = () => {
    const {dataProduct} = WOQLClientObj()
    const {branch, consoleTime} = DBContextObj() 

    const [status, setStatus] = useState("text-success")
    const [currentCommit, setCurrentCommit] = useState("latest")

    useEffect(() => {
        getCommitTime(consoleTime, setStatus, setCurrentCommit)
    }, [consoleTime])


    if(!dataProduct) return <div/>

    return <React.Fragment>
        {(status == "text-warning") && <p className="font-italic text-warning ml-3"> 
            <BsFillExclamationTriangleFill className="me-2 mr-3"/>
            This is not latest version  
        </p>}
        <Row >
            <h6 className="text-light"> <strong className={`mr-3 ${status}`}> ● </strong>  {`on ${currentCommit} version`} </h6>
        </Row>
        <Row>
            <h6 className="mt-2 text-light"><BsBriefcase className="me-2 mr-3"/> {branch} </h6>
        </Row>
    </React.Fragment>

}

export const CurrentDataProductStateHeader = () =>{
    const {dataProduct} = WOQLClientObj()
    const {consoleTime} = DBContextObj()
    const [status, setStatus] = useState("text-muted")

    useEffect(() => {
        getCommitTime(consoleTime, setStatus)
    }, [dataProduct, consoleTime])


    if(!dataProduct) return <Row/>

    return <SidebarAccordianTitle dataProduct={dataProduct} message={"CONNECTED -"} status={status}/>
}