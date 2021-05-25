
import React from "react"
import { Alert, Button } from '@themesberg/react-bootstrap';
import {TERMINUS_WARNING, TERMINUS_SUCCESS, TERMINUS_DANGER} from "./constants"
import {AiOutlineCheckCircle, AiOutlineWarning} from "react-icons/ai"
import {BiErrorCircle} from "react-icons/bi"
import {queryTimeDisplay} from "./utils"

export const Alerts = ({message, type, onCancel, time}) => {

    const [hiddenAlerts, setHiddenAlerts] = React.useState([])

    let updateTime = Date.now() - time

    const onClose = (alertId) => {
        const hiddenAlertsUpdated = [...hiddenAlerts, alertId]
        setHiddenAlerts(hiddenAlertsUpdated)
        if(onCancel) onCancel(false)
    }

    const shouldShowAlert = (alertId) => (
        hiddenAlerts.indexOf(alertId) === -1
    )
    
    if(type == TERMINUS_WARNING)
        return <Alert
            variant="warning"
            show={shouldShowAlert("warning")}
            onClose={() => onClose("warning")}>

            <div className="d-flex justify-content-between">
            <div>
                <AiOutlineWarning className="me-1" />
                <strong>Warning: </strong> {message}
            </div>
            <Button variant="close" size="xs" onClick={() => onClose("warning")} />
            </div>
        </Alert>

    if(type == TERMINUS_DANGER)
        return  <Alert
            variant="danger"
            show={shouldShowAlert("danger")}
            onClose={() => onClose("danger")}>

            <div className="d-flex justify-content-between">
            <div>
                <BiErrorCircle className="me-1" />
                <strong>Warning: </strong> {message}
            </div>
            <Button variant="close" size="xs" onClick={() => onClose("danger")} />
            </div>
        </Alert>

    if(type == TERMINUS_SUCCESS) 
        return  <Alert
            variant="success"
            show={shouldShowAlert("success")}
            onClose={() => onClose("success")}>

            <div className="d-flex justify-content-between">
            <div>
                <AiOutlineCheckCircle className="me-1" />
                <strong>Warning: </strong> {message} 
                {updateTime && ` ${queryTimeDisplay(updateTime)}`}
            </div>
            <Button variant="close" size="xs" onClick={() => onClose("success")} />
            </div>
        </Alert>

}