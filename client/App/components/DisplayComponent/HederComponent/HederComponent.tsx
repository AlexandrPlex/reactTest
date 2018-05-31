import * as React from 'react';

import {SiteConfig} from'../../../../Actions/Consts';
import './HederComponentStyle.css';

interface IStateComponent {
  nameUser?: string;
  pathCollection?: any;
}

export default class HederComponent extends React.PureComponent<IStateComponent, {}> {
    render(){
      return <header>
      <nav className="navbar navbar-expand-lg navbar-dark default-color-dark fixed-top">
          <a className="navbar-brand" href="index.html">{SiteConfig.SITENAME}</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
              <div className="navbar-nav mr-auto">
                    {this.props.pathCollection ? this.props.pathCollection : null} 
              </div>
               <ul className="navbar-nav ml-auto nav-flex-icons">
                   {this.props.nameUser ? this.props.nameUser : null} 
              </ul>
          </div>
      </nav>
      </header>;
  }
}
