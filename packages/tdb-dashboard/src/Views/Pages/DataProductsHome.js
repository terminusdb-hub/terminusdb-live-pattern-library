
import React from "react"
import {DataProductList} from "../../Hooks/DataProductList"
import {DatabaseCard, NewDatabaseCard} from "../../Components/DatabaseCard"
import {Container, Row} from "@themesberg/react-bootstrap"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {NEW_DATA_PRODUCT_BUTTON} from "./constants"

export const DataProductsHome = ({woqlClient}) => {

    const {list, setList} = DataProductList(woqlClient)

  
    return <Container>
        <Row>
            <div class="col-md-2 d-grid pb-3">
                <TDBReactButton config={NEW_DATA_PRODUCT_BUTTON}/>
            </div>
        </Row>
        <hr class="my-3 border-indigo dropdown-divider" role="separator"></hr>
        <h4 className="mt-5 mb-5">Data Products</h4>
        <Row className="equal">
                {list.map(item => <div className="col-md-4 d-grid pb-3">
                    <DatabaseCard title={item.label} description={item.comment} id={item.id}/>
                    </div>
                )}
        </Row>
    </Container>
}