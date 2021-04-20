import React from "react"
import {Button} from '@themesberg/react-bootstrap';

export const TDBReactButton= (props) =>{
    let config=props.config || {}
    let size=config.size || "sm" 
    const iconName=config.icon ? `fas ${config.icon} fa-2x m-4` : null

    function handleOnClick(e) {
      if(props.onClick) props.onClick(e.target.id)
    }

    return <Button className="m-1" key={`Buttons_${config.title}`} size={size} variant={config.variant} title={config.title} id={config.id} onClick={handleOnClick}>
      {iconName && <i class={iconName}/>}
      {config.label}
    </Button>
}
