import React from "react"
import { Card, Accordion,Button } from 'react-bootstrap';

export const TDBReactAccordian = (props) => {
    const { defaultKey, data = [], className = "" } = props;

    const AccordionItem = (item) => {
        const { eventKey, title, description, icon } = item;
        let iconName = `me-2 ${icon}`
        return (     
          <Card className="bg-transparent border-secondary">
          <Accordion.Toggle as={Card.Header}  eventKey={eventKey} className="bg-transparent border-bottom-0">
          <span className="h6 mb-0 fw-bold">
              {iconName && <i className={`mr-2 ${iconName}`}/>}    
              {title}
          </span>
          </Accordion.Toggle>
            <Accordion.Collapse eventKey={eventKey}>
              <Card.Body className="py-2 px-0 m-4">
               {description}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        )
    }
  
    return (
      <Accordion className={className} defaultActiveKey={defaultKey}>
            {data.map(d => <AccordionItem key={`accordion-${d.id}`} {...d} />)}
      </Accordion>
    );
}

/*
<Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Click me!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>Hello! I'm the body</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
        Click me!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>Hello! I'm another body</Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>*/
//warning can not create a h5 inside a <p
//<Card.Text className="mb-0">*/}

/*
<Accordion.Item className="transparant" eventKey={eventKey}>
            <Accordion.Button variant="link" className="w-100 d-flex justify-content-between sidebar-accordian">

        return (
            <Accordion.Item className="bg-transparent mr-4" eventKey={eventKey}>
            <Accordion.Button variant="light" className="bg-transparent w-100 d-flex justify-content-between sidebar-accordian">

                <span className="h6 mb-0 fw-bold">
                    {iconName && <i className={iconName}/>}
                    {title}
                </span>
            </Accordion.Button>
            <Accordion.Body>
                <Card.Body className="py-2 px-0">
                    {description}
                </Card.Body>
            </Accordion.Body>
            </Accordion.Item>
*/