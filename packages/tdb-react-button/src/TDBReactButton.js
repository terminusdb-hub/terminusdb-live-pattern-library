import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from '@themesberg/react-bootstrap';

export const TDBReactButton= (props) =>{
    let config=props.config || {}
    let size=config.size || "sm" 

    return <Button variant="outline-primary" bsPrefix="text" href="#primary" className="m-1" key={`Buttons_${config.title}`} size={size}>
      <FontAwesomeIcon icon={config.icon} className="me-2"/> 
      {config.title}
    </Button>
}
