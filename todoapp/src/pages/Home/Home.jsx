import React from "react";
import { Navbar, TodoList } from "../../components";
import "./Home.css";

import { NotificationContainer } from "react-notifications";

const Home = () => {

  return (
    <div className="Home">
      <div className="home__navbar">
        <Navbar />
      </div>
      <div className="home__body">
        <div className="home__body__swapper">
          <div className="home__title">My Tasks</div>
          <TodoList />
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Home;
