import * as React from 'react';

import './AddNewItemViewComponentStyle.less';

interface IStateProps {
  headerNewItem: any;
  onHandleShowAddModalView: any;
  onHandleAddNewItem: any;
}

export class AddNewItemViewComponent extends React.Component<IStateProps, {}> {
  constructor(){
      super();
  }
  onChengeInput = (event: any) => {
      console.log(event.target.value);
  }
  
  render() {
    return (
       <form>
           {
               Object.keys(this.props.headerNewItem).map((key: any) => {
                   return(<div> <label>{this.props.headerNewItem[key]} </label> <input onChange={this.onChengeInput} type="email" className="form-control" /> </div> )
               })
           }
           <br />
           <button type="button" className="btn btn-secondary" onClick={this.props.onHandleShowAddModalView.bind(this, false)}>Отменить</button>
           <button type="button" className="btn btn-success" onClick={this.props.onHandleAddNewItem.bind(this)}>Добавить</button>
       </form>
    );
  }
}

