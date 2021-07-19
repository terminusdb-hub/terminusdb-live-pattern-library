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
  import {DocumentControl} from "../hooks/DocumentControl"
  import {WOQLClientObj} from '../init-woql-client'


export const AboutDataProduct = ({dataProductDetails}) =>{

    const {dataProduct} = WOQLClientObj()

    const {
        documentClasses
    } = DocumentControl(dataProduct)

    

    return <React.Fragment>
        <h4 className="text-muted mb-3 fw-bold">About</h4>
        <span className="d-flex mb-2">
            <h6 className="fw-normal text-muted mb-2 fw-bold">Data Product ID </h6>
            <h6 className="ml-3">{dataProductDetails.name}</h6>
        </span>
        <span className="d-flex mb-2">
            <h6 className="fw-normal text-muted mb-2 fw-bold">Created</h6>
            <h6 className="ml-3">{"05 July 2017"}</h6>
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
        <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
        <div className="d-block">
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
        </div>
    </React.Fragment>
}