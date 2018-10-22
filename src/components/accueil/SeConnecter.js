import React from 'react';
import { Redirect } from 'react-router-dom';

const SeConnecter = ({connect, seConnecter}) => {
    return(
        <div className="SeConnecter">
            <form>
                <div className="form-group">
                    <label htmlFor="utilisateur">Nom d'utilisateur</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-user" />
                            </div>
                        </div>
                        <input type="text" name="utilisateur" id="utilisateur" className="form-control" placeholder="simon" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="motdepasse">Mot de passe</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-lock" />
                            </div>
                        </div>
                        <input type="text" name="motdepasse" id="motdepasse" className="form-control" placeholder="********" />
                    </div>
                </div>
                <button className="btn btn-block btnSubmit" onClick={e => seConnecter(e)}>
                {
                    connect && <Redirect to="/classement" />
                }
                Se Connecter
                </button>
            </form>
        </div>    
    )
                            
}

export default SeConnecter;