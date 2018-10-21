import React, { Component } from 'react'
import { connect } from 'react-redux'
import EntrerScoreForm from './scores/EntrerScoreForm';

import { entrer, postAction } from '../store/actions';

export class EntrerScore extends Component {
    constructor(props){
        super(props)
        this.state = {
            score: {
                equipe_1 : null,
                equipe_1_score : null,
                equipe_2 : null,
                equipe_2_score : null,
                date_match: "",
                journee: null,
                equipe_1_point: null,
                equipe_2_point: null
            }
        }
        this.inputChange = this.inputChange.bind(this);
        this.annuler = this.annuler.bind(this);
    }

    // Change la valeur state si le champ change dans le formulaire
    inputChange(e){ 
        this.setState({
            score : {
                ...this.state.score,
                [e.target.name] : e.target.value,
            }},function() {
                this.setState({
                    equipe_1_point: parseInt(this.state.score.equipe_1_score) > parseInt(this.state.score.equipe_2_score)? 3 : 
                                    parseInt(this.state.score.equipe_1_score) === parseInt(this.state.score.equipe_2_score)? 1 : 0,
                    equipe_2_point: parseInt(this.state.score.equipe_1_score) < parseInt(this.state.score.equipe_2_score)? 3 : 
                                    parseInt(this.state.score.equipe_1_score) === parseInt(this.state.score.equipe_2_score)? 1 : 0,
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
    render() {
        const options = [
            {
                id: 1,
                name: "Equipe 1"
            },
            {
                id: 2,
                name: "Equipe 2"
            },
            {
                id: 3,
                name: "Equipe 3"
            }
        ]
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
                            postAction = { this.props.postAction }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  
} 

export default connect(mapStateToProps, { entrer, postAction })(EntrerScore)
