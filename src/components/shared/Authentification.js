import React, { Component } from 'react';
import { connect } from 'react-redux';

import { entrer, postAction, avoirUser } from '../../store/actions';

class Authentification extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputData: {}
        }
        this.inputChange = this.inputChange.bind(this);
        this.envoyer = this.envoyer.bind(this);
    }
    // Change la valeur du champ dans state si le champ change dans le formulaire
    inputChange(e){ 
        this.setState({
            inputData : {
                ...this.state.inputData,
                [e.target.name] : e.target.value 
            }
        })
    }
    envoyer(e){
        e.preventDefault();
        this.props.postAction(this.props.type, this.state.inputData);
        this.props.avoirUser();
        this.props.type === "connexion" &&
        this.props.history.push("/classement");
    }
    render(){
        return(
            <div className="Authentification">
                <form>
                    <div className="form-group">
                        <label htmlFor="utilisateur"> Nom d'utilisateur <sup>*</sup> </label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-user" />
                                </div>
                            </div>
                            <input 
                                type="text" 
                                name="utilisateur" 
                                id="utilisateur" 
                                className="form-control" 
                                placeholder="simon" 
                                onChange={e => this.inputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"> Mot de passe <sup>*</sup></label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-lock" />
                                </div>
                            </div>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                className="form-control" 
                                placeholder="********" 
                                onChange={e => this.inputChange(e)}
                            />
                        </div>
                    </div>
                    { // Visible s'il s'agit d'une inscription
                        this.props.type === "inscription" &&
                        <div className="form-group">
                            <span className="radioLabel"> Rôle </span>

                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="role" 
                                    value="super-admin" 
                                    id="super-admin" 
                                    onChange={e => this.inputChange(e)}
                                />
                                <label className="form-check-label" htmlFor="super-admin">
                                    Super-admin
                                </label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="role" 
                                    value="admin" 
                                    id="admin" 
                                    onChange={e => this.inputChange(e)}
                                />
                                <label className="form-check-label" htmlFor="admin">
                                    Admin
                                </label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="role" 
                                    value="utilisateur" 
                                    id="utilisateurRole" 
                                    onChange={e => this.inputChange(e)}
                                />
                                <label className="form-check-label" htmlFor="utilisateurRole">
                                    Utilisateur
                                </label>
                            </div>

                        </div>
                    }
                    <button className="btn btn-block btnSubmit" onClick={e => this.envoyer(e)}>
                        { this.props.titre }
                    </button>
                </form>
            </div>    
        )
    }
                            
}

const mapStateToProps = ({ user }) => {
    return { user }
  } 
  
export default connect(mapStateToProps, { entrer, postAction, avoirUser })(Authentification)