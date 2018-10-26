import React, { Component } from 'react'
import { connect } from 'react-redux'
import EntrerScoreForm from './scores/EntrerScoreForm';

import { entrer, postAction, avoirScores, avoirClassement } from '../store/actions';

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
            options: []
        }
        this.inputChange = this.inputChange.bind(this);
        this.annuler = this.annuler.bind(this);
        this.postScore = this.postScore.bind(this);
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
                // On determine le nombre de point en fonction du score
                this.setState({
                    score : {
                        ...this.state.score,
                        equipe_1_point: parseInt(this.state.score.equipe_1_score) > parseInt(this.state.score.equipe_2_score)? 3 : 
                                        parseInt(this.state.score.equipe_1_score) === parseInt(this.state.score.equipe_2_score)? 1 : 0,
                        equipe_2_point: parseInt(this.state.score.equipe_1_score) < parseInt(this.state.score.equipe_2_score)? 3 : 
                                        parseInt(this.state.score.equipe_1_score) === parseInt(this.state.score.equipe_2_score)? 1 : 0,
                    }
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
    }

    postScore(e){
        e.preventDefault();
        // On post le score avec l'action post pour creer une score 
        this.props.faire === "creer" && this.props.actionType("score", this.state.score);

        // On post le score avec l'action update pour mettre à jour un score
        this.props.faire === "modifier" && this.props.actionType("update-score", this.state.score);

        // Vide l'object score du state
        this.setState({
            score : {}
        });
    }

    render() {
        const validations = Object.keys(this.state.score).filter( sc => this.state.score[sc] === ("" || null))
         console.log("validations", validations)
         console.log("state", this.state.score)
        return (
            <div className="entrer-overlay">
                <div className="EntrerScore">
                    <div className="container">
                        <EntrerScoreForm 
                            options = { this.state.options }
                            sc = { this.state.score }
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

const mapStateToProps = ({ classement }) => {
  return { classement }
} 

export default connect(mapStateToProps, { entrer, postAction, avoirScores, avoirClassement })(EntrerScore)
