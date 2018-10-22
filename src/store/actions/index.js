import axios from 'axios';

import { AVOIR_SCORE, AVOIR_CLASSEMENT, AVOIR_EQUIPE, ENTRER, POST_ACTION } from '../types';

import { rootPath }  from '../../utils/path';


// action pour active le type d'action à entrer entre score ou equipe
export const entrer = (entre) => {
    return {
        type : ENTRER,
        payload: entre
    }
}

// Function à utiliser pour avoir des données du server en option: route: URI de la ressource et type: le type d'action
const getDataAction = (route, type) => async (dispatch) => {
    // Combinaison entre l'url racine et la destination
    const url = rootPath + "backend/" + route;

    const json = await axios.get(url)

    dispatch({ type: type, payload: json.data })
}

export const avoirClassement = (route = "classement", type = AVOIR_CLASSEMENT) => getDataAction(route, type);
export const avoirScores = (route = "scores", type = AVOIR_SCORE) => getDataAction(route, type);
export const avoirEquipes = (route = "equipes", type = AVOIR_EQUIPE) => getDataAction(route, type);


// action pour poster un formulaire avec la destitation et l'objet
export const postAction = (e, route, values) => async  dispatch => {
    e.preventDefault();
    // Combinaison entre l'url racine et la destination
    const url = rootPath + route;

    await axios.post( url, values)
            .catch(function (error) {
                console.log("post-err",error); 
        });

    dispatch({ type: POST_ACTION, payload: null })
}
