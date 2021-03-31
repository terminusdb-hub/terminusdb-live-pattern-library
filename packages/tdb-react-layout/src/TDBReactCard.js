import React from "react"
import {useWorker} from "@terminusdb-live/react-worker"
import {CounterWidget} from "./Card"
import {Col} from '@themesberg/react-bootstrap';

export const TDBReactCard = (props) =>{
    const config=props.config || {}

    return  <Col xl={2}>
        <CounterWidget config={config} dataProvider={props.dataProvider}/>
    </Col>
}
