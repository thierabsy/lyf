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
            }
        }
        this.inputChange = this.inputChange.bind(this);
        this.annuler = this.annuler.bind(this);
        this.postScore = this.postScore.bind(this);
    }

    componentDidMount(){
        if(this.props.faire === "modifier"){
            this.props.updateData &&
            this.setState({
                score: this.props.updateData
            })
        }
    }

    // Change la valeur state si le champ change dans le formulaire
    inputChange(e){ 
        this.setState({
            score : {
                ...this.state.score,
                [e.target.name] : e.target.value,
            }},function() {
                this.setState({
                    score : {
                        ...this.state.score,
                        equipe_1_point: parseInt(this.state.score.equipe_1_score) > parseInt(this.state.score.equipe_2_score)? 3 : 
                                        parseInt(this.state.score.equipe_1_score) === parseInt(this.state.score.equipe_2_score)? 1 : 0,
                        equipe_2_point: parseInt(this.state.score.equipe_1_score) < parseInt(this.state.score.equipe_2_score)? 3 : 
                                        parseInt(this.state.score.equipe_1_score) === parseInt(this.state.score.equipe_2_score)? 1 : 0,
                    }
                })
        })
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

        // On post l'équipe avec l'action post pour creer une nouvelle equipe
        this.props.faire === "creer" && this.props.actionType(e, "score", this.state.equipe);

        // On post l'équipe avec l'action update pour mettre à jour une équipe
        this.props.faire === "modifier" && this.props.actionType(e, "update-score", this.state.equipe);

        // Vide l'object equipe du state
        this.setState({
            score : {}
        });
        
    }

    render() {

        // Options dans le champ select equipe
        const options = this.props.classement.map(({equipe_id, nom_equipe}) => ({equipe_id, nom_equipe}));
        return (
            <div className="entrer-overlay">
                <div className="EntrerScore">
                    <div className="container">
                        <EntrerScoreForm 
                            options = { options }
                            sc = { this.state.score }
                            event = { this.inputChange }
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
