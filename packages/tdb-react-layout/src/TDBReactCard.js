import React from "react"
import {CardWidget} from "./Card"
import {Col} from '@themesberg/react-bootstrap';

export const TDBReactCard = (props) =>{
    const config=props.config || {}

    return  <Col xl={2}>
        <CardWidget config={config} dataProvider={props.dataProvider}/>
    </Col>
}
