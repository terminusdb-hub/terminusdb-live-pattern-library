import React, {useState} from "react"
import {LeftSideBar} from "../components/LeftSideBar"
import {Layout} from "./Layout"
import {Card, Container, Form} from "react-bootstrap"


export const TokenPage = (props) => {

    return  <Layout sideBarContent={<LeftSideBar route={"TOKENS"}></LeftSideBar>}>
    <Container style={{marginTop: "125px"}}>
HELLO TOKEN PAGE
    </Container>
    </Layout>
    
    


}