import React, { Component } from 'react'
import { connect } from 'react-redux'
import EntrerScoreForm from './EntrerScoreForm';
import MessageAlert from '../shared/MessageAlert';

import { entrer, postAction, avoirScores, avoirClassement } from '../../store/actions';

export class EntrerScore extends Component {
    constructor(props){
        super(props)
        this.state = {
            score: {
                equipe_1_id : "",
                equipe_1_score : null,
                equipe_2_id : "",
                equipe_2_score : null,
                equipe_1_point: null,
                equipe_2_point: null,
                date_match: "",
                journee: null,
            },
            options: [],
            equipe1AvaitJoue: false,
            nomEquipe1: "",
            equipe2AvaitJoue: false,
            matchDejaJouer: false,
            nomEquipe2: "",
            message: ""
        }
        this.inputChange = this.inputChange.bind(this);
        this.annuler = this.annuler.bind(this);
        this.fermeErrors = this.fermeErrors.bind(this);
        this.postScore = this.postScore.bind(this);
        this.aDejaJouer = this.aDejaJouer.bind(this);
        this.matchDejaJouer = this.matchDejaJouer.bind(this);
        this.selectOptions = this.selectOptions.bind(this);
    }

    componentDidMount(){
        if(this.props.faire === "modifier"){
            this.props.updateData &&
            this.setState({
                score: this.props.updateData
            })
        };
        this.selectOptions();
    }

    // Change la valeur state si le champ change dans le formulaire
    inputChange(e){ 
        this.setState({
            score : {
                ...this.state.score,
                [e.target.name] : e.target.value,
            }},function() {
                
                let { equipe_1_id, equipe_2_id, journee } = this.state.score;

                // On détermine si l'équipe 1 a déjà joué
                let equipe1AvaitJoueArr = this.aDejaJouer(journee, equipe_1_id);
                let nomEquipe1 = equipe1AvaitJoueArr && 
                                 this.state.options.filter(eq => eq.equipe_id === equipe_1_id)[0] &&
                                this.state.options.filter(eq => eq.equipe_id === equipe_1_id)[0].nom_equipe
                // On détermine si l'équipe 2 a déjà joué
                let equipe2AvaitJoueArr = this.aDejaJouer(journee, equipe_2_id)
                let nomEquipe2 = equipe2AvaitJoueArr && 
                                 this.state.options.filter(eq => eq.equipe_id === equipe_2_id)[0] &&
                                this.state.options.filter(eq => eq.equipe_id === equipe_2_id)[0].nom_equipe
                // On détermine si le match est déjà joué
                let matchDejaJouer = this.props.faire === "creer" && this.matchDejaJouer(equipe_1_id, equipe_2_id).length > 0 ? true : false
                // On determine le nombre de point en fonction du score
                this.setState({
                    score : {
                        ...this.state.score,
                        equipe_1_point: parseInt(this.state.score.equipe_1_score) > parseInt(this.state.score.equipe_2_score)? 3 : 
                                        parseInt(this.state.score.equipe_1_score) === parseInt(this.state.score.equipe_2_score)? 1 : 0,
                        equipe_2_point: parseInt(this.state.score.equipe_1_score) < parseInt(this.state.score.equipe_2_score)? 3 : 
                                        parseInt(this.state.score.equipe_1_score) === parseInt(this.state.score.equipe_2_score)? 1 : 0,
                    },
                    equipe1AvaitJoue: equipe1AvaitJoueArr.length > 0 ? true : false,
                    equipe2AvaitJoue: equipe2AvaitJoueArr.length > 0 ? true : false,
                    nomEquipe1,
                    nomEquipe2,
                    matchDejaJouer
                });
                // Change option disabled to true 
                this.selectOptions();
        })
    }
    selectOptions(){
        const options = this.props.classement
            .map(({equipe_id, nom_equipe}) => ({equipe_id, nom_equipe, 
                    optionDisabled: this.state.score.equipe_1_id === equipe_id || this.state.score.equipe_2_id === equipe_id  ? true : false
            }))
        this.setState({options})
        return null;
    }
    annuler(){
        // Vide l'object equipe du state
        this.setState({
            score : {}
        })
        // Annule l'activation d'entrer une équipe
        this.props.entrer("");
        // Met à jour le classement
        this.props.avoirClassement();
        this.props.avoirScores();
    }

    fermeErrors(){
        // Vide l'object score du state 
        this.setState({
            message: "",
            equipe1AvaitJoue: false,
            equipe2AvaitJoue: false,
            errors : []
        })
    }
    aDejaJouer(journee, equipe){
        let dejaJouer = this.props.scores.filter(sc => sc._id !== this.props.id && sc.journee === Number(journee) &&
            (
                sc.equipe_1_id === equipe ||
                sc.equipe_2_id === equipe
            ) 
        )
        return dejaJouer
    }

    matchDejaJouer(equipe1, equipe2){
        let dejaJouer = this.props.scores.filter(sc => sc.equipe_1_id === equipe1 && sc.equipe_2_id === equipe2) 
        return dejaJouer
    }

    postScore(e){
        e.preventDefault();

        let errors = [];
        
        let requiredFields =  {
            journee: "La journée est obligatoire.", 
            date_match: "La date du match est obligatoire.",
            equipe_1_id: "Sélection Equipe 1 est obligatoire.",
            equipe_1_score: "Le Score de l'Equipe 1 est obligatoire.",
            equipe_2_id: "Sélection Equipe 2 est obligatoire.",
            equipe_2_score: "Le Score de l'Equipe 2 est obligatoire.",
        };
        let fields = Object.keys(requiredFields)
                            .filter(eq => 
                                this.state.score[eq] === "" || 
                                this.state.score[eq] === null
                            )

        if(fields.length > 0){
            fields.forEach(err => {
                return errors.push(requiredFields[err])
            }); 
            this.setState({ errors })
        } else if( this.state.equipe1AvaitJoue || this.state.equipe2AvaitJoue){
            this.state.equipe1AvaitJoue && 
            errors.push(`${this.state.nomEquipe1} a déjà joué lors de la ${this.state.score.journee} ${Number(this.state.score.journee) === 1 ? "ère" : "ème"} journée.`);
            this.state.equipe2AvaitJoue && 
            errors.push(`${this.state.nomEquipe2} a déjà joué lors de la ${this.state.score.journee} ${Number(this.state.score.journee) === 1 ? "ère" : "ème"} journée.`);
            
            this.setState({ errors })
        } else if(this.state.matchDejaJouer) {
            errors.push(`Le match entre ${this.state.nomEquipe1} et ${this.state.nomEquipe2} est déjà enregistré lors d'une autre journée de championnat.`)
           
            this.setState({ errors })
        } else {

            // On post le score avec l'action post pour creer une score 
            this.props.faire === "creer" && this.props.actionType("score", this.state.score);

            // On post le score avec l'action update pour mettre à jour un score
            this.props.faire === "modifier" && this.props.actionType("update-score", this.props.id, this.state.score);

            // Vide l'object score du state
            this.props.faire === "creer" &&
            this.setState({
                score : {}
            });
            this.setState({
                message: "Votre requête a été envoyée avec success!"
            });
        }
    }

    render() {
        return (
            <div className="entrer-overlay">
                <div className="EntrerScore">
                    <div className="container">
                        { // Visible uniquement s'il y a error ou succès lors d'un post ou update
                            ((this.state.errors && this.state.errors.length > 0) || this.state.message !== "") &&
                            <MessageAlert 
                                errors={ this.state.errors } 
                                message={ this.state.message } 
                                fermeErrors={ this.fermeErrors } 
                            />
                        }
                        <EntrerScoreForm 
                            options = { this.state.options }
                            sc = { this.state.score }
                            title = { this.props.title }
                            event = { this.inputChange }
                            // errorClass={this.state.score.equipe_1_id === this.state.score.equipe_2_id ? "memeEquipe" : ""}
                            annuler = { this.annuler }
                            postAction = { this.postScore }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ classement, scores }) => {
  return { classement, scores }
} 

export default connect(mapStateToProps, { entrer, postAction, avoirScores, avoirClassement })(EntrerScore)
