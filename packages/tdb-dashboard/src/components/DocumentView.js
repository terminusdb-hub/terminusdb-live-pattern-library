import React from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {CREATE_NEW_DOCUMENT_BUTTON} from "./constants"

export const DocumentView = () => {
    return  <main className="content mr-3 ml-5 w-100">
        <TDBReactButton config={CREATE_NEW_DOCUMENT_BUTTON}/>
    </main>
}