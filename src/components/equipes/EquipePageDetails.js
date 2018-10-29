import React from 'react';
import moment from 'moment';
import Loader from '../shared/Loader'
import { path } from '../../utils/path';


const EquipePageDetails = ({ equipe }) => {
    let eq = equipe;
    if(eq){
        return(
          <>
          <div className="equipe-intro">
            <h3>Details de l'Equipe { eq.nom_equipe } </h3>
          </div>
          <div className="details">
            <div className="row">
              <div className="col col-sm-12 col-md-3 col-lg-4">
                <div className="equipe-logo">
                  <img 
                    src={
                      eq.logo ? eq.logo :
                      `${path}/img/fsf.png`
                    }
                    alt={ eq.nom_equipe }
                  />
                </div>
              </div>
              <div className="col col-sm-12 col-md-9 col-lg-8">
                <div className="equipe-details">
                  <div className="details-item">
                    <span>Président:</span> <br /> { eq.president}
                  </div>
                  <div className="details-item">
                    <span>Entraineur:</span> <br /> { eq.entraineur}
                  </div>
                  <div className="details-item">
                    <span>Région:</span> <br /> { eq.region}
                  </div>
                  <div className="details-item">
                    <span>Année de création:</span> <br  /> { moment(eq.annee_creation).format("DD/MM/YYYY") }
                  </div>
                  <div className="details-item">
                    <span>Stade:</span> <br /> { eq.stade}
                  </div>
                 
                </div>
              </div>
            </div>
            <hr />
            <div className="histoire">
              <h5>Histoire</h5>
            </div>
            <hr />
            <div className="joueurs">
              <h5>Joueurs</h5>
            </div>
            <hr />
            <div className="maillots">
              <h5>Maillots</h5>
            </div>
            <hr />
            <div className="maillots">
              <h5>Matchs</h5>
            </div>
          </div>
          </>
        )
      } else {    
          return <Loader />
      }
                            
}

export default EquipePageDetails;