import * as React from 'react';


interface IStateProps {

}

export class GridComponent extends React.Component<IStateProps, {}> {
  constructor(){
      super();

  }

  
  render() {
    return (
       <form>
          <input value='asfafd' />
          <input value='asfafd' />
          <input value='asfafd' />
          <input value='asfafd' />
          <button> dsf </button>
          <button> dsf </button>
          <button> dsf </button>
       </form>
    );
  }
}

