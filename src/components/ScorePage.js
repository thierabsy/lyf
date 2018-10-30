import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { avoirScores, entrer, updateAction, deleteAction } from '../store/actions';
import EntrerScore  from './scores/EntrerScore';
import ScorePageDetails from './scores/ScorePageDetails';

class ScorePage extends Component {
  constructor(props){
    super(props);
    this.state = {};

    this.confirmDelete = this.confirmDelete.bind(this);
    this.deleteScore = this.deleteScore.bind(this);
  }
  componentDidMount(){
    document.title = "LYF | Score match"
  }
  // Ouverture de la boite de confirmation de suppression
  confirmDelete(id){
    this.props.entrer("delete-score");
    this.setState({ id })
  }
  // Suppression de l'équipe ou annulation de suppression
  deleteScore(){
    this.props.deleteAction("delete-score", this.props.match.params.score_id);
    this.props.avoirScores();
    this.props.entrer("");
    this.props.history.push("/scores");
  }

  render() {
    const id = this.props.match.params.score_id;
    const score = this.props.scores.filter( eq => eq._id === id)[0];
    const updateData = {
      ...score,
      date_match : moment(score && score.date_match).format("YYYY-MM-DD")
    }
    return (
      <div className="TD ScorePage">
        {/* Visible uniquement si on a cliqué sur le button "Modifier" */}
        {
            this.props.entree === "update-score" && 
            <EntrerScore 
              actionType = { this.props.updateAction }
              faire = "modifier"
              updateData = { updateData }
              id = { score._id }
              title = "Modifier le score"
            />
          }
          {/* Visible uniquement si on a cliqué sur le button "Supprimer" */}
          {
            this.props.entree === "delete-score" && 
            <div className="deleteAction">
               <div className="delete-text">
                  Etes-vous sûr de vouloir supprimer ce score?
               </div>
               <div className="delete-boutons">
                 <div className="bouton confirm" onClick={()=> this.deleteScore()}>Oui</div>
                 <div className="bouton annuler" onClick={()=> this.props.entrer("")}>Non</div>
               </div>
            </div>
          }
        <div className="container">
          <div className="top-buttons">
            <button className="btn "><Link to="/scores"><i className="fas fa-angle-left" /> Tableau des scores</Link> </button>
            <button className="btn btn-info" onClick={() => this.props.entrer("update-score")}>Modifier</button>
            <button className="btn btn-danger" onClick={() => this.props.entrer("delete-score")} >Supprimer</button>
          </div>
        <hr />
          <ScorePageDetails score = { score } />
        </div>
      </div>
    )
  }
}

// On extrait le classement dans le store ===> maintenant accessible via props
const mapStateToProps = ({ scores, entree }) => {
  return { scores, entree }
}

export default connect(mapStateToProps, { avoirScores, entrer, updateAction, deleteAction })(ScorePage);