
import React, {useState, useEffect} from "react"
import {Nav, Row, Col} from '@themesberg/react-bootstrap'
import {branchActionConfig} from './constants'
import {BiGitMerge} from "react-icons/bi"
import {AiOutlineUndo, AiOutlineCompress, AiOutlineDelete, AiOutlineCheckCircle} from "react-icons/ai"

export const BranchActions = ({}) => {
    return <Row>
        <Col lg={12}>
            <Nav fill defaultActiveKey="home" variant="pills" className="flex-column flex-sm-row">
                <Nav.Item>
                    <Nav.Link eventKey={branchActionConfig.merge.label} href="#" className="mb-sm-3 mb-md-0" title={branchActionConfig.merge.title}>
                        <BiGitMerge className="mr-2" />{branchActionConfig.merge.label}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={branchActionConfig.reset.label} href="#" className="mb-sm-3 mb-md-0" title={branchActionConfig.reset.title}>
                        <AiOutlineUndo className="mr-2" /> {branchActionConfig.reset.label}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={branchActionConfig.squash.label} href="#" className="mb-sm-3 mb-md-0" title={branchActionConfig.squash.title}>
                        <AiOutlineCompress className="mr-2" /> {branchActionConfig.squash.label}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={branchActionConfig.optimize.label} href="#" className="mb-sm-3 mb-md-0" title={branchActionConfig.optimize.title}>
                        <AiOutlineCheckCircle className="mr-2" /> {branchActionConfig.optimize.label}
                    </Nav.Link> 
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={branchActionConfig.delete.label} href="#" className="mb-sm-3 mb-md-0" title={branchActionConfig.delete.title}>
                        <AiOutlineDelete className="mr-2" /> {branchActionConfig.delete.label}
                    </Nav.Link> 
                </Nav.Item>
            </Nav>
        </Col>
  </Row>
}