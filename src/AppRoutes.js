import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { avoirClassement, avoirEquipes, avoirScores } from './store/actions';

import Accueil from './components/Accueil';
import Classement from './components/Classement';
import Scores from './components/Scores';
import Equipes from './components/Equipes';

import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import PageNotFound from './components/shared/404';

class AppRoutes extends Component {
    componentDidMount(){
        this.props.avoirClassement();
        this.props.avoirScores();
        this.props.avoirEquipes();
    }
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
                            <Route exact path="/equipes" component={Equipes} />
                            <Route path="/equipes/:equipe_id" component={PageNotFound} />
                            <Route exact path="/" component={Accueil} />
                            <Route path="*" component={PageNotFound} />
                        </Switch>
                        <Footer />
                    </>
                </BrowserRouter>
            </>
        );
    }
}

// On extrait le classement dans le store ===> maintenant accessible via props
const mapStateToProps = ({ entrer }) => {
    return { entrer }
  }
  
  export default connect(mapStateToProps, {avoirClassement,  avoirEquipes, avoirScores })(AppRoutes);

// export default AppRoutes;