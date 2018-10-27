import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListeEquipes from './equipes/ListeEquipes';
import moment from 'moment';

import EntrerEquipe from './EntrerEquipe';
import { entrer, avoirEquipes, postAction, updateAction, deleteAction } from '../store/actions';

class Equipes extends Component {
  constructor(props){
    super(props);
    this.state = {
      equipes:[],
      equipe:{},
      id: ""
    }
    this.btnActionClick = this.btnActionClick.bind(this);
    this.getDataToUpdate = this.getDataToUpdate.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.deleteEquipe = this.deleteEquipe.bind(this);
  }
  componentDidMount(){

  } 
  btnActionClick(id){
    let listeActions = document.getElementsByClassName("actions-list");
    let equipeSelect = document.getElementById(id);
    for(let cl in listeActions){
      if(listeActions[cl].id !== id){
        listeActions[cl].classList && 
        listeActions[cl].classList.remove("selected")
      }else{
        equipeSelect.classList.toggle("selected");
      }
    }
  }
  getDataToUpdate(id){
    let filterEquipe = this.props.equipes.filter( eq => eq._id === id)[0];

    this.setState({
      id: id,
      equipe: filterEquipe
    }, function(){
          this.setState({
            equipe: {
              ...this.state.equipe,
              annee_creation : moment(filterEquipe.annee_creation).format("YYYY-MM-DD")
            }
          }, function(){ 
                // Ouvre le formulaire EnterEquipe avec l'option update-equipe
                this.props.entrer("update-equipe");
          }
          
          )
    })
    // Ferme les options à choisir 
    const selected = document.getElementById(id);
    selected.classList.remove("selected");
  }

  // Ouverture de la boite de confirmation de suppression
  confirmDelete(id){
    this.props.entrer("delete-equipe");
    this.setState({ id })
    // On ferme le menu option
    let selectOption = document.getElementById(id);
    selectOption && selectOption.classList.toggle("selected");
  }
  // Suppression de l'équipe ou annulation de suppression
  deleteEquipe(){
    this.props.deleteAction("delete-equipe", this.state.id);
    this.props.avoirEquipes();
    this.props.entrer("");
  }

  render() {

    return (
      <div className="TD Equipes">
        
          {/* Visible uniquement si on a cliqué sur le button "Entrer Equipe" */}
          {
            this.props.entree === "equipe" && 
            <EntrerEquipe 
              actionType = { this.props.postAction }
              faire = "creer"
              title = "Entrer une nouvelle équipe"
            />
          }
          {/* Visible uniquement si on a cliqué sur le button "Modifier" */}
          {
            this.props.entree === "update-equipe" && 
            <EntrerEquipe 
              actionType = { this.props.updateAction }
              faire = "modifier"
              updateData = {this.state.equipe}
              id = { this.state.id }
              title = "Modifier l'équipe"
            />
          }
          {/* Visible uniquement si on a cliqué sur le button "Supprimer" */}
          {
            this.props.entree === "delete-equipe" && 
            <div className="deleteAction">
               <div className="delete-text">
                  Etes-vous sûr de vouloir supprimer cette équipe?
               </div>
               <div className="delete-boutons">
                 <div className="bouton confirm" onClick={()=> this.deleteEquipe()}>Oui</div>
                 <div className="bouton annuler" onClick={()=> this.props.entrer("")}>Non</div>
               </div>
            </div>
          }
        <div className="container">
            <div className="equipes-intro">
              <h3> Liste des Equipes du Championat</h3>
              <button className="btn" onClick={ () => this.props.entrer("equipe")}>Ajouter une équipe</button>
            </div>
            <hr />
            <ListeEquipes 
              equipes={ this.props.equipes } 
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
const mapStateToProps = ({ equipes, entree }) => {
  return { equipes, entree }
}

export default connect(mapStateToProps, { entrer, avoirEquipes, postAction, updateAction, deleteAction })(Equipes);