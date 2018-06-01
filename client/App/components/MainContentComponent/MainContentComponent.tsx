import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions, IDispatchProps} from '../../../Actions/Actions';
import {IStoreState} from '../../../Store/Store';

import {CubeGrid} from 'better-react-spinkit';
import HeaderComponent from '../DisplayComponent/HederComponent/HederComponent';
import TableComponent from '../DisplayComponent/TableComponent/TableComponent';

interface IStateProps {
	loadData: Array<Object>;
	loadDataHeder: Object;
	isErrorAccess: boolean;
	isErrorServer: boolean;
	loading: boolean;
}
interface IState{
	collectionName: string;
}

type TProps = IDispatchProps & IStateProps & IState;

class MainContentComponent extends React.PureComponent<TProps, {}> {
	componentWillMount(){
		console.log(this.props.collectionName);
		this.props.actions.onLoadData(this.props.collectionName, sessionStorage.getItem('token'));
	}

	onHundle = () => {

	}

    render() {
     	return <div>
			{ 
				this.props.loading 
				? 
				<div className='indecatorLoading'><CubeGrid color={'#1d8415'} col={5} row={5} size={300} /></div> 
				:
				(!this.props.isErrorAccess && !this.props.isErrorServer) 
				? 
				<div>
					<HeaderComponent nameUser={sessionStorage.getItem('userName')} />
					<div className='container'><TableComponent tableItems={this.props.loadData} tableHeader={this.props.loadDataHeder} onHandleClick={this.onHundle} /></div>
				</div>
				:
				null
			}
			{this.props.isErrorAccess ? <div className='ErrorLogin card card-container'>Во время загрузки данных произошла ошибка </div> : null}
			{this.props.isErrorServer ? <div className='ErrorLogin card card-container'>Не получилось связатся с сервером повторите попытку позже. </div> : null}
		</div>;
  }
}

function mapStateToProps(state: IStoreState): IStateProps {
  return {
  	loadData: state.loadData,
  	loadDataHeder: state.loadDataHeder,
  	isErrorAccess: state.isErrorAccess,
  	isErrorServer: state.isErrorServer,
  	loading: state.loading,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(MainContentComponent);

export {connectApp as MainContentComponent};
