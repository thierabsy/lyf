import React, { Component } from 'react'
import { connect } from 'react-redux'
import EntrerEquipeForm from './EntrerEquipeForm';

import { entrer, postAction, avoirClassement, avoirEquipes } from '../../store/actions';
import MessageAlert from '../shared/MessageAlert';

export class EntrerEquipe extends Component {
    constructor(props){
        super(props)
        this.state = {
            equipe: {
                nom_equipe: "", 
                annee_creation: ""
            },
            message: "",
            errors : []
        }
        this.inputChange = this.inputChange.bind(this); 
        this.annuler = this.annuler.bind(this);
        this.fermeErrors = this.fermeErrors.bind(this);
        this.postEquipe = this.postEquipe.bind(this);
    }
    componentDidMount(){
        if(this.props.faire === "modifier"){
            this.props.updateData &&
            this.setState({
                equipe: this.props.updateData
            })
        }
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
            equipe : {
                nom_equipe: "",
                annee_creation: ""
            }
        })
        // Annule l'activation d'entrer une équipe
        this.props.entrer("");
        // Met à jour le classement - les equipes
        this.props.avoirClassement();
        this.props.avoirEquipes();
    }
    fermeErrors(){
        // Vide l'object equipe du state
        this.setState({
            errors : [],
            message: ""
        })
    }

    postEquipe(e){
        e.preventDefault();
        
        let requiredFields =  {
            nom_equipe: "Le nom de l'équipe est obligatoire.", 
            annee_creation: "L'année de création est obligatoire."
        };
        let fields = Object.keys(requiredFields).filter(eq => this.state.equipe[eq] === "")

        if(fields.length > 0){
            let errors = [];
            fields.forEach(err => {
                return errors.push(requiredFields[err])
            });
            this.setState({ errors })
        } else {

             // On post l'équipe avec l'action post pour creer une nouvelle equipe
            this.props.faire === "creer" && 
            this.props.actionType("equipe", this.state.equipe);

            // On post l'équipe avec l'action update pour mettre à jour une équipe
            this.props.faire === "modifier" && 
            this.props.actionType("update-equipe", this.props.id, this.state.equipe);

            // Vide l'object equipe du state
            this.setState({
                equipe :  {
                    nom_equipe: "",
                    annee_creation: ""
                },
                message: "Votre requête a été envoyé avec success!"
            });
        }
       
    }
    render() {
        // console.log("message", this.state.message)
        return (
            <div className="entrer-overlay">
                <div className="EntrerEquipe">
                    <div className="container">
                        { // Visible uniquement s'il y a error ou succès lors d'un post ou update
                            ((this.state.errors && this.state.errors.length > 0) || this.state.message !== "") &&
                            <MessageAlert 
                                errors={ this.state.errors } 
                                message={ this.state.message } 
                                fermeErrors={ this.fermeErrors } 
                            />
                        }
                        <EntrerEquipeForm 
                            eq = { this.state.equipe }
                            event = { this.inputChange }
                            annuler = { this.annuler }
                            postAction = { this.postEquipe }
                            title = { this.props.title }
                            message = { this.state.message }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ entree }) => {
  return { entree }
} 

export default connect(mapStateToProps , { entrer, postAction, avoirClassement, avoirEquipes })(EntrerEquipe)
