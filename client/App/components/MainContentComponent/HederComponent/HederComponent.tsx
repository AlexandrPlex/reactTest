import * as React from 'react';

export class HederComponent extends React.Component<Object> {
  render() {
    return (
        <h1>Main component, table is {sessionStorage.getItem('activeTable')}</h1>
    );
  }
}
