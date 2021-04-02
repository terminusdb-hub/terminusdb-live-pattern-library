import React from "react"
import {Button} from '@themesberg/react-bootstrap';

export const TDBReactButton= (props) =>{
    let config=props.config || {}
    let size=config.size || "sm" 
    const iconName=`fas ${config.icon} fa-2x m-4`


    return <Button bsPrefix="text" href="#primary"  className="m-1" key={`Buttons_${config.title}`} size={size}>
      <i class={iconName}/>
      {config.title}
    </Button>
}
