import * as React from 'react';

interface IStateProps {
	itemObject: any
}

export class TableItemComponent extends React.Component<IStateProps, {}> {
  render() {

    return (
        <div>
        	{
        		Object.keys(this.props.itemObject).map((key: string)=>{
        			if(key.indexOf('_id'))
        			return (<p key={key} > {this.props.itemObject[key]}</p>);
        		})
        	}
        </div>
    );
  }
}
