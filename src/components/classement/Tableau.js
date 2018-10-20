import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const renderTableau = (classement) => {
    if(classement){
       return(
        <table className="table table-responsive table-bordered" > 
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
                    classement.map((col, index) => {
                        return(
                            <tr key={index}>
                                <td> { index + 1} </td> 
                                <td className="equipe" colSpan="2" > { col.equipe } </td> 
                                <td> { col.points } </td> 
                                <td> { col.match_joues } </td> 
                                <td> { col.match_victoires } </td> 
                                <td> { col.match_nuls } </td> 
                                <td> { col.match_defaites } </td> 
                            </tr>  
                        )
                    })
                }
            </tbody>
        </table>
       )
    }
}

const Tableau = ({ classement }) => {
    // console.log("tableau", classement);
    // On filtre les donnees avec la colonne points
    let donnees = _.sortBy(classement, object => object.points);
    // On filtre les donnees avec la colonne points puis victoires puis nuls de façon descendante
    let donneesOrdonnees = _.orderBy(donnees, ["points", "match_victoires", "match_nuls"], ["desc", "desc", "desc"]);

    return(
        <div className="Tableau">
            {/* Génère le tableau de classement */}
           { renderTableau(donneesOrdonnees) }
        </div>    
    )
                            
}

export default Tableau;