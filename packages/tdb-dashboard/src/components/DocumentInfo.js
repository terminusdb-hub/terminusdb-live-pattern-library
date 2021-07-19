
import React, {useState} from "react"
import {Form, Row, Card, Col, Button} from "react-bootstrap"
import {AiOutlineDelete} from "react-icons/ai"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT} from "./constants"
import {DocumentControl} from "../hooks/DocumentControl"
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'
import {ToggleJsonAndFormControl} from "./ToggleJsonAndFormControl" 
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')

export const DocumentInfo = ({documentIdInfo, chosenDocument}) => {

    const [jsonView, setJsonView] = useState(false)
    const {
        setDeleteDocument,
        loading,
        reportAlert
    } = DocumentControl()

    const DocumentContents = ({documentIdInfo}) => {
        let contents = [], docInfo = documentIdInfo[0]
        for (var key in docInfo) {
            contents.push(
                <Form.Group controlId={key}>
                    <Form.Label className="mr-5 text-muted fw-bold" style={{minWidth: "150px"}}>
                        {key}
                    </Form.Label>
                    <Form.Label>
                        {docInfo[key]}
                    </Form.Label>
                </Form.Group>
            )
        }
        return contents
    }

    const DocumentJsonView = ({documentIdInfo}) => {
        let docInfo = documentIdInfo[0]

        let options = {lineNumbers: true, mode: "javascript", theme: 'ayu-dark'}
        return <CodeMirror
            value={JSON.stringify(docInfo, null, 2)}
            options={options}
        />
    }

    if(!documentIdInfo) return <div/>

    function handleClick () { // on toggle of json and form controls
        setJsonView(!jsonView)
    }

    return <main className="content mr-3 ml-5 w-100">
        <Row className="w-100">
            <Col md={9}> 
                {loading && <Loading message={`Deleting ${chosenDocument} ...`} type={PROGRESS_BAR_COMPONENT}/>}
                {reportAlert && reportAlert}
                <Card className="d-flex w-100">
                    <Card.Header className="d-flex w-100">
                        <h5 className="col-md-10"><strong className="text-success">{chosenDocument}</strong></h5>
                        <ToggleJsonAndFormControl jsonView={jsonView} onClick={handleClick}/>
                        
                        <Button className="btn btn-sm btn-danger" onClick={(e) => setDeleteDocument(chosenDocument)} title={`Delete ${chosenDocument}`}>
                            <AiOutlineDelete className="mr-1"/> Delete
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        {!jsonView && 
                            <Form>
                                <DocumentContents documentIdInfo={documentIdInfo}/>
                            </Form>
                        }
                        {jsonView && <DocumentJsonView documentIdInfo={documentIdInfo}/>}
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}>
            </Col>
        </Row>
    </main>
}
