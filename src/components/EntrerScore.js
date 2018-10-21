import React, { Component } from 'react'
import { connect } from 'react-redux'
import EntrerScoreForm from './scores/EntrerScoreForm';

import { entrer, postAction, getAction } from '../store/actions';
import { classement } from '../store/data/classement';

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
        this.props.entrer("")
    }

    postScore(e){

        // On post le score avec l'action 
        this.props.postAction(e, "score", this.state.score);

        // On rafraichit les donnees du tableau
        this.props.getAction("classement");

        // Vide l'object equipe du state
        this.setState({
            score : {}
        });
    }

    

    render() {
        const options = this.props.classement.map(({equipe_id, nom_equipe}) => ({equipe_id, nom_equipe}));
        console.log(options);

        console.log("score", this.state.score);
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

export default connect(mapStateToProps, { entrer, postAction, getAction })(EntrerScore)
