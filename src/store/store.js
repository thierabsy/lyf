import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Voir l'état du store sur le développeur tool ====> avec l'extension Redux 
import { composeWithDevTools } from 'redux-devtools-extension';

// Import des reducers dans le dossier reducers qui sont combinés dans @index.js avec combineReducers
import reducers from './reducers';

const middleware = [thunk];

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
)

export default store;