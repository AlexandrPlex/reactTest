import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions, IDispatchProps} from '../../../Actions/Actions';
import {IStoreState} from '../../../Store/Store';

interface IStateProps {

}
interface IState{
	collectionName: string;
}

type TProps = IDispatchProps & IStateProps & IState;

class MainContentComponent extends React.PureComponent<TProps, {}> {
    render() {
      return <div>
      <h1> {this.props.collectionName} </h1>
      </div>;
  }
}

function mapStateToProps(state: IStoreState): IStateProps {
  return {

  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(MainContentComponent);

export {connectApp as MainContentComponent};
