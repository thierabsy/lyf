import React from 'react';
import moment from 'moment';
import Loader from '../shared/Loader'
import { path } from '../../utils/path';


const ScorePageDetails = ({ score }) => {
    let sc = score;
    console.log("sc", sc)
    if(sc){
        return(
          <>
          <div className="score-intro">
            <h5> Score du match </h5>
            <div className="stade">
                <p>{ moment(sc.date_match).format("DD-MM-YYYY h:m") }</p> 
                <p>Stade ...</p> 
            </div>
          </div>
            
          <div className="score-box">
            <div className="score-box-wrapper">
                <div className="score-box-left">
                    <span className="equipe equipe1"> { sc.equipe_1_nom } </span>
                </div>
                <div className="score-box-center">
                    <span className="score score1"> { sc.equipe_1_score }</span>
                    <span className="vs"> vs </span>
                    <span className="score score2"> { sc.equipe_2_score }</span>
                </div>
                <div className="score-box-right">
                    <span className="equipe equipe2"> { sc.equipe_2_nom } </span>
                </div>
            </div>
          </div>
          <div className="commentaires">
              <h5>Commentaires</h5>
              <p> { sc.commentaires } </p>
            </div>
            <hr />
          <div className="details">
            <div className="joueurs">
              <h5>Joueurs</h5>
            </div>
          </div>
          </>
        )
      } else {    
          return <Loader />
      }
                            
}

export default ScorePageDetails;