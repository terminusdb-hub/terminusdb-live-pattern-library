
import React from "react"
import { Card, Accordion } from '@themesberg/react-bootstrap';

export const TDBReactAccordian = (props) => {
    const { defaultKey, data = [], className = "" } = props;

    const AccordionItem = (item) => {
        const { eventKey, title, description, icon } = item;
        let iconName = `me-2 ${icon}`
        return (
            <Accordion.Item className="transparant" eventKey={eventKey}>
            <Accordion.Button variant="link" className="w-100 d-flex justify-content-between sidebar-accordian">
                <span className="h6 mb-0 fw-bold">
                    {iconName && <i className={iconName}/>}
                    {title}
                </span>
            </Accordion.Button>
            <Accordion.Body>
                <Card.Body className="py-2 px-0">
                <Card.Text className="mb-0">
                    {description}
                </Card.Text>
                </Card.Body>
            </Accordion.Body>
            </Accordion.Item>
        )
    }
  
    return (
      <Accordion className={className} defaultActiveKey={defaultKey}>
            {data.map(d => <AccordionItem key={`accordion-${d.id}`} {...d} />)}
      </Accordion>
    );
}