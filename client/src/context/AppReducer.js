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
    default:
      return posts;
  }
}
