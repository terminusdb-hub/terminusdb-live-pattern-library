import React from "react"


export const SampleQueries = (props) => {

    let config = {variant: "secondary", className:"w-100", title:"somthing", label: "something"}

    return <React.Fragment>
        <div className="mb-3"><a style={{color: "#eaedf2 "}}>{"Get classes"}</a></div>
        <div className="mb-3"><a style={{color: "#eaedf2"}}>{"Get properties"}</a></div>
        <div className="mb-3"><a style={{color: "#eaedf2"}}>{"Get documents meta data"}</a></div>
    </React.Fragment>
}