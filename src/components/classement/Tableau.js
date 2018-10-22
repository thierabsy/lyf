import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const renderTableau = (classement) => {
       return(
        //    La table devient responsive si la taille de l'ecran est < 572px en ajoutant la classe "table-responsive"
        <table className={`table ${window.innerHeight < 572 ? "table-responsive" : ""} table-bordered`} > 
            <thead>
                <tr>
                    <th>#</th>
                    <th colSpan="2" >Equipe</th>
                    <th>Points</th>
                    <th>Matchs</th>
                    <th>Victoire</th>
                    <th>Nul</th>
                    <th>Défaite</th>
                </tr>
            </thead>
            <tbody>
                { // Loop ligne par ligne du tableau de classement
                   Object.keys(classement).length > 0 ?
                   // Ligne(s) s'il y a des donnees
                   classement.map((col, index) => {
                        return(
                            <tr key={index}>
                                <td> { index + 1} </td> 
                                <td className="equipe" colSpan="2" > <Link to={`/equipes/${col.equipe_id}`}>{ col.nom_equipe }</Link> </td> 
                                <td> { col.position.points } </td> 
                                <td> { col.position.journees } </td> 
                                <td> { col.position.victoire } </td> 
                                <td> { col.position.nul } </td> 
                                <td> { col.position.defaite } </td> 
                            </tr>  
                        )
                    }) : 
                    // Ligne s'il n'y a pas de donnees
                     <tr>
                        <td> - </td> 
                        <td colSpan="2"> - </td> 
                        <td> - </td> 
                        <td> - </td> 
                        <td> - </td> 
                        <td> - </td> 
                        <td> - </td> 
                    </tr> 
                }
            </tbody>
        </table>
       )
    }

const Tableau = ({ classement }) => {
    
    // On filtre les donnees avec la colonne points
    let donnees = _.sortBy(classement, object => object.position.points);
    
    // On filtre les donnees avec la colonne points puis victoires puis nuls de façon descendante
    let donneesOrdonnees = _.orderBy(donnees, ["position.points", "position.victoire", "position.nul"], ["desc", "desc", "desc"]);
    
    return(
        <div className="Tableau">
            {/* Génère le tableau de classement */}
           { renderTableau(donneesOrdonnees) }
        </div>    
    )
                            
}

export default Tableau;