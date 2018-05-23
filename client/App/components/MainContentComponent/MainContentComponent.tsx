import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions, IDispatchProps} from '../../../Actions/Actions';
import {IStoreState} from '../../../Store/Store';

interface IStateProps {
  loginStatus: boolean;
}

type TProps = IDispatchProps & IStateProps;

class MainContentComponent extends React.Component<TProps, {}> {
  render () {
      return (
        <div>
          <h1>Main component</h1><button> {this.props.loginStatus}</button>
        </div>
      );   
  }
};

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    loginStatus: state.loginStatus
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(MainContentComponent);

export {connectApp as MainContentComponent};