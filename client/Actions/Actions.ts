import {Dispatch} from 'redux';
import {ActionTypes, AsyncActionTypes} from './Consts';
import * as api from '../api';

export interface IDispatchProps {
  actions: Actions;
}

export class Actions {
  constructor(private dispatch: Dispatch<IDispatchProps>) {
  }

  //--------------------------DB-WORK-------------------------------------

  onLogin = (login: string, passoword: string) => {
    return new Promise<boolean>((resolve, reject)=>{
        this.dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.BEGIN}`});
        this.dispatch((dispatch: Dispatch<IDispatchProps>) => {
          api.postLogin(login, passoword).then((res)=>{
            if(res.isLogin){
              this.dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.SUCCESS}`, payload: res});
              resolve(res);
            }else{
              this.dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: {isErrorAccess :true}});
              reject(res);
            }
          }).catch((err)=>{
            this.dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: {isErrorServer :true}});
            reject(err);
          })
        });
    });
  };


  onLoadData = (nameColletion: string, token: string, filterID?: string) => {
    return new Promise<any>((resolve, reject)=>{
      this.dispatch({type: `${ActionTypes.ONLOADDATA}${AsyncActionTypes.BEGIN}`});
      this.dispatch((dispatch: Dispatch<IDispatchProps>) => {
        api.getData(nameColletion, token)
        .then(data => {
          if(data.isError){
              this.dispatch({type: `${ActionTypes.ONLOADDATA}${AsyncActionTypes.FAILURE}`, payload: {isErrorAccess :true}});
          }else{
            this.dispatch({type: `${ActionTypes.ONLOADDATA}${AsyncActionTypes.SUCCESS}`, payload: data});
            resolve(data);
          }
        })
        .catch(err => {
          this.dispatch({type: `${ActionTypes.ONLOADDATA}${AsyncActionTypes.FAILURE}`, payload: {isErrorServer: true}});
          reject(err);
        });
      });
    });
  };

  onActiveTableItem = (idActiveItem: string) => {
    this.dispatch({type: `${ActionTypes.ACTIVETABLEITEM}`, payload: idActiveItem});
  };

  onChengeStateModalViewAddItem = (stateModal: boolean) => {
    this.dispatch({type: `${ActionTypes.STATEMAODALVIEW}`, payload: stateModal});
  };

  onAddNewItem = (nameCollection: string, data: Object, perent?: any) => {
    return new Promise<any>((resolve, reject)=>{
      this.dispatch({type: `${ActionTypes.ADDNEWITEM}${AsyncActionTypes.BEGIN}`});
      this.dispatch((dispatch: Dispatch<IDispatchProps>) => {
        fetch(`http://localhost:8080/setData`,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
              token: sessionStorage.getItem('token'),
              needData: nameCollection,
              data: data,
              perent: perent,
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
              dispatch({type: `${ActionTypes.ADDNEWITEM}${AsyncActionTypes.SUCCESS}`, payload: data});
              resolve(nameCollection);
          })
      });
    });
  };

  onDeleteItem = (id: any, nameCollection: string) => {
    return new Promise<any>((resolve, reject)=>{
        fetch(`http://localhost:8080/delete`,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify({
              token: sessionStorage.getItem('token'),
              needData: nameCollection,
              id: id
            })
          })
          .then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              reject(new Error(String(response.status)));
            }
          })
          .then(() => {
              resolve(nameCollection);
          });
    });
  }
}






          // fetch('http://localhost:8080/login',
          // {
          //     headers: {
          //       'Accept': 'application/json',
          //       'Content-Type': 'application/json'
          //     },
          //     method: 'POST',
          //     mode: 'cors',
          //     body: JSON.stringify({
          //       login: login,
          //       password: passowrd
          //     })
          //   })
          //   .then(response => {
          //     if (response.status === 200) {
          //       return response.json();
          //     } else {
          //       throw 'error';
          //     }
          //   })
          //   .then(data => {
          //       dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.SUCCESS}`, payload: data});
          //       if(data.data.authorized === false){
          //         resolve(false);
          //       }else{
          //         sessionStorage.setItem('token', data.data.token);
          //         sessionStorage.setItem('sess', 'true');
          //         resolve(true);
          //       }
          //   })
          //   .catch(error => {
          //     dispatch({type: `${ActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`, payload: error});
          //   });