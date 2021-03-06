import React from 'react';
import moment from 'moment';

import SelectField from '../forms/SelectField'
import NumberField from '../forms/NumberField'
import DateField from '../forms/DateField'
import TextareaField from '../forms/TextareaField'

const EntrerScoreForm = ({sc, title, errorClass, options, event, annuler, postAction}) => {
    return(
        <div className="EntrerScoreForm">
            {/* En clicquant sur "Annuler", on annule l'enregistrement d'une nouvelle équipe */}
            <div className="annuler" onClick={() => annuler()} >
                Fermer
            </div>
            <div className="form-header">
                <h5>{ title }</h5>
                <hr />
            </div>
            <div>
                <div className="row">
                    <div className="col col-sm-6">
                        <NumberField 
                            htmlFor="journee"
                            label="Journée"
                            name="journee"
                            id="journee"
                            placeholder="0"
                            required={true}
                            value={sc.journee ? sc.journee : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon "" 
                            event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state
                        />
                    </div>
                    <div className="col col-sm-6">
                        <DateField
                            htmlFor="date_match"
                            label="Date du match"
                            name="date_match"
                            id="date_match"
                            placeholder="date_match"
                            min={ moment().subtract(365, "days").format("YYYY-MM-DD") } // La date maximale qu'on peut prendre est la date d-
                            max={ moment().format("YYYY-MM-DD") } // La date maximale qu'on peut prendre est la date d'aujourd'hui
                            required={true}
                            value={sc.date_match ? sc.date_match : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon "" 
                            event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col col-sm-6">
                        <SelectField 
                            htmlFor="equipe_1"
                            label="Selection Equipe 1"
                            name="equipe_1_id"
                            id="equipe_1"
                            errorClass={errorClass}
                            placeholder="equipe 1"
                            required={true}
                            options={options}
                            optionValue="equipe_id" 
                            optionName="nom_equipe"
                            value={sc.equipe_1_id ? sc.equipe_1_id : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon "" 
                            event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state
                        />
                        <NumberField 
                            htmlFor="equipe_1_score"
                            label="Score Equipe 1"
                            name="equipe_1_score"
                            id="equipe_1_score"
                            placeholder="0"
                            required={true}
                            value={sc.equipe_1_score ? sc.equipe_1_score : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon "" 
                            event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state
                        />
                    </div>
                    <div className="col col-sm-6">
                        <SelectField 
                            htmlFor="equipe_2"
                            label="Selection Equipe 2"
                            name="equipe_2_id"
                            id="equipe_2"
                            placeholder="equipe 2"
                            errorClass={ errorClass }
                            required={true}
                            options={options}
                            optionValue="equipe_id" 
                            optionName="nom_equipe"
                            value={sc.equipe_2_id ? sc.equipe_2_id : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon "" 
                            event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state
                        />
                        <NumberField 
                            htmlFor="equipe_1_score"
                            label="Score Equipe 2"
                            name="equipe_2_score"
                            id="equipe_2_score"
                            required={true}
                            placeholder="0"
                            value={sc.equipe_2_score ? sc.equipe_2_score : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon "" 
                            event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state
                        />
                    </div>
                </div>
                <TextareaField 
                    htmlFor="commentaires"
                    label="Commentaires"
                    name="commentaires"
                    id="commentaires"
                    row="5"
                    placeholder="Commentaires sur le match"
                    value={sc.commentaires ? sc.commentaires : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon "" 
                    event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state
                />
                <button 
                    className="btn btn-block btnSubmit"
                    onClick={(e) => { postAction(e)}} 
                >Enregistrer ce score</button>
            </div>
        </div>    
    )
                            
}

export default EntrerScoreForm;