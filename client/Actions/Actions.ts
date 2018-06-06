import {Dispatch} from 'redux';
import {ActionTypes, AsyncActionTypes, CollectionName} from './Consts';
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
        api.getData(nameColletion, token, filterID)
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

  onAddNewItem = (nameCollection: string, data: Object, token: string, perent?: any) => {
    return new Promise<any>((resolve, reject)=>{
      this.dispatch({type: `${ActionTypes.ADDITEM}${AsyncActionTypes.BEGIN}`});
      api.addItem(nameCollection, data, token, perent)
      .then(data => {
        if(!data._id){
            this.dispatch({type: `${ActionTypes.ADDITEM}${AsyncActionTypes.FAILURE}`, payload: {isErrorAccess :true}});
        }else{
          this.dispatch({type: `${ActionTypes.ADDITEM}${AsyncActionTypes.SUCCESS}`});
          resolve(data);
        }
      })
      .catch(err => {
        this.dispatch({type: `${ActionTypes.ADDITEM}${AsyncActionTypes.FAILURE}`, payload: {isErrorServer: true}});
        reject(err);
      });
    });
  };

  onDeleteItem = (id: any, nameCollection: string, token: string) => {
    return new Promise<any>((resolve, reject)=>{
          this.dispatch({type: `${ActionTypes.DELETE}${AsyncActionTypes.BEGIN}`});
          api.deleteItem(id, nameCollection, token)
          .then(data => {
            if(data.ok!==1){
                this.dispatch({type: `${ActionTypes.DELETE}${AsyncActionTypes.FAILURE}`, payload: {isErrorAccess :true}});
            }else{
              this.dispatch({type: `${ActionTypes.DELETE}${AsyncActionTypes.SUCCESS}`});
              resolve(data);
            }
          })
          .catch(err => {
            this.dispatch({type: `${ActionTypes.DELETE}${AsyncActionTypes.FAILURE}`, payload: {isErrorServer: true}});
            reject(err);
          });
    });
  }

  onUpDateItem = (nameCollection: string, data: Object, id: string, token: string) => {
    return new Promise<any>((resolve, reject)=>{
          this.dispatch({type: `${ActionTypes.UPDATEITEM}${AsyncActionTypes.BEGIN}`});
          api.upDateItem(nameCollection, data, id, token)
          .then(data => {
            if(data.ok!==1 && data.nModified!== 1){
                this.dispatch({type: `${ActionTypes.UPDATEITEM}${AsyncActionTypes.FAILURE}`, payload: {isErrorAccess :true}});
            }else{
              this.dispatch({type: `${ActionTypes.UPDATEITEM}${AsyncActionTypes.SUCCESS}`});
              resolve(data);
            }
          })
          .catch(err => {
            this.dispatch({type: `${ActionTypes.UPDATEITEM}${AsyncActionTypes.FAILURE}`, payload: {isErrorServer: true}});
            reject(err);
          });
    });
  }

  //--------------------------UI-WORK-------------------------------------

  onActiveTableItem = (idActiveItem: string) => {
    this.dispatch({type: `${ActionTypes.ACTIVETABLEITEM}`, payload: idActiveItem});
  };

  onCheangePath = (nextState: string, colName: string) => {
    if(colName === CollectionName.FILIAL){
      this.dispatch({type: `${ActionTypes.ONSTAFFCOL}`, payload: nextState});
    }
    if(colName == CollectionName.ORGANITH){
      this.dispatch({type: `${ActionTypes.ONFILIALCOL}`, payload: nextState});
    }
  };

  onChengeStateModalViewAddItem = ( editState: boolean, stateModal: boolean) => {
    this.dispatch({type: `${ActionTypes.STATEMAODALVIEW}`, payload: {stateModal: stateModal, editState: editState}});
  };


}
