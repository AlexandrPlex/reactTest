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
			    if (response.status === 200 || 304) {
			      return response.json();
			    } else {
			      throw response.status;
			    }
			  })
	                    
}

export function getData(nameColletion: string, token: string, filterID?: string) {
	let filterConf = filterID ? `&filterID=${filterID}` : '';
	return	fetch(`${SiteConfig.APIPREFIX}/${ServerCall.GETDATA}?collectionName=${nameColletion}${filterConf}`,
	{
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json',
	      'token': `${token}`, 
	    },
	    method: 'GET',
	    mode: 'cors',
	  })
	  .then(response => {
	    if (response.status === 200 || 304) {
	      return response.json();
	    } else {
	      throw response.status;
	    }
	  })
}