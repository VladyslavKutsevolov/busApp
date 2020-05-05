import {
  DELETE_POST,
  ADD_POST,
  UPDATE_POST,
  GET_SINGLE_POST,
  FETCH_POSTS,
} from './types';

export default function (state, action) {
  if (action.type === DELETE_POST) {
    return {
      ...state,
      allPosts: state.allPosts.filter((post) => post._id !== action.payload),
    };
  }

  if (action.type === ADD_POST) {
    return {
      allPosts: [action.payload, ...state.allPosts],
    };
  }

  if (action.type === GET_SINGLE_POST) {
    return {
      ...state,
      post: action.payload,
    };
  }

  if (action.type === UPDATE_POST) {
    const updated = state.allPosts.map((e) =>
      e._id === action.id ? action.payload : e,
    );
    return {
      ...state,
      allPosts: updated,
    };
  }

  if (action.type === FETCH_POSTS) {
    return {
      allPosts: action.payload,
      loading: false,
      error: null,
    };
  }
}
