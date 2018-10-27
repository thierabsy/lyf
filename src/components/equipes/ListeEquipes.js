import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../shared/Loader';

import BtnAction from '../shared/BtnAction';

const ListeEquipes = ({ equipes, supprimer, btnActionClick, getDataToUpdate }) => {
    return(
        <div className="ListeEquipes">
            {
                equipes ?
                equipes.map((eq, index) => {
                    return <div key={ index } className="equipe" >
                        <div className="equipe-wrapper">
                            <div className="equipe-actions">
                                <BtnAction
                                    type="equipes" 
                                    icon="fa-ellipsis-v" 
                                    id={eq._id} 
                                    modifier={ getDataToUpdate } 
                                    supprimer={ supprimer } 
                                    btnActionClick={btnActionClick} 
                                />
                            </div>
                            <div className="equipe-logo">
                                <img 
                                    src={
                                        eq.logo ? eq.logo :
                                        "img/fsf.png"
                                    } 
                                    className="equipe-logo" 
                                    alt={ eq.nom_equipe } 
                                />
                            </div>
                             <p> <Link to={`/equipes/${eq._id}`}> { eq.nom_equipe } </Link> </p> 
                        </div>
                    </div>
                })
                : <Loader />
            }
        </div>    
    )
                            
}

export default ListeEquipes;