import { combineReducers } from 'redux';

import user from './user';
import scores from './scores';
import classement from './classement';
import equipes from './equipes';
import entree from './links';

export default combineReducers({
    user,
    scores,
    classement,
    equipes,
    entree
}) 