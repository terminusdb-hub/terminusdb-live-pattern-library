import React from "react"
import {Navbar, Container, Nav, Dropdown, Image} from "@themesberg/react-bootstrap"


export const NavBar = () => {
    return <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
    <Container fluid className="px-0">
      <div className="d-flex justify-content-between w-100">
        <Nav className="align-items-center">
        </Nav>
        <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                    <div className="media d-flex align-items-center">
                    <Image src={"../Assets/auth0.png"} className="user-avatar md-avatar rounded-circle" />
                    <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                        <span className="mb-0 font-small fw-bold">Kitty Jose</span>
                    </div>
                    </div>
                </Dropdown.Toggle>
            </Dropdown>
        </Nav>
      </div>
    </Container>
  </Navbar>
}