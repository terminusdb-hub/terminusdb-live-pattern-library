export function getOptions(token){

	const options = {
		mode: 'cors', // no-cors, cors, *same-origin
		redirect: 'follow', // manual, *follow, error
		referrer: 'client',
	};
	
	options.headers = { Authorization: `Bearer ${token}` };

	return options;
}

export function getBaseUrl(){
	/*
    * link to the node server
    */
    const bff_url= process.env.REACT_APP_BFF_URL || '/';
	return `${bff_url}api`
}