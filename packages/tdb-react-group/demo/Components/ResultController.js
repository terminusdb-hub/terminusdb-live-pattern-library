import React from "react"
import {TDBReactButtonGroup, TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {VIEW_SWITCHER_BUTTON_GROUP, COLLAPSE_BUTTON_GROUP, UNCOLLAPSE_BUTTON_GROUP} from "./constants"
import {Row, Col} from "@themesberg/react-bootstrap"

export const ResultController=(props) =>{

    function handleClick(view){
        if(props.onClick) props.onClick(view)
    }

    return  <React.Fragment>
        <Row>
            <Col md={2}>
                <TDBReactButtonGroup config={VIEW_SWITCHER_BUTTON_GROUP} onClick={handleClick}/>
            </Col>
            <Col md={9}>
            </Col>
            <Col md={1}>
                {props.isExpanded && <TDBReactButton 
                    config={COLLAPSE_BUTTON_GROUP} 
                    onClick={() => props.setExpanded((prevExpanded) => !prevExpanded)}/>}
                
                {!props.isExpanded && <TDBReactButton 
                    config={UNCOLLAPSE_BUTTON_GROUP} 
                    onClick={() => props.setExpanded((prevExpanded) => !prevExpanded)}/>}
            </Col>
        </Row>
    </React.Fragment>
    
}