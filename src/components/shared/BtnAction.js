import React from 'react';
import { Link } from "react-router-dom";

const BtnAction = ({ id, icon, type, modifier, supprimer, btnActionClick }) => {
    return(
        <div className="BtnAction">
            <i className={`fas ${ icon }`} onClick={() => btnActionClick(id)}/>
           <ul className="list-group actions-list" id={id}>
               <li className="list-group-item btn-modifier">
                    {/* Types: equipes ou scores ou ... */}
                    <Link to={`/${type}/${id}`}>Détails</Link>
               </li>
               <li className="list-group-item btn-modifier" onClick={() => modifier(id)}>Modifier</li>
               <li className="list-group-item btn-supprimer" onClick={() => supprimer(id)}>Supprimer</li>
           </ul>
        </div>    
    )
                            
}

export default BtnAction;