import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {LoginComponent} from './components/LoginComponent/LoginComponent';
import {MainContentComponent} from './components/MainContentComponent/MainContentComponent';

export class Main extends React.Component {
    render () {
        return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={LoginComponent}/>
                        <Route path='/main' component={MainContentComponent}/>
                    </Switch>
                </BrowserRouter>
        );
    }
};