import React, { Component } from 'react';
import { connect } from 'react-redux';
import Authentification from './shared/Authentification';

class Inscription extends Component {
  constructor(props){
    super(props);

    this.state = {
      connect : false
    }
    
  }

  render() {
    return (
      <div className="TD Inscription">
        <div className="wrapper">
          <div className="intro federation">
            <img src="img/fsf.jpg" alt="LYF" />
            <h5>Inscription d'un utilisateur</h5>
          </div>
          {
            (this.props.user.role || "") === "super-admin" ?
              <Authentification 
                type="inscription" 
                titre="S'Inscrire"
                history={this.props.history}
              />
            :
              <div className="nonPermis">Votre compte ne vous ppermet pas d'inscrire un utilisateur!</div>
          }
        </div>
      </div>
    )
  }
}

// On extrait le classement dans le store ===> maintenant accessible via props
const mapStateToProps = ({ user }) => {
  return { user }
}

export default connect(mapStateToProps, null)(Inscription);