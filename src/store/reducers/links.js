import { ENTRER } from '../types';

export default function classement (state="", action){
    switch(action.type){
        case ENTRER:
            return action.payload
        default:
            return  state
    }
}