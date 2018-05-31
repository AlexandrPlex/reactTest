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
  isErrorLogin: boolean;
  isErrorServer: boolean;
  loadData: Array<Object>;
  loadDataHeder: Object;
  activeTableItem: string;
  stateModalViewAddNewItem: boolean;
}

const initialState = {
  get state(): IStoreState {
    return {
      loginStatus: false,
      loading: false,
      isErrorLogin: false,
      isErrorServer: false,
      loadData: [],
      loadDataHeder: {},
      activeTableItem: '',
      stateModalViewAddNewItem: false,
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
      loginStatus: action.payload,
      loading: false,
    };

    case `${ActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`:
    return {
      ...state,
      loading: false,
      loginStatus: false,
      isErrorLogin: action.payload.isErrorLogin ? action.payload.isErrorLogin : false,
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
      loadDataHeder: action.payload.dataHeder[0],
      loading: false,
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

  }
  return state;
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export {store as appStore};
