import React from "react"

export function JsonPrint(props){
    const startData= props.startData || {}
    //const onChangeFunction= props.onChangeFunction || null

    const onClick = () =>{
      if(!props.onChangeEndPoint) return 
      if(props.onChangeFunction){
        props.onChangeFunction(props.onChangeEndPoint,{id:'myid'},props.resultVarName)
      }else{
        onChange(props.onChangeEndPoint)
      }
    }
//only for test the style in external file
    return (<div style={{minHeight:"200px",minWidth:"100px",marginBottom:"50px",border:"1px solid black"}}>
     <button onClick={onClick}>CLICK TEST BUILD</button>
     <pre>
       {JSON.stringify(dataProvider, null, 2) }
     </pre>
   </div>)
 }
