import { AVOIR_CLASSEMENT, GET_ACTION } from '../types';

export default function classement (state=[], action){
    switch(action.type){
        // case AVOIR_CLASSEMENT:
        //     return action.payload
        case GET_ACTION:
            return action.payload
        default:
            return  state
    }
}