import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {DBContextObj} from "../hooks/DBContext"
import {getCommitTime} from "./utils"
import {MenuItem, SubMenu} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {BsFillExclamationTriangleFill, BsBriefcase} from "react-icons/bs"

/* returns current data product to which your connected and status */
export const ConnectedDataProduct = (props) => {

    const {
        dataProduct, 
        sidebarDataProductConnectedState, 
        setSidebarDataProductConnectedState
    } = WOQLClientObj()

    const {branch, consoleTime} = DBContextObj() 
    const [status, setStatus] = useState("text-success")
    const [currentCommit, setCurrentCommit] = useState("latest")

    useEffect(() => {
        getCommitTime(consoleTime, setStatus, setCurrentCommit)
    }, [consoleTime])

    function title (dataProduct) {
        return <span className="pro-item-content">Connected to <strong className="text-success">{dataProduct}</strong></span>
    }

    return <SubMenu title={title(dataProduct)}
        className="menu-title"
        defaultOpen={sidebarDataProductConnectedState}
        onOpenChange={(e) => setSidebarDataProductConnectedState(e)}
        >
        {(status == "text-warning") && <MenuItem >
            <span className="pro-item-content font-italic text-warning ml-3" > 
                <BsFillExclamationTriangleFill className="me-2 mr-3"/>
                This is not latest version   
            </span>
            </MenuItem>
        }
        <MenuItem className="sub-menu-title">
            <span className="pro-item-content"> 
                <strong className={`mr-3 ${status}`}> ● </strong>  {`on ${currentCommit} version`} 
            </span>
        </MenuItem>
        <MenuItem className="sub-menu-title">
            <span className="pro-item-content"> <BsBriefcase className="me-2 mr-3"/> {branch} </span>
        </MenuItem>
    </SubMenu>
}