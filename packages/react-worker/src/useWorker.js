import React, { useState,useEffect} from "react";
import   axios  from "axios"

export const useWorker = (startData,onloadEndPoint) => {
  const axiosHub=axios.create();
  const startDataTmp=startData || []
  const [dataProvider,setDataProvider] = useState(startDataTmp)
  const [error,setError]= useState('')
  const [loading,setOnLoading]= useState(false)

   useEffect(() => { 
        async function onLoad(componentName,endPoint){
            try{
                const result = await axiosHub.get(onloadEndPoint)
                formatResult(result)
                //setDataProvider(result)
            }catch(err){
                console.log(err)
            }finally{
        
            }
        }
      if(onloadEndPoint)onLoad()
   }, [onloadEndPoint])

   function formatResult(result){
       if(result.data && result.data.bindings){
        const formattedTmp=[]
        result.data.bindings.forEach(item=>{
            console.log("___item____",item)
            const obj={}
            Object.keys(item).forEach(key=>{
                obj[key]=item[key]['@value']
            })
            formattedTmp.push(obj) 
        })
        setDataProvider(formattedTmp)
       }

   }
   async function onChange(endPoint){

   }

   return {dataProvider,onChange,error,loading}
}
  