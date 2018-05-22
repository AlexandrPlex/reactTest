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
          pass: passowrd
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
        })
        .catch(error => {
          dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: error});
        });
    });
  };

  onLogout = () => this.dispatch({type: ActionTypes.LOGOUT})
}
