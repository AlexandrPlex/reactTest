//Формирование строки таблицы для дальнейшей отрисовка

import * as React from 'react';

interface IStateProps {
    itemObject: any, // обьект содержащий данные которые будут преаброзованны в столбци
    onHandleClick: any // функция выполняющаяся при нажатии на строку
}

export class TableItemComponent extends React.Component<IStateProps, {}> {
    render(){

      return <tr onContextMenu={this.props.onHandleClick.bind(this, this.props.itemObject['_id'])}>
          {
              Object.keys(this.props.itemObject).map((key: string) => {
                  if (key.indexOf('_id'))
                      return (<td key={key}> {this.props.itemObject[key]}</td>);
              })
          }
      </tr>;
  }
}
