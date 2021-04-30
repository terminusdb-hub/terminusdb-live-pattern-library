import React, { useState } from "react"
import {TDBReactButtonGroup, TDBReactButton, TDBReactDropDownButtons} from '@terminusdb-live/tdb-react-layout'
import {VIEW_SWITCHER_BUTTON_GROUP, COLLAPSE_BUTTON_GROUP, UNCOLLAPSE_BUTTON_GROUP, GRAPH_VIEW, TABLE_VIEW,
    TABLE_RESULT_CONTROLLER, GRAPH_RESULT_CONTROLLER} from "./constants"
import {Row, Col} from "@themesberg/react-bootstrap"


export const ResultController=(props) =>{

    const [currentView, setCurrentView] = useState(TABLE_VIEW)

    function handleClick(view){
        if(props.onClick){
            props.onClick(view)
            setCurrentView(view)
        }
    }

    
    return  <React.Fragment>
        <Row>
            <Col md={3}>
                <TDBReactButtonGroup config={VIEW_SWITCHER_BUTTON_GROUP} onClick={handleClick}/>
                {(currentView==TABLE_VIEW) && 
                    <TDBReactDropDownButtons config={TABLE_RESULT_CONTROLLER}/>
                }
                {(currentView==GRAPH_VIEW) && 
                    <TDBReactDropDownButtons config={GRAPH_RESULT_CONTROLLER}/>
                }
            </Col>

            <Col md={8}>
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