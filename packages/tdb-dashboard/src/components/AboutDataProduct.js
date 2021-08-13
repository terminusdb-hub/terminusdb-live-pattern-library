import React from "react"
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

export const AboutDataProduct = ({dataProductDetails, setShowDeleteModal}) =>{

    const {
        dataProduct,
        documentClasses
    } = WOQLClientObj()

   
    return <React.Fragment>
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
                <h6 className="fw-normal text-muted mb-2 fw-bold">Classes</h6>
                <h6 className="ml-3">{documentClasses.length}</h6>
            </span>
            <span className="d-flex mb-2 mr-3">
                <h6 className="fw-normal text-muted mb-2 fw-bold">Properties</h6>
                <h6 className="ml-3">{6}</h6>
            </span>
            <span className="d-flex mb-2 mr-3">
                <h6 className="fw-normal text-muted mb-2 fw-bold">Triples</h6>
                <h6 className="ml-3">{453}</h6>
            </span>
        </span>

        {<hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>}

        <div className="card card-fil mt-3">
            <div className="card-header d-flex">
                <h4 className="card-header-title text-muted">
                Danger Zone
                </h4>
            </div>
            <div className="card-body w-100 d-block">
                <p className="mt-2 text-muted"> Delete this Data Product, there is no going back. Please be certain. </p>
                <Button variant="danger" 
                        title={`Delete Data Product ${dataProduct}`} 
                        className="m-3 float-right text-right btn btn-sm"
                        onClick={(e) =>setShowDeleteModal(true)}>
                    <AiOutlineDelete className="me-2" /> Delete 
                </Button>
            </div>
        </div>

        {/*<div className="d-block">
            <h4 className="text-muted mb-3 fw-bold">Acitivity last year</h4>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="commits" fill="#2a7aaf" />
            </BarChart>
        </div>*/}
    </React.Fragment>
}