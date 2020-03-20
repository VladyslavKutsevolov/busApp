import React, { Component } from "react";
import { StateProvider } from "./context/localStorage";
import Page from "./components/Page";

function App() {
  // constructor() {
  //   super();
  //   this.state = {
  //     route: "",
  //     allPosts: [],
  //     allRoutes: []
  //   };
  // }

  // componentDidMount() {
  //   this.fetchRoutes();
  //   this.fetchAllPosts();
  // }

  // fetchRoutes = () => {
  //   fetch("/api/routes")
  //     .then(rsp => rsp.json())
  //     .then(allRoutes => {
  //       this.setState({ ...this.state, allRoutes });
  //     });
  // };

  // fetchAllPosts = () => {
  //   return axios
  //     .get("/api/posts")
  //     .then(posts => posts.data)
  //     .then(allPosts => this.setState({ ...this.state, allPosts }))
  //     .catch(err => console.log(err));
  // };

  // const handleChange = route => {
  //   this.setState({
  //     route: route
  //   });
  // };
  return (
    <StateProvider>
      <Page />
    </StateProvider>
  );
}

export default App;
