import {Action, applyMiddleware, createStore,/* combineReducers*/} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {ActionTypes, AsyncActionTypes} from '../Actions/Consts';

export interface IActionType extends Action {
  type: string;
  payload: any;
}

export interface IStoreState {
  loginStatus: boolean;
  loading: boolean;
  isErrorAccess: boolean;
  isErrorServer: boolean;
  activeColletion: string;
  loadData: Array<Object>;
  loadDataHeder: Object;
  activeTableItem: string;
  stateModalViewAddNewItem: boolean;
  perentOrg: string;
  perentFill: string;

}

const initialState = {
  get state(): IStoreState {
    return {
      loginStatus: false,
      loading: false,
      isErrorAccess: false,
      isErrorServer: false,
      activeColletion: '',
      loadData: [],
      loadDataHeder: {},
      activeTableItem: '',
      stateModalViewAddNewItem: false,
      perentOrg: '',
      perentFill: '',
    }
  }
}

export default function reducer (state: IStoreState = initialState.state, action: IActionType) {
  switch (action.type) {

    //------------------------LOGIN------------------------------

    case `${ActionTypes.LOGIN}${AsyncActionTypes.BEGIN}`:
    return {
      ...state,
      loading: true,
    };

    case `${ActionTypes.LOGIN}${AsyncActionTypes.SUCCESS}`:
    return {
      ...state,
      loginStatus: action.payload.isLogin,
      loading: false,
    };

    case `${ActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`:
    return {
      ...state,
      loading: false,
      loginStatus: false,
      isErrorAccess: action.payload.isErrorAccess ? action.payload.isErrorAccess : false,
      isErrorServer: action.payload.isErrorServer ? action.payload.isErrorServer : false,
    };
    //------------------------DELETE-DATA------------------------------

    case `${ActionTypes.DELETE}${AsyncActionTypes.BEGIN}`:
    return {
      ...state,
      loading: true,
    };

    case `${ActionTypes.DELETE}${AsyncActionTypes.SUCCESS}`:
    return {
      ...state,
      loading: false,
    };

    case `${ActionTypes.DELETE}${AsyncActionTypes.FAILURE}`:
    return {
      ...state,
      loading: false,
      isErrorAccess: action.payload.isErrorAccess ? action.payload.isErrorAccess : false,
      isErrorServer: action.payload.isErrorServer ? action.payload.isErrorServer : false,
    };

    //------------------------LOAD-DATA------------------------------

    case `${ActionTypes.ONLOADDATA}${AsyncActionTypes.BEGIN}`:
    return {
      ...state,
      loading: true,
    };

    case `${ActionTypes.ONLOADDATA}${AsyncActionTypes.SUCCESS}`:
    return {
      ...state,
      loadData: action.payload.data,
      loadDataHeder: action.payload.dataHeader[0],
      loading: false,
    };

    case `${ActionTypes.ONLOADDATA}${AsyncActionTypes.FAILURE}`:
    return {
      ...state,
      loading: false,
      isErrorAccess: action.payload.isErrorAccess ? action.payload.isErrorAccess : false,
      isErrorServer: action.payload.isErrorServer ? action.payload.isErrorServer : false,
    };

    //------------------------ACTIVE-ON-VIEW----------------------------

    case `${ActionTypes.ACTIVETABLEITEM}`:
    return {
      ...state,
      activeTableItem: action.payload,
    };

    case `${ActionTypes.STATEMAODALVIEW}`:
    return {
      ...state,
      stateModalViewAddNewItem: action.payload,
    };

    case `${ActionTypes.ONFILIALCOL}`:
    return {
      ...state,
      perentOrg: action.payload,
    };
    case `${ActionTypes.ONSTAFFCOL}`:
    return {
      ...state,
      perentFill: action.payload,
    };


  }
  return state;
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export {store as appStore};
