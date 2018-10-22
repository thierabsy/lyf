import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import AppRoutes from './AppRoutes';
import EntrerEquipe from "./components/EntrerEquipe";
import EntrerScore from "./components/EntrerScore";

class App extends Component {
  componentDidMount(){
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

const mapStateToProps = ({ entrer }) => {
  return { entrer }
}

export default connect(mapStateToProps, null)(App);
