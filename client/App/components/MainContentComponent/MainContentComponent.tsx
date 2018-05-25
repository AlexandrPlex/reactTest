import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions, IDispatchProps} from '../../../Actions/Actions';
import {IStoreState} from '../../../Store/Store';

import {TableComponent} from './OrganithationComponent/TableComponent/TableComponent';

interface IStateProps {
  loginStatus: boolean;
  loadData: any;
}

type TProps = IDispatchProps & IStateProps;

class MainContentComponent extends React.Component<TProps, {}> {
  componentWillMount(){
    this.props.actions.onLoadData('Organith')
    .catch(()=>{
      document.location.href = '/';
    });
    console.log(this.props); // не возможно обратится к данным в момент формирования render так как на момент рендера данных еще нет и они появляются только после отрисовки.
  }
  render () {
        return (
          <div>
            <h1>Main component</h1>
            <TableComponent tableItems={this.props.loadData} />
          </div>
        ); 
      }  
  
};

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    loginStatus: state.loginStatus,
    loadData: state.loadData,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(MainContentComponent);

export {connectApp as MainContentComponent};