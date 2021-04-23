import React from "react"
import {Button} from '@themesberg/react-bootstrap';

export const TDBReactButton= (props) =>{
    let config=props.config || {}
    let size=config.size || "sm" 
    var icCss
    if(config.icon && config.label) icCss="me-2"
    else icCss=""
    const iconName=config.icon ? `${config.icon} ${icCss}` : null
    let css = props.className || ''

    function handleOnClick(e) {
      if(props.onClick) props.onClick(e.target.id)
    }

    return <Button className={"m-1" + css} key={`Buttons_${config.title}`} size={size} variant={config.variant} title={config.title} id={config.id} onClick={handleOnClick}>
      {iconName && <i class={iconName}/>}
      {config.label}
    </Button>
}
