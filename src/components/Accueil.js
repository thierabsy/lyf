import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Authentification from './shared/Authentification';

import { avoirUser } from '../store/actions';


class Accueil extends Component {
  constructor(props){
    super(props);

    this.state = {
      connect : false
    }
  }
  componentDidMount(){
    this.props.avoirUser();
  }

  render() {

    return (
      <div className="TD Accueil">
        <div className="wrapper">
          <div className="intro federation">
            <img src="img/fsf.jpg" alt="LYF" />
            <h5>Ligue Yux de Football</h5>
          </div>
          {
            this.props.user && this.props.user.utilisateur ?
              <Redirect to={{ pathname : "/classement"}} />
            :
              <Authentification 
                type="connexion" 
                titre="Se Connecter"
                history={this.props.history}
              />
            
          }
          <div className="intro sponsor">
            <h5>Sponsor Officiel</h5>
            <a href="http://yuxdakar.com" target="_blank">
              <img src="img/yux-logo.jpg" className="yux-logo" alt="LYF" />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

// On extrait le classement dans le store ===> maintenant accessible via props
const mapStateToProps = ({ user }) => {
  return { user }
}

export default connect(mapStateToProps, { avoirUser })(Accueil);
