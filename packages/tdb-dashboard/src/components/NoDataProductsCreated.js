import React from "react"
import {Card, Button, Col} from "react-bootstrap"
import {BiPlus} from "react-icons/bi"
import {NoDataProductSelectedStyle} from "./constants"
import {NewDataProduct} from "../components/NewDataProduct"

export const NoDataProductsCreated = ({onCreate}) => {
    return <div style={NoDataProductSelectedStyle}>
        <Col xs={12} className="text-center d-block align-items-center justify-content-center ml-5">
        <Col xs={9} className="d-block">
         <div class="card card-fil m-3">
            <div class="card-body w-100 text-center">
                <h4 className="text-muted mt-5 mb-3">{`No Data Product is created`}</h4>
                <NewDataProduct css={"btn mb-5"}/>
            </div>
        </div>
    </Col>
    </Col>
    </div>
}