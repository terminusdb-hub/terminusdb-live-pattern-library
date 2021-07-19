import React, {useState} from "react"
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'
import {BiPlus} from "react-icons/bi"
import {Button} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT} from "./constants"
import {WOQLClientObj} from '../init-woql-client'

export const JsonViewer = ({frame, mode}) => {
    //return <ReactJson src={frame} theme="eighties" onEdit={true} displayDataTypes={false}/>
    const [json, setJson] = useState(false)

    const {
        woqlClient, 
        createNewDocument
    } = WOQLClientObj()

    const {
        setNewDocumentInfo,
        reportAlert,
        loading
    } = DocumentControl()

    function handleChange (object) {
        setJson(object.jsObject)
    }

    function submitDocument () {
        setNewDocumentInfo(json)
    }

    return  <React.Fragment>
        {loading && <Loading message={`Creating new ${createNewDocument} ...`} type={PROGRESS_BAR_COMPONENT}/>}
        {reportAlert && reportAlert}
        <JSONInput
            id='create-document-via-json'
            placeholder={frame}
            locale={locale}
            height="600px"
            width="w-100"
            onBlur={handleChange}
        />
        <Button className="btn btn-sm mt-2 float-right" variant="info" onClick={submitDocument}>
            <BiPlus className="mr-1"/>Create
        </Button>
    </React.Fragment>
}