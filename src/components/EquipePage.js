import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { avoirEquipes, entrer, updateAction, deleteAction } from '../store/actions';
import EntrerEquipe  from './EntrerEquipe';
import EquipePageDetails from './equipes/EquipePageDetails';

class EquipePage extends Component {
  constructor(props){
    super(props);
    this.state = {};

    this.confirmDelete = this.confirmDelete.bind(this);
    this.deleteEquipe = this.deleteEquipe.bind(this);
  }

  // Ouverture de la boite de confirmation de suppression
  confirmDelete(id){
    this.props.entrer("delete-equipe");
    this.setState({ id })
    // On ferme le menu option
    // document.getElementsByClassName("selected") &&
    // document.getElementsByClassName("selected").classList.toggle("selected");
  }
  // Suppression de l'équipe ou annulation de suppression
  deleteEquipe(){
    this.props.deleteAction("delete-equipe", this.state.id);
    // this.props.avoirEquipes("");
    this.props.entrer("");
  }

  render() {
    const id = this.props.match.params.equipe_id;
    const equipe = this.props.equipes.filter( eq => eq._id === id)[0];
    const updateData = {
      ...equipe,
      annee_creation : moment(equipe && equipe.annee_creation).format("YYYY-MM-DD")
    }
    console.log("updateData", updateData)
    return (
      <div className="TD EquipePage">
        {/* Visible uniquement si on a cliqué sur le button "Modifier" */}
        {
            this.props.entree === "update-equipe" && 
            <EntrerEquipe 
              actionType = { this.props.updateAction }
              faire = "modifier"
              updateData = { updateData }
              id = { equipe._id }
              title = "Modifier l'équipe"
            />
          }
          {/* Visible uniquement si on a cliqué sur le button "Supprimer" */}
          {
            this.props.entree === "delete-equipe" && 
            <div className="delete-equipe">
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
          <div className="top-buttons">
            <button className="btn "><i className="fas fa-angle-left" /> Liste des équipes</button>
            <button className="btn btn-info" onClick={() => this.props.entrer("update-equipe")}>Modifier</button>
            <button className="btn btn-danger" onClick={() => this.props.entrer("delete-equipe")} >Supprimer</button>
          </div>
        <hr />
          <EquipePageDetails equipe = { equipe } />
        </div>
      </div>
    )
  }
}

// On extrait le classement dans le store ===> maintenant accessible via props
const mapStateToProps = ({ equipes, entree }) => {
  return { equipes, entree }
}

export default connect(mapStateToProps, { avoirEquipes, entrer, updateAction, deleteAction })(EquipePage);