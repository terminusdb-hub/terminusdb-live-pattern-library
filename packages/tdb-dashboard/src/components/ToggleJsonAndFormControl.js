
import React, {useState} from "react"
import {VscJson} from "react-icons/vsc"
import {BiTable} from "react-icons/bi"
import {Button} from "react-bootstrap"

export const ToggleJsonAndFormControl = ({jsonView, onClick}) => {

    return <React.Fragment>
        {!jsonView && <Button className="btn btn-sm float-right btn-light mr-2" onClick={onClick} title={"View in JSON format"}>
            <VscJson className="mr-1"/> JSON View
        </Button>}
        {jsonView && <Button className="btn btn-sm  btn-light mr-2" onClick={onClick} title={"View in Form format"}>
            <BiTable className="mr-1"/> Form View
        </Button>}
    </React.Fragment>

}