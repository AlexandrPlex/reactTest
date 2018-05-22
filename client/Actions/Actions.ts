import {Dispatch} from 'redux';
import {ActionTypes, AsyncActionTypes} from './Consts';

export interface IDispatchProps {
  actions: Actions;
}

export class Actions {
  constructor(private dispatch: Dispatch<IDispatchProps>) {
  }

  onData = () => {
    this.dispatch((dispatch: Dispatch<IDispatchProps>) => {
      fetch('http://localhost:8080/login',
      {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          login: 'aa',
          pass: 'bb'
        })
      })
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            return response.json();
          } else {
            throw 'error';
          }
        })
        .then(data => {
          console.log(data);

          dispatch({type: `${ActionTypes.ONDATA}`, payload: data});
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  onLogin = () => {
    this.dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.BEGIN}`});
    this.dispatch((dispatch: Dispatch<IDispatchProps>) => {

      //Простейший асинхронный экшен
      // setTimeout(() => {
      //   dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.SUCCESS}`});
      // }, 2000)

      //Экшен для запроса к РЕСТам
      //fetch('http://www.mocky.io/v2/5aafaf2c2d000048006eff2c') //404
      fetch('http://www.mocky.io/v2/5aafaf6f2d000057006eff31') //200 - true
      //fetch('http://www.mocky.io/v2/5aafafa32d000056006eff3b') //200 - false
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            return response.json();
          } else {
            throw 'error';
          }
        })
        .then(data => {
          console.log(data);
          //формат ответа:
          //{"data": {"authorized": true}}
          dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.SUCCESS}`, payload: data});
        })
        .catch(error => {
          dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: error});
        });
    });
  };

  onLogout = () => this.dispatch({type: ActionTypes.LOGOUT})
}
