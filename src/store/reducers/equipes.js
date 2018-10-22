import {  AVOIR_EQUIPE } from '../types';

export default function equipes (state=[], action){
    switch(action.type){
        case AVOIR_EQUIPE:
            return action.payload
        default:
            return  state
    }
}