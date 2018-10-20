import React, { Component } from 'react'
import { connect } from 'react-redux'

import { entrer } from '../../store/actions'

export class Links extends Component {

  render() {
    return (
        <div className="Links">
            {/* En cliquant sur l'un on active le type d'action (score ou equipe) à entrer  */}
            <span onClick={() => this.props.entrer("score")} >Entrer Score</span>
            <span onClick={() => this.props.entrer("equipe")}>Entrer Equipe</span>
        </div> 
    )
  }
}


export default connect(null, { entrer })(Links)
