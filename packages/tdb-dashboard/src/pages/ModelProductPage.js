import React from "react"
import {ModelBuilder} from "./ModelBuilder"
import {Sidebar} from "./Sidebar"
import {Layout} from "./Layout"

export const ModelProductPage = () => {
     
return <Layout sideBarContent={<Sidebar></Sidebar>}>
            <main role="main" className="m-4">
                <ModelBuilder/>
            </main>
        </Layout>
}