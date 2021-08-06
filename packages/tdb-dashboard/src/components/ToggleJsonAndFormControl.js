
import React, {useState} from "react"
import {VscJson} from "react-icons/vsc"
import {BiTable} from "react-icons/bi"
import {Button, ButtonGroup} from "react-bootstrap"
import { JSON_VIEW, FORM_VIEW } from "./constants"

export const ToggleJsonAndFormControl = ({onClick, documentObject}) => {

    function handleClick (e, view) {
        if(view == FORM_VIEW) onClick(JSON_VIEW)
        else onClick(FORM_VIEW)
    }

    /*return <React.Fragment>
        {(documentObject.view==FORM_VIEW) && <Button className="btn btn-sm float-right btn-light mr-2" onClick={(e) => onClick(JSON_VIEW)} title={"View in JSON format"}>
            <VscJson className="mr-1"/> JSON View
        </Button>}
        {(documentObject.view==JSON_VIEW) && <Button className="btn btn-sm  btn-light mr-2" onClick={(e) => onClick(FORM_VIEW)} title={"View in Form format"}>
            <BiTable className="mr-1"/> Form View
        </Button>}
    </React.Fragment> */

    /*return <Form className="ml-3">
        <Form.Check 
            type="switch"
            id="json-switch"
            label="View in JSON"
            onClick={(e) => handleClick(e, documentObject.view)}
        />
    </Form>*/

    return <ButtonGroup aria-label="json_form_toggle">
        <Button variant="light" title="Form View" onClick={(e) => onClick(FORM_VIEW)} className="d-flex text-dark">
            <BiTable className="m-1"/> 
            FORM
        </Button>
        <Button variant="light" title="JSON View" onClick={(e) => onClick(JSON_VIEW)} className="d-flex text-dark">
            <VscJson className="m-1"/>
            JSON
        </Button>
    </ButtonGroup>

}