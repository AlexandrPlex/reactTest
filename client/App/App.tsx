import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions, IDispatchProps} from '../Actions/Actions';
import {IStoreState} from '../Store/Store';

interface IStateProps {
  loginStatus: boolean;
  loading: boolean;
}

type TProps = IDispatchProps & IStateProps;

class App extends React.Component<TProps, {}> {

  handleLogin = () => {
    const {actions} = this.props;
    actions.onLogin();
  };

  handleLogout = () => {
    const {actions} = this.props;
    actions.onLogout();
  };

  render () {
    return (
      <div>
   
        <input value={`${this.props.loginStatus} : ${this.props.loading}`} />
        <button onClick={this.handleLogin}> login </button>
        <button onClick={this.handleLogout}> logout</button>
      </div>
    );
  }
};

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    loginStatus: state.loginStatus,
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(App);

export {connectApp as App};
