import { useState,useEffect} from "react";
import   axios  from "axios"

export const useWorker = (startData,onloadEndPoint) => {
  const axiosHub=axios.create();
  const [dataProvider,setDataProvider]= useState(startData || [])
  const [error,setError]= useState('')
  const [loading,setOnLoading]= useState(false)

   useEffect(() => { 
        async function onLoad(componentName,endPoint){
            try{
                const result = await axiosHub.get(onloadEndPoint)
                setDataProvider(result)
            }catch(err){
                console.log(err)
            }finally{
        
            }
        }
      if(onloadEndPoint)onLoad()
   }, [onloadEndPoint])

   async function onChange(endPoint){

   }

   return {dataProvider,onChange,error,loading}
}
  