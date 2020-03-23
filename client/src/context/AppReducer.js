export default function(posts, action) {
  switch (action.type) {
    case "DELETE_POST":
      return {
        ...posts,
        current: posts.current.filter(post => post._id !== action.payload)
      };
    case "ADD_POST":
      return {
        ...posts,
        current: [...posts.current, action.payload]
      };
    case "GET_SINGLE_POST":
      return {
        ...posts,
        post: action.payload
      };
    case "UPDATE_POST":
      const up = posts.current.map(e =>
        e._id === action.id ? action.payload : e
      );
      return {
        ...posts,
        current: up
      };
    default:
      return posts;
  }
}
