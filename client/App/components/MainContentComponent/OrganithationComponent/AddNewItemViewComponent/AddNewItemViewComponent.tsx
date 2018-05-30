import * as React from 'react';

import './AddNewItemViewComponentStyle.less';

interface IStateProps {
  headerNewItem: any;
  onHandleShowAddModalView: any;
  onHandleAddNewItem: any;
}

export class AddNewItemViewComponent extends React.Component<IStateProps, {addValue: any}> {
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
            {
                Object.keys(this.props.headerNewItem).map((key: string) => {
                    return (<div key={key}><label>{this.props.headerNewItem[key]} </label> <input
                        onChange={this.onChengeInput.bind(this, key)} type="email" className="form-control"/></div>)
                })
            }
            <br/>
            <button type="button" className="btn btn-secondary"
                    onClick={this.props.onHandleShowAddModalView.bind(this, false)}>Отменить
            </button>
            <button type="button" className="btn btn-success"
                    onClick={this.props.onHandleAddNewItem.bind(this, this.state.addValue)}>Добавить
            </button>
        </form>;
  }
}
