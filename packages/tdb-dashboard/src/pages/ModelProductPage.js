import React from "react"
import {ModelBuilder} from "./ModelBuilder"
import {Layout} from "./Layout"
import {LeftSideBar} from "../components/LeftSideBar"

export const ModelProductPage = () => {

    return <Layout sideBarContent={<LeftSideBar/>}>
        <main role="main" className="content w-100">
            <ModelBuilder/>
        </main>
    </Layout>
     
}