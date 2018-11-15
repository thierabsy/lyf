import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { avoirUser, avoirClassement, avoirEquipes, avoirScores } from './store/actions';

import AuthRoute from './utils/AuthRoute';

import Inscription from './components/Inscription';
import Accueil from './components/Accueil';
import Classement from './components/Classement';
import Scores from './components/Scores';
import ScorePage from './components/ScorePage';
import Equipes from './components/Equipes';
import EquipePage from './components/EquipePage';

import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import PageNotFound from './components/shared/404';


class AppRoutes extends Component {
    componentDidMount(){
        this.props.avoirUser();
        this.props.avoirClassement();
        this.props.avoirScores(); 
        this.props.avoirEquipes();
    }
    render() {
        // console.log("user", this.props.user)
        let user = this.props.user || false;
        return (
            <>
                <BrowserRouter>
                    <>
                        {/* Le menu ne sera pas visible sur la page d'accueil. */}
                        {
                            user && <Header />
                        }  
                        <Switch>
                            <AuthRoute user={ user } path="/utilisateur" component={Inscription} />
                            <AuthRoute user={ user } path="/classement" component={Classement} />
                            <AuthRoute user={ user } exact path="/scores" component={Scores} />
                            <AuthRoute user={ user } path="/scores/:score_id" component={ScorePage} />
                            <AuthRoute user={ user } exact path="/equipes" component={Equipes} />
                            <AuthRoute user={ user } path="/equipes/:equipe_id" component={EquipePage} />
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
const mapStateToProps = ({ entrer, user }) => {
    return { entrer, user }
  }
  
  export default connect(mapStateToProps, {avoirUser, avoirClassement,  avoirEquipes, avoirScores })(AppRoutes);
