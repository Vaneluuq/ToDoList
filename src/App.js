import React, { Fragment } from 'react';
import './App.css';
import Login from './componenets/login/Login';
import Register from './componenets/login/Register';
import LandingPage from './componenets/views/LandingPage';
import TaskList from './componenets/views/Home';



import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Router basename={process.env.PUBLIC_URL}>
      <div className="container">
      <Switch>
        <Route path="/" exact>
           <LandingPage></LandingPage>
        </Route>
        <Route path="/login">
            <Login></Login>
        </Route>
        <Route path="/signup">
          <Register></Register>
        </Route>
        <Route path="/home">
          <TaskList></TaskList>
        </Route>
      </Switch> 
      </div>
    </Router>
    </Fragment>
  );
}

export default App;



