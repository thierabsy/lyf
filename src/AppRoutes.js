import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Accueil from './components/Accueil';
import Classement from './components/Classement';
import Scores from './components/Scores';
import Equipes from './components/Equipes';

import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

class AppRoutes extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <>
                        {/* Le menu ne sera pas visible sur la page d'accueil. */}
                        {
                            window.location.pathname !== "/" && <Header />
                        }
                        <Switch>
                            <Route path="/classement" component={Classement} />
                            <Route path="/scores" component={Scores} />
                            <Route path="/equipes" component={Equipes} />
                            <Route exact path="/" component={Accueil} />
                        </Switch>
                        <Footer />
                    </>
                </BrowserRouter>
            </>
        );
    }
}

export default AppRoutes;