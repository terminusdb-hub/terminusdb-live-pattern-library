import React from "react"
import {Card, Col} from '@themesberg/react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const TDBReactCardList=(props) => {

    let config = props.config || []
    let data=props.dataProvider || 0

    return <Col xl={config.size} >
        <Card border="light" className="shadow-sm">
            <Card.Body>
                <div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3">
                    <div>
                        <h6><FontAwesomeIcon icon={config.icon} className="icon icon-xs me-3" />{config.title}</h6>
                    </div>
                    <div>
                        {/*<Card.Link href="#" className="text-primary fw-bold">
                            {data}
                        </Card.Link>*/}
                        <h4 className="text-primary fw-bold">{data}</h4>
                    </div>
                </div>
            </Card.Body>
        </Card>
    </Col>;
}
