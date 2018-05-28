import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions, IDispatchProps} from '../../../Actions/Actions';
import {IStoreState} from '../../../Store/Store';

import {TableComponent} from './OrganithationComponent/TableComponent/TableComponent';
import {HederComponent} from './HederComponent/HederComponent';
import * as chengeCollection from './ChengeCollectoinComponent/ChengeCollectionComponent';
import {GridComponent} from './GridComponent/GridComponent';

interface IStateProps {
  loginStatus: boolean;
  loadData: any;
  loadDataHeder: any;
  activeTableItem: any;
}

type TProps = IDispatchProps & IStateProps;

class MainContentComponent extends React.Component<TProps, {}> {
  componentWillMount(){
    this.props.actions.onLoadData(sessionStorage.getItem('activeTable'), sessionStorage.getItem('activeItem') )
    .then((resolve: any)=>{
      sessionStorage.setItem('activeTable', resolve);
    })
    .catch(()=>{
      document.location.href = '/';
    });
    console.log(this.props); 
  }
  onHendleActiveTableItem = (itemId: any) =>{
    sessionStorage.setItem('activeTable', chengeCollection.appCollection(sessionStorage.getItem('activeTable')));
    sessionStorage.setItem('perentItem', sessionStorage.getItem('activeItem') ? sessionStorage.getItem('activeItem'): null);
    sessionStorage.setItem('activeItem', itemId);
    document.location.href = '/main';
    
  }
  render () {
        return (
          <div >
            <HederComponent />
            <TableComponent tableHeder={this.props.loadDataHeder} tableItems={this.props.loadData} onHandleClick={this.onHendleActiveTableItem} />
            <GridComponent />
          </div>
        ); 
      }  
  
};

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    loginStatus: state.loginStatus,
    loadData: state.loadData,
    loadDataHeder: state.loadDataHeder,
    activeTableItem: state.activeTableItem,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(MainContentComponent);

export {connectApp as MainContentComponent};