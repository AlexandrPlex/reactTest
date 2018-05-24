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
  loadOrg: Array<Object>;
}

const initialState = {
  get state(): IStoreState {
    return {
      loginStatus: false,
      loading: false,
      loadOrg: [],
    }
  }
}

export default function reducer (state: IStoreState = initialState.state, action: IActionType) {
  switch (action.type) {

    case `${ActionTypes.LOGIN}${AsyncActionTypes.BEGIN}`:
    return {
      ...state,
      loading: true,
    };

    case `${ActionTypes.LOGIN}${AsyncActionTypes.SUCCESS}`:
    return {
      ...state,
      loginStatus: action.payload.data.authorized,
      loading: false,
    };

    case `${ActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`:
    return {
      ...state,
      loading: false,
      loginStatus: false,
    };

    //-----------------------------------------------------------------------

    case `${ActionTypes.ONLOADORG}${AsyncActionTypes.BEGIN}`:
    return {
      ...state,
      loading: true,
    };

    case `${ActionTypes.ONLOADORG}${AsyncActionTypes.SUCCESS}`:
    return {
      ...state,
      loadOrg: action.payload,
      loading: false,
    };

  }
  return state;
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export {store as appStore};
