import {Dispatch} from 'redux';
import {ActionTypes, AsyncActionTypes} from './Consts';

export interface IDispatchProps {
  actions: Actions;
}

export class Actions {
  constructor(private dispatch: Dispatch<IDispatchProps>) {
  }
  onLogin = (login: string, passowrd: string) => {
    return new Promise<boolean>((resolve)=>{
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
                  resolve(false);
                }else{
                  sessionStorage.setItem('token', data.data.token);
                  sessionStorage.setItem('sess', 'true');
                  resolve(true);
                }
            })
            .catch(error => {
              dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: error});
            });
        });
    });
  };

  onLoadData = (href: string) => {
    return new Promise<any>((resolve, reject)=>{
      this.dispatch({type: `${ActionTypes.ONLOADDATA}${AsyncActionTypes.BEGIN}`});
      this.dispatch((dispatch: Dispatch<IDispatchProps>) => {
        fetch(`http://localhost:8080/${href}`,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
              token: sessionStorage.getItem('token'),
              needData: href
            })
          })
          .then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              reject(new Error(String(response.status)));
              
            }
          })
          .then(data => {
              dispatch({type: `${ActionTypes.ONLOADDATA}${AsyncActionTypes.SUCCESS}`, payload: data});
              resolve(href);
          })
      });
    });
  };

  onActiveTableItem = (idActiveItem: string) => {
    this.dispatch({type: `${ActionTypes.ACTIVETABLEITEM}`, payload: idActiveItem});
  };

  onChengeStateModalViewAddItem = (stateModal: boolean) => {
    this.dispatch({type: `${ActionTypes.STATEMAODALVIEW}`, payload: stateModal});
  };
}
