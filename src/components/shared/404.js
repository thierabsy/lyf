import React from 'react';
import { connect } from 'react-redux';

const PageNotFound = ({user}) => {
    return(
        <div className={ `TD PageNotFound ${ !user ? "nonConnecter" : ""}` }>
            <div className="container">
                <h3>Page Introuvable</h3>
                <p>ou</p>
                <h3>En Construction</h3>
            </div>
        </div>    
    )                      
}

// On extrait le classement dans le store ===> maintenant accessible via props
const mapStateToProps = ({ user }) => {
    return { user }
  }
  
  export default connect(mapStateToProps, null)(PageNotFound);