import React from 'react';
import { Link } from "react-router-dom";

const BtnAction = ({ id, modifier, supprimer, btnActionClick }) => {
    return(
        <div className="BtnAction">
            <i className="fas fa-ellipsis-v" onClick={() => btnActionClick(id)}/>
           <ul className="list-group actions-list" id={id}>
               <li className="list-group-item btn-modifier">
                    <Link to={`/equipes/${id}`}>Détails</Link>
               </li>
               <li className="list-group-item btn-modifier" onClick={() => modifier(id)}>Modifier</li>
               <li className="list-group-item btn-supprimer" onClick={() => supprimer(id)}>Supprimer</li>
           </ul>
        </div>    
    )
                            
}

export default BtnAction;