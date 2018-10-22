import React, { Component } from 'react'
import { connect } from 'react-redux'
import EntrerEquipeForm from './equipes/EntrerEquipeForm';

import { entrer, postAction, avoirClassement } from '../store/actions';

export class EntrerEquipe extends Component {
    constructor(props){
        super(props)
        this.state = {
            equipe: {
                nom_equipe: "",
                annee_creation: ""
            },
        }
        this.inputChange = this.inputChange.bind(this); 
        this.annuler = this.annuler.bind(this);
        this.postEquipe = this.postEquipe.bind(this);
    }

    // Change la valeur du champ dans state si le champ change dans le formulaire
    inputChange(e){ 
        this.setState({
            equipe : {
                ...this.state.equipe,
                // Si le champ type="number" il convertit la value en integer sinon return la valeur
                [e.target.name] : e.target.type === "number" ? Number(e.target.value) : e.target.value 
            }
        })
    }

    annuler(){
        // Vide l'object equipe du state
        this.setState({
            equipe : {}
        })
        // Annule l'activation d'entrer une équipe
        this.props.entrer("");
        // Met à jour le classement
        this.props.avoirClassement()
    }

    postEquipe(e){

        // On post l'équipe avec l'action 
        this.props.postAction(e, "equipe", this.state.equipe);

        // Vide l'object equipe du state
        this.setState({
            equipe : {}
        });
    }
    render() {
        // console.log("equipe", this.state.equipe);
        return (
            <div className="entrer-overlay">
                <div className="EntrerEquipe">
                    <div className="container">
                        <EntrerEquipeForm 
                            eq = { this.state.equipe }
                            event = { this.inputChange }
                            annuler = { this.annuler }
                            postAction = { this.postEquipe }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
  
// } 

export default connect(null, { entrer, postAction, avoirClassement })(EntrerEquipe)
