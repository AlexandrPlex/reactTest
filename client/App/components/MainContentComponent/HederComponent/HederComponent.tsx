import * as React from 'react';

import {ToolBarComponent} from '../ToolBarComponent/ToolBarComponent';

export class HederComponent extends React.Component<Object> {
    render(): JSX.Element | false | null {
      return <div>
          <h1>Main component, table is {sessionStorage.getItem('activeTable')}</h1>
          <ToolBarComponent/>
      </div>;
  }
}
