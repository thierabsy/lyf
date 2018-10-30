import axios from 'axios';

import { USER, AVOIR_SCORE, AVOIR_CLASSEMENT, AVOIR_EQUIPE, 
        ENTRER, POST_ACTION, UPDATE_ACTION, DELETE_ACTION 
    } from '../types';

import { rootPath }  from '../../utils/path';


// action pour active le type d'action à entrer entre score ou equipe
export const entrer = (entree) => {
    return {
        type : ENTRER,
        payload: entree
    }
}

// AVOIR L'UTILISATEUR CONNECTER
export const avoirUser = () => async (dispatch) => {
    // Combinaison entre l'url racine et la destination
    const url = rootPath + "backend/user" ;

    const json = await axios.get(url)

    dispatch({ type: USER, payload: json.data })
}

// Function à utiliser pour avoir des données du server en option: route: URI de la ressource et type: le type d'action
const getDataAction = (route, type) => async (dispatch) => {
    // Combinaison entre l'url racine et la destination
    const url = rootPath + "backend/" + route;

    const json = await axios.get(url)

    dispatch({ type: type, payload: json.data })
}
// Avoir données avec la function getDataAction, paramètres: route et type action à fournir
export const avoirClassement = (route = "classement", type = AVOIR_CLASSEMENT) => getDataAction(route, type);
export const avoirScores = (route = "scores", type = AVOIR_SCORE) => getDataAction(route, type);
export const avoirEquipes = (route = "equipes", type = AVOIR_EQUIPE) => getDataAction(route, type);


// action pour poster un formulaire avec la destitation et l'objet
export const postAction = (route, values) => async  (dispatch, getState) => {
    
    // Combinaison entre l'url racine et la destination
    const url = rootPath + route;

    await axios.post( url, values)
        .then(res => route === "connexion" && dispatch(avoirUser()))
        .catch(function (error) {
            console.log("post-err",error); 
    });
    console.log("Get state", getState().user)
    dispatch({ type: POST_ACTION, payload: null })
}


// action pour mettre à jour un formulaire avec la destitation et l'objet
export const updateAction = (route, id, values) => async dispatch => {
    
    // Combinaison entre l'url racine et la destination
    const url = rootPath + route + "/" + id;
    
    await axios.put( url, values)
        .catch(function (error) {
            console.log("update-err",error); 
    });

    dispatch({ type: UPDATE_ACTION, payload: null })
}


// action pour mettre à jour un formulaire avec la destitation et l'objet
export const deleteAction = (route, id) => async  dispatch => {
    
    // Combinaison entre l'url racine et la destination
    const url = rootPath + route + "/" + id;
    
    await axios.delete( url )
        .catch(function (error) {
            console.log("delete-err",error); 
    });

    dispatch({ type: DELETE_ACTION, payload: null })
}
