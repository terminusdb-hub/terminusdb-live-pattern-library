import React from "react"
import {Col} from "react-bootstrap"

export const DataProductSummary = ({dataProductDetails}) => {

    return <Col md={12} className="px-xl-0 mt-5">
        {<React.Fragment>
            <div className="d-flex align-items-center">
                <div class="d-block col-md-2">
                    <h6 class="fw-normal text-muted mb-2">Size</h6>
                    <h3>{"234 KB"}</h3>
                    {/*<h3>{formatBytes(details['Size']['@value'])}</h3>*/}
                </div>
                <div class="d-block col-md-2">
                    <h6 class="fw-normal text-muted mb-2">Triples</h6>
                    <h3>{"3243 triples"}</h3>
                    {/*<h3>{formatTripleCount(details['Triples']['@value'])}</h3>*/}
                </div>
                <div class="d-block col-md-2">
                    <h6 class="fw-normal text-muted mb-2">Commits</h6>
                    <h3>{"520 commits"}</h3>
                    {/*<h3>{formatCommits(details['Commits']['@value'])}</h3>*/}
                </div>
                <div class="d-block col-md-2">
                    <h6 class="fw-normal text-muted mb-2">Classes</h6>
                    <h3>{"90 classes"}</h3>
                   {/* <h3>{formatClassesCount(details['Classes']['@value'])}</h3>*/}
                </div>
                <div class="d-block col-md-2">
                    <h6 class="fw-normal text-muted mb-2">Properties</h6>
                    <h3>{"875 properties"}</h3>
                    {/*<h3>{formatPropertiesCount(details['Properties']['@value'])}</h3>*/}
                </div>
            </div>
            <div className="d-flex align-items-center">
                <div className="d-block mt-5 mb-5 align-items-center col-md-2">
                    <h6 class="fw-normal text-muted mb-2">Most recent commit </h6>
                    <h6>{"10.17, May 27 2021 by TerminusDB"}</h6>
                    {/*<h6>{formatLastCommitTimeStamp(details)}</h6>*/}
                </div>
                <div className="d-block mt-5 mb-5 align-items-center col-md-2">
                    <h6 class="fw-normal text-muted mb-2">First commit </h6>
                    <h6>{"10.17, May 27 2021"}</h6>
                    {/*<h6>{formatLastCommitTimeStamp(details)}</h6>*/}
                </div>
            </div>
        </React.Fragment>
        }
    </Col>
}
