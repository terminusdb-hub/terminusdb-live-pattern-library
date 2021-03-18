import React from "react"

export function PrettyPrint(props){
     return (<div>
     <pre>
       {JSON.stringify(props.data, null, 2) }
     </pre>
   </div>)
 }
