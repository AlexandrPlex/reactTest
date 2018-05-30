import * as React from 'react';

interface IStateProps {
    itemObject: any,
    onHandleClick: any
}

export class TableItemComponent extends React.Component<IStateProps, {}> {
    render(): JSX.Element | false | null {

      return <tr onClick={this.props.onHandleClick.bind(this, this.props.itemObject['_id'])}>
          {
              Object.keys(this.props.itemObject).map((key: string) => {
                  if (key.indexOf('_id'))
                      return (<td key={key}> {this.props.itemObject[key]}</td>);
              })
          }
      </tr>;
  }
}
