import React from 'react'

/*export function Child() {
    // The click event on this button will bubble up to parent,
    // because there is no 'onClick' attribute defined
    return (
      <div className="btn">
        <button>Click HELLO 00000</button>
      </div>
    );
  }*/

  import {useWorker} from "@terminusdb-live/react-worker"
  
  export function JsonPrint(props){
      const startData= props.startData || {}
      //const onChangeFunction= props.onChangeFunction || null
  
      const {onChange,error,loading,dataProvider} = useWorker(startData,props.onLoad)
  
      /*const onClick = () =>{
        if(!props.onChangeEndPoint) return 
        if(props.onChangeFunction){
          props.onChangeFunction('myid',props.resultVarName,props.onChangeEndPoint)
        }else{
          onChange(props.onChangeEndPoint)
        }
      }*/
  //<button onClick={onClick}>CLICK TEST BUTTON</button>
  //only for test the style in external file
      return (<div style={{minHeight:"200px",minWidth:"100px",marginBottom:"50px",border:"1px solid black"}}>
       <pre>
         {JSON.stringify(dataProvider, null, 2) }
       </pre>
     </div>)
   }
  