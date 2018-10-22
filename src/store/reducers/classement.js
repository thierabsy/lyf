import {  GET_ACTION } from '../types';

export default function classement (state=[], action){
    switch(action.type){
        case GET_ACTION:
            return action.payload
        default:
            return  state
    }
}