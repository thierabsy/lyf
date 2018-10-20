import React, { Component } from 'react';
import { connect } from 'react-redux';

class Scores extends Component {
  render() {
    return (
      <div className="TD Scores">
        Scores
      </div>
    )
  }
}

const mapStateToProps = ({score}) => {
  return {score}
}

export default connect(mapStateToProps, null)(Scores);
