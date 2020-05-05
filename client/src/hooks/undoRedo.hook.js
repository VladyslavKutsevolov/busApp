import { useThunkReducer } from './useThunkReducer';

export const useUndoRedoReducer = (reducer, initialState) => {
  const undoState = {
    past: [],
    present: initialState,
    future: [],
  };

  const undoReducer = (state, action) => {
    const newPresent = reducer(state.present, action);

    if (action.type === 'UNDO') {
      const [newPresent, ...newPast] = state.past;
      return {
        past: newPast,
        present: newPresent,
        future: [state.present, ...state.future],
      };
    }

    if (action.type === 'REDO') {
      const [newPresent, ...newFuture] = state.future;
      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: newFuture,
      };
    }

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [],
    };
  };

  return useThunkReducer(undoReducer, undoState);
};
