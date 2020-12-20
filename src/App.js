import React from "react";
import { HashRouter as Router } from "react-router-dom";

import Header from "./components/Header/Header";
import AsideMenu from "./components/AsideMenu/AsideMenu";
import StoreProvider from "./store/StoreProvider.js";
import Content from "./components/Content/Content";

import "./App.scss";

const App = () => {
  return (
    <StoreProvider>
      <Header />
      <Router>
        <div className="content-wrapper">
          <AsideMenu />
          <Content />
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
