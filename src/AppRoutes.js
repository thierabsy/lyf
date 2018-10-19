import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Accueil from './components/Accueil';
import Classement from './components/Classement';
import Scores from './components/Scores';

import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

class AppRoutes extends Component {
    render() {
        console.log(window.location);
        return (
            <div>
                <BrowserRouter>
                    <div>
                        {/* Le menu ne sera pas visible sur la page d'accueil. */}
                        {
                            window.location.pathname !== "/" && <Header />
                        }
                        <Switch>
                            <Route exact={true} path="/" component={Accueil} />
                            <Route path="/classement" component={Classement} />
                            <Route path="/scores" component={Scores} />
                        </Switch>
                        <Footer />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default AppRoutes;