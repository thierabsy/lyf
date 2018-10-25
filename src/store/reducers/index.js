import { combineReducers } from 'redux';

import scores from './scores';
import classement from './classement';
import equipes from './equipes';
import entree from './links';

export default combineReducers({
    scores,
    classement,
    equipes,
    entree
}) 