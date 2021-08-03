
import React, {useState} from "react"
import {VscJson} from "react-icons/vsc"
import {BiTable} from "react-icons/bi"
import {Button} from "react-bootstrap"
import { JSON_VIEW, FORM_VIEW } from "./constants"

export const ToggleJsonAndFormControl = ({onClick, documentObject}) => {

    return <React.Fragment>
        {(documentObject.view==FORM_VIEW) && <Button className="btn btn-sm float-right btn-light mr-2" onClick={(e) => onClick(JSON_VIEW)} title={"View in JSON format"}>
            <VscJson className="mr-1"/> JSON View
        </Button>}
        {(documentObject.view==JSON_VIEW) && <Button className="btn btn-sm  btn-light mr-2" onClick={(e) => onClick(FORM_VIEW)} title={"View in Form format"}>
            <BiTable className="mr-1"/> Form View
        </Button>}
    </React.Fragment>

}