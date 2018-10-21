import React, { Component } from 'react'
import { connect } from 'react-redux'
import EntrerEquipeForm from './equipes/EntrerEquipeForm';

import { entrer, postAction } from '../store/actions';

export class EntrerEquipe extends Component {
    constructor(props){
        super(props)
        this.state = {
            equipe: {}
        }
        this.inputChange = this.inputChange.bind(this); 
        this.annuler = this.annuler.bind(this);
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
        this.props.entrer("")
    }
    render() {
        // console.log("EQUIPE::: ", this.state.equipe);
        return (
            <div className="entrer-overlay">
                <div className="EntrerEquipe">
                    <div className="container">
                        <EntrerEquipeForm 
                            eq = { this.state.equipe }
                            event = { this.inputChange }
                            annuler = { this.annuler }
                            postAction = { this.props.postAction }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
  
// } 

export default connect(null, { entrer, postAction })(EntrerEquipe)
