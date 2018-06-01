//Табличный компонент отрисовывает
//данныйе переданные в него в виде таблици

import * as React from 'react';
import {TableItemComponent} from './TableItemComponent';

interface IStateProps {
    tableItems: Array<Object>, // массив обьектов параметров таблицы
    tableHeader: any, // обьект с параметраим для заголовков таблицы
    onHandleClick: any // фукция которая выполняется при клике на строку таблицы
}

export default class TableComponent extends React.Component<IStateProps, {}> {
    render(){
    let onHandleClick = this.props.onHandleClick;
    return (
        <table className='table table-hover table-inverse'>
            <thead className='thead-inverse' key = {'thead'}><tr>
                {
                    Object.keys(this.props.tableHeader).map((key)=>{
                        return(<th key={'thead'+key}>{this.props.tableHeader[key]}</th>);
                    })
                }
            </tr></thead>
            <tbody className='thead-default'>
            {
                this.props.tableItems.map(function(el: any){
                    return <TableItemComponent
                        key={el['_id']}
                        itemObject={el}
                        onHandleClick={onHandleClick}
                    />
                })
            }
            </tbody>
        </table>
    );
  }
}
