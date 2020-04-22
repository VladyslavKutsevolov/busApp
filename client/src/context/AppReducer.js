import {
  DELETE_POST,
  ADD_POST,
  UPDATE_POST,
  GET_SINGLE_POST,
  LOADING,
  ERROR,
  FETCH_POSTS,
  FETCH_ROUTES
} from "./types";

export default function (state, action) {
  if (action.type === DELETE_POST) {
    return {
      ...state,
      data: {
        allPosts: state.data.allPosts.filter(
          (post) => post._id !== action.payload
        )
      }
    };
  }

  if (action.type === ADD_POST) {
    return {
      data: {
        allPosts: [action.payload, ...state.data.allPosts]
      },
      loading: false,
      error: null
    };
  }

  if (action.type === GET_SINGLE_POST) {
    return {
      ...state,
      post: action.payload
    };
  }

  if (action.type === UPDATE_POST) {
    const update = state.data.allPosts.map((e) =>
      e._id === action.id ? action.payload : e
    );
    return {
      ...state,
      data: {
        allPosts: update
      }
    };
  }
  if (action.type === FETCH_ROUTES) {
    return {
      data: action.payload,
      loading: false,
      error: null
    };
  }

  if (action.type === FETCH_POSTS) {
    return {
      data: action.payload,
      loading: false,
      error: null
    };
  }

  if (action.type === LOADING) {
    return {
      data: [],
      loading: true,
      error: null
    };
  }

  if (action.type === ERROR) {
    return {
      data: [],
      loading: false,
      error: action.payload.error
    };
  }
}
