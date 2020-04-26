import { useReducer, useCallback } from 'react';
import isFunction from 'lodash/isFunction';

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedReducer = useCallback(
    (action) => {
      console.log(action);
      isFunction(action) ? action(dispatch) : dispatch(action);
    },
    [dispatch],
  );

  return [state, enhancedReducer];
};

export { useThunkReducer };
