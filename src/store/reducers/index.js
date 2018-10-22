import { combineReducers } from 'redux';

import scores from './scores';
import classement from './classement';
import equipes from './equipes';
import entre from './links';

export default combineReducers({
    scores,
    classement,
    equipes,
    entrer: entre
}) 