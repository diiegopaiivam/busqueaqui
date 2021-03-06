import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/home/index';
import Points from './pages/points/index'
import Pointer from './pages/pointer/index';
import CreatePoint from './pages/create-point/index';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/points/:id" component={Points} />
                <Route path="/selected-point/:id" component={Pointer} />
                <Route path="/point-create" component={CreatePoint} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;