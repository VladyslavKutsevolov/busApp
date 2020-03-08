import React, { Component } from "react";
import Form from "./components/Form/Form";
import Map from "./components/Map/Map.js";
// import './App.scss'

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "",
      busData: [],
      timestamp: Date.now()
    };
  }

  componentDidMount() {
    this.fetchRoutes();
  }

  fetchRoutes = () => {
    fetch("/api/routes")
      .then(rsp => rsp.json())
      .then(allRoutes => {
        this.allRoutes = allRoutes;
        this.getBusNumber();
      });
  };

  getBusNumber = () => {
    if (this.allRoutes) {
      const busData = this.allRoutes;
      this.setState({ busData });
    }
  };

  handleChange = route => {
    this.setState({
      route
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
            allRoutes={this.state.busData}
          />
        </div>
        <div>
          <Map />
        </div>
      </>
    );
  }
}

export default App;
