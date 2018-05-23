import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions, IDispatchProps} from '../../../Actions/Actions';
import {IStoreState} from '../../../Store/Store';

interface IStateProps {
  loginStatus: boolean;
  loadOrg: any;
}

type TProps = IDispatchProps & IStateProps;

class MainContentComponent extends React.Component<TProps, {}> {
  componentWillMount(){
    const {actions} = this.props;
    actions.onLoadOrg();
  }
  render () {
      if(sessionStorage.getItem('sess')!== 'true'){
        document.location.href = '/';
      }else{
        return (
          <div>
            <h1>Main component</h1>

          </div>
        ); 
      }  
  }
};

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    loginStatus: state.loginStatus,
    loadOrg: state.loadOrg,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(MainContentComponent);

export {connectApp as MainContentComponent};