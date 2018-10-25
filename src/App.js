import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import AppRoutes from './AppRoutes';

class App extends Component {
  componentDidMount(){
  }
  render() {

    return (
      <div className="App">

          <AppRoutes />

      </div>
    );
  }
}

const mapStateToProps = ({ entrer }) => {
  return { entrer }
}

export default connect(mapStateToProps, null)(App);
