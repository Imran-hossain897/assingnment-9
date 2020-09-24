import React, { createContext, useState } from 'react';
import './App.css';
import Home from './componets/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";
import Header from './componets/Header/Header';
import NoMatched from './componets/NoMatched/NoMatched';
import TravleDetails from './componets/TravleDetails/TravleDetails';
import Booking from './componets/Booking/Booking';
import LogIn from './LogIn/LogIn';
import PrivateRoute from './componets/PrivateRoute/PrivateRoute';

export const userContext = createContext()


function App() {
  const [userLogIn, setUserLogIn] = useState({})

  return (
    
    <userContext.Provider value={[userLogIn, setUserLogIn]}>
      <Header></Header>
      <Router>
        <Switch>
          <Route  path="/Home">
            <Home></Home>
          </Route>
          <Route path="/travel/:travelId">
            <TravleDetails/>
          </Route>
          <PrivateRoute path="/booking/:bookingName">
            <Booking></Booking>
          </PrivateRoute>
          <Route path='/login'>
            <LogIn></LogIn>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NoMatched />
          </Route>
        </Switch>
      </Router>

    </userContext.Provider>
  );
}

export default App;
