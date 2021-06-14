import React from "react"
import {Col} from "react-bootstrap"
import {NoDataProductSelectedStyle, NO_DATA_PRODUCT_SELECTED_MESSAGE} from "./constants"

export const NoDataProductSelected = (props) => {
    return <div style={NoDataProductSelectedStyle}>
        <Col xs={12} className="text-center d-block align-items-center justify-content-center">
            <img src="../assets/favicon-dark.png" style={{width: "10%"}}/>
            <h1 className="text-dark mt-5">
                {NO_DATA_PRODUCT_SELECTED_MESSAGE}
            </h1>
        </Col>
    </div>
}