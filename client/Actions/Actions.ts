import {Dispatch} from 'redux';
import {ActionTypes, AsyncActionTypes} from './Consts';

export interface IDispatchProps {
  actions: Actions;
}

export class Actions {
  constructor(private dispatch: Dispatch<IDispatchProps>) {
  }

  onLogin = (login: string, passowrd: string) => {
    this.dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.BEGIN}`});
    this.dispatch((dispatch: Dispatch<IDispatchProps>) => {
      fetch('http://localhost:8080/login',
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            login: login,
            password: passowrd
          })
        })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw 'error';
          }
        })
        .then(data => {
            dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.SUCCESS}`, payload: data});
            if(data.data.authorized == false){
              alert('Неверный логин или пароль.');
            }else{
              sessionStorage.setItem('sess', 'true');
              document.location.href = '/main';
            }
        })
        .catch(error => {
          dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: error});
        });
    });
  };

  onLoadOrg = () => {
    this.dispatch({type: `${ActionTypes.ONLOADORG}${AsyncActionTypes.BEGIN}`});
    this.dispatch((dispatch: Dispatch<IDispatchProps>) => {
      fetch('http://localhost:8080/Organith',
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'GET',
          mode: 'cors'
        })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw 'error';
          }
        })
        .then(data => {
            dispatch({type: `${ActionTypes.ONLOADORG}${AsyncActionTypes.SUCCESS}`, payload: data});
        })
    });
  };
}
