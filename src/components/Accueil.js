import React, { Component } from 'react';
import Authentification from './shared/Authentification';

class Accueil extends Component {
  constructor(props){
    super(props);

    this.state = {
      connect : false
    }

  }

  render() {
    console.log("input", this.props)
    return (
      <div className="TD Accueil">
        <div className="wrapper">
          <div className="intro federation">
            <img src="img/fsf.jpg" alt="LYF" />
            <h5>Ligue Yux de Football</h5>
          </div>
          <Authentification 
            type="connexion" 
            titre="Se Connecter"
            history={this.props.history}
          />
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

export default Accueil;
