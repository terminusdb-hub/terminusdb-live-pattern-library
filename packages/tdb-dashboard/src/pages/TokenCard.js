import React, {Fragment,useRef,useState} from "react";
import { Button, Container, Card, Row,Col, Form} from "react-bootstrap"
import {AccessTokenHook} from "../hooks/AccessTokenHook"

export const TokenCard=()=>{
	const {getToken,
			token,
			loading,
			newTokenLoading,
			tokenList,
			tokenLabel,
			setTokenLabel,
			tokenLabelError,
			setTokenLabelError,
			deleteToken} = AccessTokenHook();
	
	
	//let from_console = window.location.search.includes("console=")
	
	const api_token = useRef(null);

	const deleteItem=(item_name)=>{
		deleteToken(item_name)
	}

	const onChange=(evt)=>{
		setTokenLabelError(null)
		setTokenLabel(evt.target.value)
	}

	const callGetToken=()=>{
		if(tokenLabel.trim()===''){
			setTokenLabelError('Please add a token message')
		}else{

			getToken(tokenLabel)
		}		
	}

	const copyFunction=()=> {
  		/* Get the text field */
  		if(api_token){
	 		 /* Select the text field */
	  		api_token.current.select(); 
	  		api_token.current.setSelectionRange(0, 99999); /* For mobile devices */

	  		/* Copy the text inside the text field */
	  		document.execCommand("copy");
	  	}
	}

	return(
			<Card className="p-3">
				<h4 className="mt-4"><strong>Personal access tokens</strong></h4>
				<label className="description text-muted">The Tokens can be used to access the TerminusDB Api</label>
				<hr className="my-space mt-4 mb-2" />
			<Row>
			  <Col>
			  <div className="form-group">
			  	<div className="input-group mt-2 mb-2">
			  		<input className="form-control"
			            type="text"
			            placeholder="Add a Token Description"
			            value={tokenLabel} onChange={onChange}
			          />
					  <div className="input-group-append">
					    {!newTokenLoading &&  <Button variant="info" onClick={callGetToken}> Generate New Token</Button>}
					    {newTokenLoading && <button className="btn-lg disabled"><i className="fas fa-spinner fa-spin"></i> <span style={{marginLeft:"10px"}}>Loading</span></button>}
					  </div>
					  
				</div>
				{tokenLabelError && <Form.Text className="text-warning">
						  Please add a Token description.</Form.Text>}
			  </div>
			  </Col>
			</Row>
			{token && 
			<Row>
				<Col>
			 	<div className="alert alert-success" role="alert">
				  <p className="mt-2 mb-2">Please, copy your new personal access token now. You won’t be able to see it again!</p>
				  <span className="mt-2 d-flex align-items-baseline">
					<input className="tdb__token" ref={api_token} value={token} />
				  	<button onClick={copyFunction} title="Copy to Clipboard" className="btn tdb__copy"><i className="fa fa-copy"></i></button>
				  </span>			  
				</div>
				</Col>
			</Row>
			}			
		</Card>
	
	)
}