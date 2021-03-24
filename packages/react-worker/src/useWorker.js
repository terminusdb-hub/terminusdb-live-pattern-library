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
            //console.log("___item____",item)
            const obj={}
            Object.keys(item).forEach(key=>{
                
                obj[key]=item[key]['@value']
            })
            formattedTmp.push(obj) 
        })

        const groupBy = {};
        formattedTmp.forEach( el =>{
           const userName=el['UserName']
           const commit_num=el['Commit_num']
           if(!groupBy[el['TimeStamp']]){          
                groupBy[el['TimeStamp']]= {TimeStamp:el['TimeStamp'], 
                                           Commit_num:commit_num,
                                           Commit_numTool:{}}
                groupBy[el['TimeStamp']]['Commit_numTool'][userName] = commit_num           
               
           }else{
                const com_value = groupBy[el['TimeStamp']]['Commit_num'] + commit_num;
                groupBy[el['TimeStamp']]['Commit_numTool'][userName] = commit_num
                groupBy[el['TimeStamp']]['Commit_num'] = com_value
           }
        })

       // console.log("___GROUP____",groupBy)

       


        /*
        "Date": "2020-11-25T00:00:00",
      "Commit":{value:56, tooltip:{anna:45,ddkkfk}}
      "0Days": {
        "value": 388,
        "tooltip": {
          "2020-11-25T00:00:00": 388
        }
      },*/
        console.log(JSON.stringify(Object.values(groupBy)))
        setDataProvider(Object.values(groupBy))
       }

   }
   
   async function onChange(endPoint){

   }

   return {dataProvider,onChange,error,loading}
}
  