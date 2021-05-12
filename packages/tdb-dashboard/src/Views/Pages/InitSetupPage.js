

import React from "react";
import {Col, Row, Image, Container} from '@themesberg/react-bootstrap';
import {OrganizationForm} from "../Forms/OrganizationForm"
import {WELCOME_MESSAGE, SERVICE_NAME, SERVICE_TITLE} from "../constants"

export const InitSetupPage = (props) => {

    return <main>
        <section className="vh-100 d-flex align-items-center justify-content-center">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} lg={6} className="order-2 order-lg-1 text-lg-left">
                        <h1 className="text-primary mt-5 d-flex text-center">
                            {WELCOME_MESSAGE} <span className="fw-bolder">{SERVICE_NAME}</span> 
                        </h1>
                        <p className="lead my-4">{SERVICE_TITLE}</p>
                        <OrganizationForm/>
                    </Col>
                    <Col xs={12} lg={6} className="order-1 order-lg-2 text-center d-flex align-items-center">
                        <div>
                            <Image src={"../../Assets/Clouds.png"} className="img-fluid w-75" />
                            <Image src={"../../Assets/CowDuck.png"} className="img-fluid w-75 cow_duck_image" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </main>
}

