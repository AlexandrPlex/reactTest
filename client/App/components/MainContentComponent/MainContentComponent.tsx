import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions, IDispatchProps} from '../../../Actions/Actions';
import {CollectionName} from '../../../Actions/Consts';
import {IStoreState} from '../../../Store/Store';
import * as PropTypes from 'prop-types';

import './contextStyle.css';
import {CubeGrid} from 'better-react-spinkit';
import * as chengeCollection from '../../modules/chengeCollection';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import HeaderComponent from '../DisplayComponent/HederComponent/HederComponent';
import TableComponent from '../DisplayComponent/TableComponent/TableComponent';
import * as Modal from 'react-modal';
import {EditItemViewComponent} from '../DisplayComponent/AddNewItemViewComponent/EditItemViewComponent';

interface IStateProps {
	loadData: Array<Object>;
	loadDataHeder: Object;
	isErrorAccess: boolean;
	isErrorServer: boolean;
	loading: boolean;
	activeTableItem: string;
	perentOrg: string;
	perentFill: string;
	stateModalViewEditItem: boolean;
	stateModalViewEdit: boolean;
}
interface IState{
	collectionName: string;
	pathState: string;
}

type TProps = IDispatchProps & IStateProps & IState;

function loadData() {
	if(this.props.collectionName!=CollectionName.ORGANITH){
		if(this.props.collectionName===CollectionName.FILIAL){
			if(this.props.perentOrg){
				this.props.actions.onLoadData(this.props.collectionName, sessionStorage.getItem('token'), this.props.perentOrg);	
			}else{
				this.context.router.history.push(CollectionName.ORGANITH);
			}
		}
		if(this.props.collectionName===CollectionName.STAFF){
			if(this.props.perentOrg){
				this.props.actions.onLoadData(this.props.collectionName, sessionStorage.getItem('token'), this.props.perentFill);	
			}else{
				this.context.router.history.push(CollectionName.FILIAL);
			}
			
		}
	}else{
		this.props.actions.onLoadData(this.props.collectionName, sessionStorage.getItem('token'));
	}
}

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

class MainContentComponent extends React.PureComponent<TProps, {}> {
	static contextTypes = {
	    router: PropTypes.object
	  }
	constructor(props: any, context: any){
	  super(props, context);

	}
	componentWillMount(){
		loadData.call(this);
	}

	onHundleChengeItem = (itemId: string) => {
		this.props.actions.onActiveTableItem(itemId);
	}
	onHundleMore = () => {
		this.props.actions.onCheangePath(this.props.activeTableItem, this.props.collectionName);
		this.props.actions.onActiveTableItem(null);
		this.context.router.history.push(chengeCollection.appCollection(this.props.collectionName));
	}
	onHundleBack = () => {
		this.context.router.history.push(chengeCollection.downCollection(this.props.collectionName));
	}
	onHundleDelete = () => {
		this.props.actions.onDeleteItem(this.props.activeTableItem, this.props.collectionName, sessionStorage.getItem('token'))
		.then(()=>{
			loadData.call(this);
		});
	}
	onHundleModal = (editState: boolean) => {
		this.props.actions.onChengeStateModalViewAddItem(editState, this.props.stateModalViewEditItem ? false : true);
	}
	onHundleAdd = (addValue: Object) => {
		this.props.actions.onAddNewItem(this.props.collectionName, addValue, sessionStorage.getItem('token'), 
			this.props.collectionName !== CollectionName.ORGANITH ?
			this.props.collectionName === CollectionName.FILIAL ? this.props.perentOrg : this.props.perentFill :null
			).then(()=>{
				loadData.call(this);
				this.onHundleModal(false);
			});
	}
	onHundleEdit = (addValue: Object) => {
		this.props.actions.onUpDateItem(this.props.collectionName, addValue, this.props.activeTableItem, sessionStorage.getItem('token'))
		.then(()=>{
						loadData.call(this);
					});
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
					<ContextMenuTrigger id={"MENU_TYPE"} holdToDisplay={1000}>
						<div className='container'><TableComponent tableItems={this.props.loadData} tableHeader={this.props.loadDataHeder} onHandleClick={this.onHundleChengeItem} /></div>
					</ContextMenuTrigger>
					<ContextMenu id={"MENU_TYPE"}>
						<MenuItem onClick={this.onHundleMore}>Подробней</MenuItem>
						<MenuItem onClick={this.onHundleBack}>Назад</MenuItem>
						<MenuItem onClick={this.onHundleDelete}>Удалить</MenuItem>
						<MenuItem onClick={this.onHundleModal.bind(this, true)}>Редактировать</MenuItem>
						<MenuItem onClick={this.onHundleModal.bind(this, false)}>Добавить</MenuItem>
					</ContextMenu>
					<Modal isOpen={this.props.stateModalViewEditItem} style={customStyles}>
					  <EditItemViewComponent headerNewItem={this.props.loadDataHeder} 
					                           onHandleHideAddModalView={this.onHundleModal}
					                           onHandleAddNewItem={!this.props.stateModalViewEdit ? this.onHundleAdd : this.onHundleEdit}
					                           editState = {this.props.stateModalViewEdit}
					                           editData = {this.props.loadData.filter((el: Object)=>{
					                           		if(this.props.activeTableItem === el['_id']){
					                           			return el;
					                           		}
					                           })[0]} />
					</Modal>
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
  	activeTableItem: state.activeTableItem,
  	perentOrg: state.perentOrg,
  	perentFill: state.perentFill,
  	stateModalViewEditItem: state.stateModalViewEditItem,
  	stateModalViewEdit: state.stateModalViewEdit,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(MainContentComponent);

export {connectApp as MainContentComponent};
