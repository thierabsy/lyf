import React, { Component } from 'react';
import { connect } from 'react-redux';

import { avoirClassement } from '../store/actions'

class Equipes extends Component {
  constructor(props){
    super(props);
    this.state = {
      classement:[]
    }
  }
  componentDidMount(){
    // this.props.avoirClassement();
  }
  render() {

    return (
      <div className="TD Classement">
        Equipes
      </div>
    )
  }
}

// On extrait le classement dans le store ===> maintenant accessible via props
const mapStateToProps = ({classement}) => {
  return {classement}
}

export default connect(mapStateToProps, {avoirClassement})(Equipes);