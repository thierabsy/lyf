import { combineReducers } from 'redux';

import score from './score';
import classement from './classement';
import entre from './links';

export default combineReducers({
    score,
    classement,
    entrer: entre
}) 