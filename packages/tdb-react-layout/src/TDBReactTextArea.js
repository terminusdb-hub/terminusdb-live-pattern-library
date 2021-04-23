import React from "react"
import { Form, InputGroup } from '@themesberg/react-bootstrap';

export const TDBReactTextArea = (props) =>{
    let config=props.config || {}
    let label=props.config.label || null
    let type=props.config.type || "text"
    let placeholder=props.config.placeholder || null
    var icCss
    if(config.icon && config.label) icCss="me-2"
    else icCss=""
    const iconName=config.icon ? `${config.icon} ${icCss}` : null

    function handleOnClick(e) {
      if(props.onClick) props.onClick(e.target.id)
    }

    return <Form>
      <Form.Group className="mb-3">
        {label && <Form.Label>{label}</Form.Label>}
        <InputGroup>
          {/*iconName && <i class={iconName}/>*/}
          <Form.Control type={type} placeholder={placeholder} />
        </InputGroup>
      </Form.Group>
    </Form>
}
