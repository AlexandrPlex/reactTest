import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions, IDispatchProps} from '../../../../Actions/Actions';
import {IStoreState} from '../../../../Store/Store';

import './ToolBarComponentStyle.less';

import * as Modal from 'react-modal';

import {AddNewItemViewComponent} from '../OrganithationComponent/AddNewItemViewComponent/AddNewItemViewComponent';


interface IStateProps {
  loginStatus: boolean;
  loadData: any;
  loadDataHeder: any;
}

type TProps = IDispatchProps & IStateProps;


class ToolBarComponent extends React.Component<TProps, {}> {

  onHandleAddNewItem = () => {

  }

  render () {
        return (
          <div>
             <button> Добавить </button>
             <Modal isOpen={false}>
               <AddNewItemViewComponent />
             </Modal>
          </div>
        ); 
      }  
  
};

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    loginStatus: state.loginStatus,
    loadData: state.loadData,
    loadDataHeder: state.loadDataHeder,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(ToolBarComponent);

export {connectApp as ToolBarComponent};