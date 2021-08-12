import { useState, useEffect } from "react"
import axios from "axios" 

export function SendEmailHook(props) {

	const axiosHub=axios.create();
	const [emailResult, sendEmailResult] = useState(false)
	const [emailData, sendEmailData] = useState(null)
    const [emailError,setEmailError]=useState(false)
    const [loadingEmail, setEmailLoading] = useState(false)
  

	//const bff_url=process.env.TERMINUS_BFF_URL
	const bff_url=process.env.TERMINUSDB_SERVER
	const baseUrl=`${bff_url}api`

    const options = {
		mode: 'cors', // no-cors, cors, *same-origin
		redirect: 'follow', // manual, *follow, error
		referrer: 'client',
	}

	useEffect(() => {
		 async function callEmailServer() {
		 	try{
		 		setEmailLoading(true)
		 		setEmailError(false)
		 		sendEmailResult(false)

                const result = await axiosHub.post(`${baseUrl}/email`, emailData , options)
               
                sendEmailResult(result.data.message)
			}
            catch(err){
				console.error(err)
				setEmailError(true)
			}
            finally{
				setEmailLoading(false)
			}
		 }

		if(emailData!==null){
	     	callEmailServer()
		}
    }, [emailData])




    return {emailResult, sendEmailResult, emailError,sendEmailData, setEmailError}
}

