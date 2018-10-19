import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import AppRoutes from './AppRoutes';

//import action 
import { avoirScore } from './store/actions';

class App extends Component {
  componentDidMount(){
    this.props.avoirScore();

  }
  render() {
    console.log(this.props.score);
    return (
      <div className="App">
          <AppRoutes />
      </div>
    );
  }
}

const mapStateToProps = ({score}) => {
  return {score}
}

export default connect(mapStateToProps, {avoirScore})(App);
