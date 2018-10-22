import React, { Component } from 'react';
import { connect } from 'react-redux';

class Equipes extends Component {
  constructor(props){
    super(props);
    this.state = {
      equipes:[]
    }
  }
  componentDidMount(){

  }
  render() {
    console.log("EQUIPES", this.props.equipes);
    return (
      <div className="TD Equipes">
        <div className="container">
          Equipes
        </div>
      </div>
    )
  }
}

// On extrait le classement dans le store ===> maintenant accessible via props
const mapStateToProps = ({ equipes }) => {
  return { equipes }
}

export default connect(mapStateToProps, null)(Equipes);