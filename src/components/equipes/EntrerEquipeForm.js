import React from 'react';

import TextField from '../forms/TextField'
import DateField from '../forms/DateField'

const EntrerEquipeForm = ({eq , title, event, annuler, postAction}) => {
    return(
        <div className="EntrerEquipeForm">
            {/* En clicquant sur "Annuler", on annule l'enregistrement d'une nouvelle équipe */}
            <div className="annuler" onClick={() => annuler()} >
                Annuler
            </div>
            <div className="form-header">
                <h5>{ title }</h5>
                <hr />
            </div>
            <form>
                <TextField
                    type="text" 
                    htmlFor="nom_equipe"
                    label="Nom de l'équipe"
                    name="nom_equipe"
                    id="nom_equipe"
                    placeholder="Entrer le nom de l'équipe"
                    required={true}
                    value={eq.nom_equipe ? eq.nom_equipe : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon "" 
                    event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state
                />
                <DateField
                    type="text" 
                    htmlFor="annee_creation"
                    label="Année de création"
                    name="annee_creation"
                    id="annee_creation"
                    placeholder="Entrer le nom de l'équipe"
                    required={true}
                    value={eq.annee_creation ? eq.annee_creation : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon "" 
                    event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state
                />
                <TextField 
                    type="text"
                    htmlFor="president"
                    label="Président de l'équipe"
                    name="president"
                    id="president"
                    placeholder="Entrer le nom du président de l'équipe"
                    value={eq.president ? eq.president : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon ""
                    event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state 
                />
                <TextField 
                    type="text"
                    htmlFor="entraineur"
                    label="Entraineur"
                    name="entraineur"
                    id="entraineur"
                    placeholder="Entrer le nom de l'entraineur de l'équipe"
                    value={eq.entraineur ? eq.entraineur : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon "" 
                    event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state
                />
                <TextField
                    type="text" 
                    htmlFor="joueurs"
                    label="Joueurs "
                    name="joueurs"
                    id="joueurs"
                    placeholder="{Nom, numero, poste, image}, {Nom, numero, poste, image}, ... "
                    disabled={true}
                    value={eq.joueurs ? eq.joueurs : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon "" 
                    event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state
                />
                <TextField 
                    type="text"
                    htmlFor="logo"
                    label="Logo (fond transparent)"
                    name="logo"
                    id="logo"
                    placeholder="Entrer le lien du logo de l'équipe"
                    value={eq.logo ? eq.logo : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon "" 
                    event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state
                />
                <TextField 
                    type="text"
                    htmlFor="region"
                    label="Région"
                    name="region"
                    id="region"
                    placeholder="Entrer la région de l'équipe"
                    value={eq.region ? eq.region : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon "" 
                    event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state
                />
                <TextField 
                    type="text"
                    htmlFor="stade"
                    label="Stade"
                    name="stade"
                    id="stade"
                    placeholder="Entrer le nom du stade de l'équipe"
                    value={eq.stade ? eq.stade : ""} //S'il y a cet attribut sur le state, il devient la valeur de ce champs sinon "" 
                    event={event} // A chaque changement dans ce champ, il y a le changement de sa valeur dans le state
                />
                <button 
                    className="btn btn-block btnSubmit"
                    onClick={(e) => { postAction(e)}} 
                >Enregistrer l'Equipe</button>
            </form>
        </div>    
    )
                            
}

export default EntrerEquipeForm;