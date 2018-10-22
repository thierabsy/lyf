import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { avoirClassement, avoirEquipes, avoirScores } from '../store/actions'
import Tableau from './classement/Tableau';
import Links from './shared/Links';

class Classement extends Component {
  constructor(props){
    super(props);
    this.state = {
      classement:[]
    }
    this.refreshTable = this.refreshTable.bind(this);
  }
  componentDidMount(){
    // this.props.avoirClassement();
    // this.props.avoirScores();
    // this.props.avoirEquipes();
  }
  refreshTable(){
    this.props.avoirClassement("classement");
  }
  render() {
    return (
      <div className="TD Classement">
        <div className="refresher" onClick={() => this.refreshTable()}>
          <i className="fas fa-sync" />
        </div>
          <div className="container">
            <div className="fsf-logo" >
              <img src="img/fsf.jpg" alt="LYF" />
            </div>
            <div className="tableau-intro">
              <h3>Classement du Champioannat</h3>
              <h4>Fédération Sénégalaise de Football</h4>
              <p>Ligue Yux de Football</p>
              <img src="img/ball-sn2.jpg" alt="Ball SN Colors" />
            </div>
            <div className="row">
                <div className="col col-lg-6 col-md-12 col-sm-12 order-sm-2 order-md-2 order-lg-1">
                  <div className="tableau-wrapper">
                    <div className="date"> Classement du championnat au { moment().format("L") } </div>
                    <Tableau classement= { this.props.classement } />
                  </div>
                </div>
                <div className="col col-lg-6 col-md-12 col-sm-12 order-sm-1 order-md-1 order-lg-2">
                  <div className="links-wrapper">
                    <Links />
                  </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

// On extrait le classement dans le store ===> maintenant accessible via props
const mapStateToProps = ({classement, scores, equipes, entrer}) => {
  return { classement, scores, equipes, entrer }
}

export default connect(mapStateToProps, {avoirClassement,  avoirEquipes, avoirScores })(Classement);