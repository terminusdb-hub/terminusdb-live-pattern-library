import React from "react"
import {TDBReactButtonGroup} from '@terminusdb-live/tdb-react-layout'
import {VIEW_SWITCHER_BUTTON_GROUP} from "./constants"
import {Row, Col} from "@themesberg/react-bootstrap"

export const ViewChooser=(props) =>{

    function handleClick(view){
        if(props.onClick) props.onClick(view)
    }


    return  <React.Fragment>
        <Row>
            <Col className="d-flex justify-content-md-end">
                <TDBReactButtonGroup config={VIEW_SWITCHER_BUTTON_GROUP} onClick={handleClick}/>
            </Col>
        </Row>
    </React.Fragment>
    
}