import {  AVOIR_CLASSEMENT } from '../types';

export default function classement (state=[], action){
    switch(action.type){
        case AVOIR_CLASSEMENT:
            return action.payload
        default:
            return  state
    }
}