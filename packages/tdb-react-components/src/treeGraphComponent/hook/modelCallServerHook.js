import React, {useState,useEffect} from "react";
import MainGraphObject from "../MainGraphObject"
import TerminusClient from '@terminusdb/terminusdb-client'

export const modelCallServerHook = (woqlClient,branch,ref,dbId) => {

	//const [mainGraphDataProvider, setResultMainGraph] = useState({classesResult:null,propsResult:null,restResult:null});*/
	const [mainGraphDataProvider, setResultMainGraph] = useState([])
	const [reloadGraph, setReloadGraph] = useState(null);

	const [callServerLoading, setLoading] = useState(false);

	const [reportMessage, setReport] = useState(false);


	/*
	* create the mainGraphObject and format the data
	*/
	useEffect(() => {
		const loadGraphData= async ()=> {
			setLoading(true)
			let jsonSchema=[]
			try{
				const params={"as_list":true,"graph_type":"schema"}
				const jsonArr = await woqlClient.getDocument(params)	
				jsonSchema = jsonArr.slice(1)
			}catch(err){
				//tobe review				
				setReport(err.message)
			}finally{
				setResultMainGraph(jsonSchema);
				setLoading(false)
			}	
    	}
    	if(woqlClient)loadGraphData()
   		//Promise.all([someCall(), anotherCall()]).then((results)=>{

	}, [reloadGraph,branch,ref,dbId])

	//lets see how use it
	async function cleaningCardinality() {
		try {
			const WOQL = TerminusClient.WOQL;
			const card = WOQL.quad("v:Element", "type", "owl:Restriction", "schema/main").not().quad("v:Element", "owl:onProperty", "v:prop", "schema/main");
			const result = await woqlClient.query(card);
			if (result && result.bindings.length > 0) {
				const query = [];
				result.bindings.forEach((item, index) => {
						const elementName = item.Element
						query.push(WOQL.delete_class(elementName, "schema/main", `v:varName__${index}`));
						query.push(WOQL.opt(
							WOQL.quad(`v:dom__${index}`, "rdfs:subClassOf", `v:sub__${index}`, "schema/main").eq(`v:sub__${index}`, `${elementName}`)
								.delete_quad(`v:dom__${index}`, "rdfs:subClassOf", `v:sub__${index}`, "schema/main")
						));
					});

					await woqlClient.query(WOQL.and(...query));
			}
		} catch (err) {
			console.log("__CARDINALITY__ERROR__", err);
		}
	}
	
	const saveGraphChanges= async (updateObject,commitMessage)=>{
		if(updateObject!==undefined){
			let ts = Date.now()
			setLoading(true)
			const commitM=commitMessage || "Update from model builder"
			try{
				if(updateObject.deleteList.length>0){
					await woqlClient.deleteDocument({id:updateObject.deleteList})
				}
				if(updateObject.updateList.length>0){
					await woqlClient.updateDocument(updateObject.updateList)
				}
				/*woqlClient.query(query,commitM).then(result=>{				
					let msg = `Successfully updated schema graph`
					setReport({
						status: 'success',
						message:  msg,
						time: Date.now() - ts,
					})*/
					
	            setReloadGraph(Date.now())
			}catch(err){
				//setError(err.message)
				let rep = {status: 'error', error: err}
                let failureMessage = `Failed to load schema graph`
                //setReport({failure: failureMessage, report: rep})


                setReport({
	                status: "error",
	                message: `Failed to update schema graph`,
	                error: err,
	                time: Date.now() - ts,
            	})
			}finally{
				setLoading(false)
			}
		}
	}

	const resetReport=()=>{
		setReport(false)
	}

	
	return {
        mainGraphDataProvider,
        saveGraphChanges,
        reportMessage,
        callServerLoading,
        resetReport
    }
}	

