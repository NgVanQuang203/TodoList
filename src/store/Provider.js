import Context from './Context';
import { useReducer } from 'react';
import reducer, {initState} from './reducer';
import React from 'react';
import logger from './logger';

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(logger(reducer), initState);

  return<Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>;
};

export default Provider;
