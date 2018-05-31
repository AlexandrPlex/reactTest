import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {LoginComponent} from './components/LoginComponent/LoginComponent';
import {MainContentComponent} from './components/MainContentComponent/MainContentComponent';
import RouterComponentHoc from './components/HOC/RouterComponentHoc';
import {CollectionName} from '../Actions/Consts';

export class Main extends React.Component {
    render() {
        return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={LoginComponent}/>
                        <Route path={`/${CollectionName.ORGANITH}`} component={RouterComponentHoc(MainContentComponent, CollectionName.ORGANITH)} />
                        <Route path={`/${CollectionName.FILIAL}`} component={RouterComponentHoc(MainContentComponent, CollectionName.FILIAL)} />
                        <Route path={`/${CollectionName.STAFF}`} component={RouterComponentHoc(MainContentComponent, CollectionName.STAFF)} />  
                    </Switch> 
                </BrowserRouter>
        );
    }
};
