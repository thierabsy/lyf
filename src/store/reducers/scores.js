import {  AVOIR_SCORE } from '../types';

export default function scores (state=[], action){
    switch(action.type){
        case AVOIR_SCORE:
            return action.payload
        default:
            return  state
    }
}