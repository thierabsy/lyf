import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import AppRoutes from './AppRoutes';
import EntrerEquipe from "./components/EntrerEquipe";
import EntrerScore from "./components/EntrerScore";

//import action 
import { avoirScore, avoirClassement } from './store/actions';

class App extends Component {
  componentDidMount(){
    this.props.avoirScore();
    this.props.avoirClassement();

  }
  render() {
    
    return (
      <div className="App">
          <AppRoutes />

          {/* Visible uniquement si on a cliqué sur le button "Entrer Equipe" */}
          {
            this.props.entrer === "equipe" && <EntrerEquipe />
          }

          {/* Visible uniquement si on a cliqué sur le button "Entrer Equipe" */}
          {
            this.props.entrer === "score" && <EntrerScore />
          }
      </div>
    );
  }
}

const mapStateToProps = ({score, classement, entrer}) => {
  return {score, classement, entrer}
}

export default connect(mapStateToProps, {avoirScore, avoirClassement})(App);
