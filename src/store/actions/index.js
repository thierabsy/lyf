import axios from 'axios';

import { AVOIR_SCORE, AVOIR_CLASSEMENT, ENTRER, POST_ACTION } from '../types';

import { classement }  from '../data/classement';
import { rootPath }  from '../../utils/path';

// action pour avoir le classement
export const avoirScore = () => {
    return {
        type : AVOIR_SCORE,
        payload: "SCORE"
    }
}

// action pour active le type d'action à entrer entre score ou equipe
export const entrer = (entre) => {
    return {
        type : ENTRER,
        payload: entre
    }
}

// action pour avoir le classement
export const avoirClassement = () => async dispatch => {
    let data = classement;

    dispatch({ type: AVOIR_CLASSEMENT, payload: data })
}


// action pour poster un formulaire avec la destitation et l'objet
export const postAction = (e, route, values) => async dispatch => {
    e.preventDefault();
    // Combinaison entre l'url racine et la destination
    const url = rootPath + route;

    await axios.post(
            url, 
            {
                headers: {
                    "Accept": "Application/json",
                    "Content-Type": "Application/json"
                }
            }, 
            values
        );

    dispatch({ type: POST_ACTION, payload: null });
}