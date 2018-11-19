import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListeScores from './scores/ListeScores';
import moment from 'moment';
import _ from 'lodash';

import EntrerScore from './scores/EntrerScore';
import { entrer, avoirScores, postAction, updateAction, deleteAction } from '../store/actions';

class Scores extends Component {
  constructor(props){
    super(props);
    this.state = {
      scores:[],
      filteredScore:[],
      scoresParJournee:[],
      score:{},
      id: "",
      keyword: "",
      filtre: false
    }
    this.btnActionClick = this.btnActionClick.bind(this);
    this.getDataToUpdate = this.getDataToUpdate.bind(this);
    this.filtrer = this.filtrer.bind(this);
    this.chercher = this.chercher.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.deleteScore = this.deleteScore.bind(this);
  }

  componentDidMount(){
    document.title = "LYF | Scores";
    this.props.avoirScores()
    this.setState({
      scores: this.props.scores,
      filteredScore: this.props.scores
    })
  } 

  btnActionClick(id){
    let listeActions = document.getElementsByClassName("actions-list");
    let scoreSelect = document.getElementById(id);
    for(let cl in listeActions){
      if(listeActions[cl].id !== id){
        listeActions[cl].classList && 
        listeActions[cl].classList.remove("selected")
      }else{
        scoreSelect.classList.toggle("selected");
      }
    }
  }

  filtrer(){
    this.setState({
      filtre: !this.state.filtre
    })
  }

  chercher(e){
    let keyword = e.target.value;
    let scores = this.props.scores.filter(sc => 
                    sc.equipe_1_nom.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
                    sc.equipe_2_nom.toLowerCase().indexOf(keyword.toLowerCase()) > -1
                  )
    this.setState({
      filteredScore: scores,
      keyword
    })
  }

  getDataToUpdate(id){
    let filterScore = this.props.scores.filter( sc => sc._id === id)[0];

    this.setState({
      id: id,
      score: filterScore
    }, function(){
          this.setState({
            score: {
              ...this.state.score,
              date_match : moment(filterScore.date_match).format("YYYY-MM-DD")
            }
          }, function(){ 
                // Ouvre le formulaire EnterEquipe avec l'option update-equipe
                this.props.entrer("update-score"); 
          }
          
          )
    })
    // Ferme les options à choisir 
    const selected = document.getElementById(id);
    selected.classList.remove("selected");
  }

  // Ouverture de la boite de confirmation de suppression
  confirmDelete(id){
    this.props.entrer("delete-score");
    this.setState({ id })
    // Ferme les options à choisir 
    const selected = document.getElementById(id);
    selected.classList.remove("selected");
  }

  // Suppression de l'équipe ou annulation de suppression
  deleteScore(){
    this.props.deleteAction("delete-score", this.state.id);
    this.props.avoirScores();
    this.props.entrer("");
    this.props.history.push("/scores");
  }

  render() {
    
    return (
      <div className="TD Scores">
        
          {/* Visible uniquement si on a cliqué sur le button "Entrer Equipe" */}
          {
            this.props.entree === "score" && 
            <EntrerScore 
              actionType = { this.props.postAction }
              faire = "creer"
              title = "Entrer un nouveau score"
            />
          }
          {/* Visible uniquement si on a cliqué sur le button "Modifier" */}
          {
            this.props.entree === "update-score" && 
            <EntrerScore 
              actionType = { this.props.updateAction }
              faire = "modifier"
              updateData = {this.state.score}
              id = { this.state.id }
              title = "Modifier ce score"
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
            <div className="scores-intro">
              <h3> Scores des matchs au { moment().format("DD-MM-YYYY")} </h3>
              <button className="btn" onClick={ () => this.props.entrer("score")}>Ajouter un score</button> <br />
            </div>
            <hr />
              <div className="filtre">
                <input 
                  type="text" 
                  name="recherche" 
                  className="form-control recherche" 
                  placeholder="Recherche..." 
                  onChange={(e)=> this.chercher(e)} 
                />
                <button className="btn btn-sm btn-filtre" onClick={ () => this.filtrer()}>
                  Filtrer <i className={`fas fa-filter ${this.state.filtre ? "filtre-active" : ""}`} /> 
                </button>
              </div>
              {
                this.state.keyword !== "" &&
                this.state.filteredScore.length === 0 &&
                <div className="alert alert-danger">
                  Score(s) introuvable(s) avec <strong>{ this.state.keyword.toUpperCase() }! </strong>  
                </div>
              }
            <ListeScores
              scores={ this.state.filteredScore.length > 0 ? this.state.filteredScore : this.props.scores } 
              filtre={ this.state.filtre } 
              supprimer={ this.confirmDelete } 
              btnActionClick={ this.btnActionClick } 
              getDataToUpdate={ this.getDataToUpdate } 
            />
        </div>
      </div>
    )
  }
}

// On extrait le classement dans le store ===> maintenant accessible via props
const mapStateToProps = ({ scores, entree }) => {
  return { scores, entree }
}

export default connect(mapStateToProps, { entrer, avoirScores, postAction, updateAction, deleteAction })(Scores);