import * as React from 'react';
import {TableItemComponent} from '../TableItemComponent/TableItemComponent';

interface IStateProps {
    tableItems: Array<Object>
}

export class TableComponent extends React.Component<IStateProps, {}> {
  render() {

    return (
        <form>
            {
                this.props.tableItems.map(function(el: any){
                    return (<TableItemComponent
                            key = {el['_id']}
                            itemObject = {el}
                      />)
                })
            }
        </form>
    );
  }
}
