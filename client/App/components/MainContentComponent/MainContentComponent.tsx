import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions, IDispatchProps} from '../../../Actions/Actions';
import {IStoreState} from '../../../Store/Store';

interface IStateProps {
  loginStatus: boolean;
  loadData: any;
  loadDataHeder: any;
  activeTableItem: any;
}

type TProps = IDispatchProps & IStateProps;

class MainContentComponent extends React.PureComponent<TProps, {}> {
  componentWillMount(){
    this.props.actions.onLoadData(sessionStorage.getItem('activeTable'))
    .then((resolve: any)=>{
      sessionStorage.setItem('activeTable', resolve);
    })
    .catch(()=>{
      document.location.href = '/';
    });
    console.log(this.props);
  }

    render() {
      return <div>

      </div>;
  }
}

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
