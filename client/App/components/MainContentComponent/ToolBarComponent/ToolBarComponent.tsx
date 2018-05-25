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
  stateModalViewAddNewItem: boolean;
}

type TProps = IDispatchProps & IStateProps;

Modal.setAppElement('#app');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '50%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ToolBarComponent extends React.Component<TProps, {}> {

  onHandleShowAddModalView = (stateModal: boolean) => {
    this.props.actions.onChengeStateModalViewAddItem(stateModal);
  }

  onHandleAddNewItem = () => {

  }

  render () {
        return (
          <div id='main'>
             <button onClick={this.onHandleShowAddModalView.bind(this, true)}> Добавить </button>
             <Modal isOpen={this.props.stateModalViewAddNewItem} style={customStyles}>
               <AddNewItemViewComponent headerNewItem={this.props.loadDataHeder} 
                                        onHandleShowAddModalView={this.onHandleShowAddModalView}
                                        onHandleAddNewItem={this.onHandleAddNewItem} />
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
    stateModalViewAddNewItem: state.stateModalViewAddNewItem,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(ToolBarComponent);

export {connectApp as ToolBarComponent};