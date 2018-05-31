import {SiteConfig, ServerCall} from '../Actions/Consts';

export function postLogin(login: string, password: string) {
	return	fetch(`${SiteConfig.APIPREFIX}/${ServerCall.LOGIN}`,{
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  },
			  method: 'POST',
			  mode: 'cors',
			  body: JSON.stringify({
			    login: login,
			    password: password
			  })
			})
			  .then(response => {
			    if (response.status === 200) {
			      return response.json();
			    } else {
			      throw response.status;
			    }
			  })
	                    
}