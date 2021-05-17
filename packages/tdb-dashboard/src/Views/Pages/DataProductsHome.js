
import React, {useState} from "react"
import {DatabaseCard, NewDatabaseCard} from "../../Components/DatabaseCard"
import {Container, Row} from "@themesberg/react-bootstrap"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {NEW_DATA_PRODUCT_BUTTON, DATA_PRODUCT_LABEL} from "../constants"
import {useCreateNewDataProductStates} from "../../Hooks/CreateNewDataProduct"

export const DataProductsHome = ({woqlClient, list}) => {
    
    const [selectDP, setSelectDP] = useState(false)
    const {newDataProduct,
        setNewDataProduct,
        setNewDataProductInfo,
        loading,
        handleNew} = useCreateNewDataProductStates(woqlClient)
    
    return <Container>
        <Row>
            <div class="col-md-3 d-grid pb-3">
                <TDBReactButton config={NEW_DATA_PRODUCT_BUTTON} onClick={handleNew}/>
            </div>
        </Row> 
        <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
        <h4 className="mt-5 mb-5">{DATA_PRODUCT_LABEL}</h4>
        <Row className="equal">
            {newDataProduct && <div className="col-md-4 d-grid pb-3">
                <NewDatabaseCard onCancel={setNewDataProduct} 
                    setNewDataProductInfo={setNewDataProductInfo} 
                    loading={loading}/>
            </div>
            }
            {list.map(item => <div key={`key_${item.id}`} className="col-md-4 d-grid pb-3">
                    <DatabaseCard title={item.label} 
                        description={item.comment} 
                        onClick={setSelectDP}
                        key={`key_${item.id}`}
                        id={item.id}/>
                </div>
            )}
        </Row>
    </Container>
}