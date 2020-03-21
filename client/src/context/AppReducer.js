export default function(posts, action) {
  switch (action.type) {
    case "DELETE_POST":
      return {
        ...posts,
        allPosts: posts.current.filter(post => post._id !== action.payload)
      };
    default:
      return posts;
  }
}
