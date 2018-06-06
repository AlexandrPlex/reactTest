import * as React from 'react';

import './EditItemViewComponentStyle.less';

interface IStateProps {
  headerNewItem: any;
  onHandleHideAddModalView: any;
  onHandleAddNewItem: any;
  editState: boolean;
  editData?: any;
}

export class EditItemViewComponent extends React.Component<IStateProps, {addValue: any}> {
  constructor(){
      super();
      this.state = {
        addValue: {}
      }
  }
  onChengeInput = ( key: any, event: any) => {
      this.state.addValue[key] = event.target.value;
  }

    render() {
        return <form>
          <h1> {this.props.editState ? 'Редоктировать' : 'Добавить'}</h1>
            {
                Object.keys(this.props.headerNewItem).map((key: string) => {
                    return (<div key={key}><label>{this.props.headerNewItem[key]} </label> <input
                        onChange={this.onChengeInput.bind(this, key)} type="email" placeholder = {this.props.editState ? this.props.editData[key] : ''} className="form-control"/></div>)
                })
            }
            <br/>
            <button type="button" className="btn btn-secondary"
                    onClick={this.props.onHandleHideAddModalView.bind(this, false)}>{this.props.editState ? 'Закрыть' : 'Отмена'}
            </button>
            <button type="button" className="btn btn-success"
                    onClick={this.props.onHandleAddNewItem.bind(this, this.state.addValue )}>{this.props.editState ? 'Сохранить' : 'Добавить'}
            </button>

        </form>;
  }
}
