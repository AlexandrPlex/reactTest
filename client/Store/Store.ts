import {Action, applyMiddleware, createStore,/* combineReducers*/} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {ActionTypes, AsyncActionTypes} from '../Actions/Consts';
//import { routerReducer } from 'react-router-redux';


export interface IActionType extends Action {
  type: string;
  payload: any;
}

export interface IStoreState {
  loginStatus: boolean;
  loading: boolean;
}

const initialState = {
  get state(): IStoreState {
    return {
      loginStatus: false,
      loading: false,
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
  }
  return state;
}

const store = createStore(reducer, 
  composeWithDevTools(applyMiddleware(thunk))
);

export {store as appStore};
