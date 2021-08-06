import React from "react"
import {Col, Card, Button, Row} from "react-bootstrap"
import {NoDataProductSelectedStyle, NO_DATA_PRODUCT_SELECTED_MESSAGE} from "./constants"
import {BsFillChatSquareDotsFill} from "react-icons/bs"
import {AiOutlineDatabase} from "react-icons/ai"

export const NoDataProductSelected = (props) => {
    return <div style={NoDataProductSelectedStyle}>
        {props.children}
        <Col xs={12} className="text-center d-block align-items-center justify-content-center">
            <img src="../assets/favicon-dark.png" style={{width: "10%"}}/>
            <h1 className="text-dark mt-5">
                {NO_DATA_PRODUCT_SELECTED_MESSAGE}
            </h1>
        </Col>
    </div>
}