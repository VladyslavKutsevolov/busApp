import React, { Component } from "react";
import { StateProvider } from "./context/localStorage";
import Page from "./components/Page";

function App() {
  return (
    <StateProvider>
      <Page />
    </StateProvider>
  );
}

export default App;
