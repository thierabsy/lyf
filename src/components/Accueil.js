import React, { Component } from 'react'
import SeConnecter from './accueil/SeConnecter';

class Accueil extends Component {
  render() {
    return (
      <div className="TD Accueil">
        <div className="wrapper">
          <div className="accueil-intro federation">
            <img src="img/fsf.jpg" alt="LYF" />
            <h5>Ligue Yux de Football</h5>
          </div>
          <SeConnecter />
          <div className="accueil-intro sponsor">
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
