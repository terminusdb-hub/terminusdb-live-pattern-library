import React, {useState, useEffect} from "react"
import {Row, Col} from "@themesberg/react-bootstrap"
import {BiGitCommit, BiCircle} from "react-icons/bi"
import {RiBubbleChartLine} from "react-icons/ri"
import {GoLink} from "react-icons/go"
import {BsPencil, BsThreeDots, BsLayoutThreeColumns} from "react-icons/bs"
import {ScopedDetails} from "../hooks/ScopedDetails"
import {formatBytes, formatTripleCount, formatCommits, formatGraphs, formatPropertiesCount, formatClassesCount, formatLastCommitTimeStamp} from "./utils"

export const BranchDetails = ({woqlClient, branch, dataProduct}) => {

    const [latest]= ScopedDetails(woqlClient, branch, dataProduct)
    const [details, setDetails]=useState(false)

    useEffect(() => {
        setDetails(latest)
    }, [latest])

    console.log("///latest iner",latest)

    return <Col md={12} className="px-xl-0">
        {details && <div className="d-flex align-items-center">
            <BsLayoutThreeColumns className="mr-2 mb-1 text-success"/> 
                <h6 className="mr-3">
                    {formatBytes(details['Size']['@value'])}
                </h6>
            <BsThreeDots className="mr-2 ml-3 mb-1 text-success"/> 
                <h6 className="mr-3">
                    {formatTripleCount(details['Triples']['@value'])}
                </h6>
            <BiGitCommit className="mr-2 ml-3 mb-1 text-success"/> 
                <h6 className="mr-3">
                    {formatCommits(details['Commits']['@value'])}
                </h6>
            {/*<RiBubbleChartLine className="ml-3 mr-2 mb-1 text-success"/> 
                <h6 className="mr-3"> 
                    {formatGraphs(graphs)}
                </h6>*/}
            <BiCircle className="mr-2 mb-1 ml-3 text-success"/> 
                <h6 className="mr-3"> 
                    {formatClassesCount(details['Classes']['@value'])}
                </h6>
            <GoLink className="mr-2 mb-1 ml-3 text-success"/> 
                <h6 className="mr-3"> 
                    {formatPropertiesCount(details['Properties']['@value'])}
                </h6>
            <BsPencil className="mr-2 mb-1 ml-3 text-success"/> 
                <h6 className="mr-3"> 
                    {formatLastCommitTimeStamp(details)}
                </h6>
        </div>}
    </Col>
}