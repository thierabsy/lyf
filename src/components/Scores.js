import React, { Component } from 'react';
import { connect } from 'react-redux';

class Scores extends Component {
  render() {
    console.log("SCORES", this.props.scores);
    return (
      <div className="TD Scores">
        <div className="container">
            Scores
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({scores}) => {
  return {scores}
}

export default connect(mapStateToProps, null)(Scores);
