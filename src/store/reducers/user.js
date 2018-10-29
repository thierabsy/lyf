import {  USER } from '../types';

export default function user (state=null, action){
    switch(action.type){
        case USER:
            return action.payload || false
        default:
            return  state
    }
}