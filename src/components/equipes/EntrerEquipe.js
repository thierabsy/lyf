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
            equipes: [],
            message: "",
            errors : []
        }
        this.inputChange = this.inputChange.bind(this); 
        this.annuler = this.annuler.bind(this);
        this.fermeErrors = this.fermeErrors.bind(this);
        this.postEquipe = this.postEquipe.bind(this);
        this.equipeExist = this.equipeExist.bind(this);
    }
    componentDidMount(){
        this.setState({
            equipes: this.props.equipes
        });
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
        this.props.faire === "creer" && this.equipeExist();
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
    equipeExist(){
        const equipe = this.state.equipes.filter(eq => eq.nom_equipe === this.state.equipe.nom_equipe);
        if(equipe.length > 0){
            alert(`Le nom d'équipe doit être unique. Il existe déjà une équipe avec le nom ${this.state.equipe.nom_equipe}`)
        }
        return null;
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
            this.props.faire === "creer" &&
            this.setState({
                equipe :  {
                    nom_equipe: "",
                    annee_creation: ""
                }
            });
            this.setState({
                message: "Votre requête a été envoyée avec success!"
            });
        }
       
    }
    render() {
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

const mapStateToProps = ({ entree, equipes }) => {
  return { entree, equipes }
} 

export default connect(mapStateToProps , { entrer, postAction, avoirClassement, avoirEquipes })(EntrerEquipe)
