import React, { Component } from "react";
import Form from "./components/Form/Form";
import Map from "./components/Map/Map.js";
import AllPosts from "./components/Form/AllPosts";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "",
      allPosts: [],
      allRoutes: []
    };
  }

  componentDidMount() {
    this.fetchRoutes();
    this.fetchAllPosts();
  }

  fetchRoutes = () => {
    fetch("/api/routes")
      .then(rsp => rsp.json())
      .then(allRoutes => {
        this.setState({ ...this.state, allRoutes });
      });
  };

  fetchAllPosts = () => {
    return axios
      .get("/api/posts")
      .then(posts => posts.data)
      .then(allPosts => this.setState({ ...this.state, allPosts }))
      .catch(err => console.log(err));
  };

  handleChange = route => {
    this.setState({
      route: route
    });
  };

  render() {
    return (
      <>
        <div className="app p-6">
          <h1 className="text-3xl pb-4 text-center">BusApp</h1>
          <Form
            route={this.state.route}
            handleChange={this.handleChange}
            allRoutes={this.state.allRoutes}
          />
          <AllPosts posts={this.state.allPosts} route={this.state.route} />
        </div>
        <div>
          <Map />
        </div>
      </>
    );
  }
}

export default App;
