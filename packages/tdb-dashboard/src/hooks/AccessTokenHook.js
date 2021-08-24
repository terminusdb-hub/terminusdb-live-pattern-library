import { useState, useEffect } from "react"
import   axios  from "axios"
import { useAuth0 } from "../react-auth0-spa"
import {getOptions,getBaseUrl} from "./hookUtils"
 
export const AccessTokenHook=()=> {
	const axiosHub=axios.create();

	const {getTokenSilently } = useAuth0()

	const [token,setToken]=useState(null)
	const [tokenList,setTokenList]=useState([])

	const [loading,setLoading]=useState(null)

	const [newTokenLoading,setNewTokenLoading]=useState(null)
	const [error,setError]=useState(null)

	const [tokenLabel,setTokenLabel]=useState('')
	const [tokenLabelError,setTokenLabelError]=useState(null)

	const baseUrl=getBaseUrl();

	useEffect(() => {		
	    getTokenList()
	},[])

	async function getTokenList(){ 
		setLoading(true)
		try{
			const token = await getTokenSilently()
			const options = getOptions(token);
			const response = await axiosHub.get(`${baseUrl}/tokens`, options)
			if(response.data && response.data.bindings){
				//console.log("TOKEN LIST",response.data.bindings)
				setTokenList(response.data.bindings)
			}
		}catch(err){
			setError('I can not get the token list')
		}finally{
        	setLoading(false)
        }
	}

	async function deleteToken(tokenId){
		setLoading(true)
		try{
			/*
			* encoding the tokenID
			*/
			console.log("__TOKEN__ID",tokenId);
			const tokenbase64=btoa(tokenId)
			const Auth0token = await getTokenSilently()			
			const options = getOptions(Auth0token);
			const result = await axiosHub.delete(`${baseUrl}/tokens/${tokenbase64}`, options)	
			getTokenList()
			setToken(null)
		}catch(err){
        	setError('I can not delete the token')
        }finally{
        	setLoading(false)
        } 
	}

	async function getToken(tokenLabel){
		setNewTokenLoading(true)
		try{
			const body={description:tokenLabel}
			const token = await getTokenSilently()
			
			const options = getOptions(token);

			const result = await axiosHub.post(`${baseUrl}/tokens`, body, options)
			setToken(result.data.access_token)
			setTokenLabel("");
			getTokenList();
        }catch(err){
        	setError('I can not get the token')
        }finally{
        	setNewTokenLoading(false)
        }     
	}

	return {getToken,
			token,
			loading,
			newTokenLoading,
			tokenList,
			tokenLabel,
			setTokenLabel,
			tokenLabelError,
			setTokenLabelError,
			deleteToken}
}