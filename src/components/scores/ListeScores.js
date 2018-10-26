import React from 'react';
import _ from "lodash";
import moment from "moment";
import Loader from '../shared/Loader';

import BtnAction from '../shared/BtnAction';

const scoreType = (scoreEquipe, scoreAdverse) => {
    // Détermine si l'equipe a eu une victoire, nul ou défaite en fonction du score
    let score = scoreEquipe > scoreAdverse ? "victoire" :
                scoreEquipe === scoreAdverse ? "nul" : "defaite"
    return score;
}

const ListeScores = ({ scores, supprimer, btnActionClick, getDataToUpdate }) => {
    if(scores){
        return(
            <div className="ListeScores">
                {
                    _.map(scores, (score, index) => {
                        let scoreOrderDate = _.orderBy(score, ["date_match"]);
                        return <div key={ index } className="journee" >
                            <div className="journee-n"> Journée { Number(index) } </div>
                            <div className="score">
                                {
                                    scoreOrderDate.map((sc, i) => {
                                        return(
                                            <div key={i} className="score-wrapper">
                                                <div className="score-items">
                                                    <div className="date"> { moment(sc.date_match).format("DD-MM-YYYY") } </div>
                                                    <div className="score-item">
                                                        <div className={`score-item-wrapper equipe1 ${scoreType(sc.equipe_1_score, sc.equipe_2_score) }`}>
                                                            <span className="nom"> { sc.equipe_1_nom } </span>
                                                            <span className={`score-n ${scoreType(sc.equipe_1_score, sc.equipe_2_score) }`}> { sc.equipe_1_score } </span>
                                                        </div>
                                                        <div className="separator"> - </div>
                                                        <div className={`score-item-wrapper equipe2 ${scoreType(sc.equipe_2_score, sc.equipe_1_score) }`}>
                                                            <span className="score-n"> { sc.equipe_2_score } </span>
                                                            <span className="nom"> { sc.equipe_2_nom } </span>
                                                        </div>
                                                    </div>
                                                    <div className="score-actions">
                                                        <BtnAction
                                                            type="scores" 
                                                            icon="fa-ellipsis-v" 
                                                            id={sc._id} 
                                                            modifier={ getDataToUpdate } 
                                                            supprimer={ supprimer } 
                                                            btnActionClick={btnActionClick} 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    })
                }
            </div>    
        )
    } else {
        return <Loader />
    }
                            
}

export default ListeScores;