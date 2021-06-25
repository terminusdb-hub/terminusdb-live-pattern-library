
import React, {useState} from "react"
import {Card, Container, Form} from "react-bootstrap"
import {useAuth0} from "../react-auth0-spa"
import {Sidebar} from "./Sidebar"
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {SEND_FEEDBACK_CONFIG} from "./constants"
import {SendEmailHook} from "../hooks/SendEmailHook"
import {Alerts} from "../components/Alerts"
import {TERMINUS_SUCCESS, TERMINUS_DANGER} from "../components/constants"

export const Feedback = (props) => {
    const {setSelectedDataProduct} = WOQLClientObj()
    const {user} = useAuth0()
    const userName= user ? user['http://terminusdb.com/schema/system#agent_name'] : false

    const {emailResult, sendEmailResult, setEmailError, emailError, sendEmailData}=SendEmailHook()

    const [message, setMessage]=useState(false)

    function sendFeedback (e) {
        if(!user && !userName) return
        let data = {}
        data['username']=userName
        data['email']=user.email
        data['message']=message
        sendEmailData(data)
    }

    function handleMessage (e) {
        setMessage(e.target.value)
    }


    return <Layout sideBarContent={<Sidebar setSelectedDataProduct={setSelectedDataProduct}></Sidebar>}>
        <Container style={{marginTop: "125px"}}>
             <Card className="shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5" style={{width: "500px"}}>
                <div className="cowduck-top-sec bg-transparent border-0 text-center "> 
                    <img className="card-img cowduck-feedback-avatar large-avatar rounded-circle mx-auto" src="../assets/CowDuckHead.png"/>
                </div>
                <div>
                    <h5 className="text-center mt-2">Send us your Feedback  </h5>
                    <h1 className="text-center mt-3">Hi {userName} !</h1>
                    <Form> 
                        {emailResult && <Alerts message={emailResult} type={TERMINUS_SUCCESS} onCancel={sendEmailResult}/>}
                        {emailError && <Alerts message={emailError} type={TERMINUS_DANGER} onCancel={setEmailError}/>}
                        <Form.Group>
                            <Form.Label className="text-muted">Message</Form.Label>
                            <Form.Control as="textarea" 
                                rows={10} 
                                placeholder="If you notice any bugs or have any suggestions about how we can improve TerminusX, please let us know !"
                                onBlur={handleMessage}/>
                        </Form.Group>
                    </Form>
                    <div className="float-right">
                        <TDBReactButton onClick={sendFeedback} config={SEND_FEEDBACK_CONFIG}/>
                    </div>
                </div>
            </Card>
        </Container>
    </Layout>
    
}