import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import "./Styles/Reset.css"
import "./Styles/Nord.css"
import "./Styles/table.css"

import "./Styles/Theme.css";
import "./Styles/Variables.css";

import RecipeRoutes from "./Routes/RecipeRoutes";

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import store from './Utils/Reducers';

import Root from './Components/Root';
import Calculators from "./Components/Calculators";
import User from './Components/User';
import About from './Components/About';

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <div>
        <Route path="/" component={ Root } />

        <RecipeRoutes />

        <Route exact path="/user" component={ User } />
        <Route exact path="/about" component={ About } />
        <Route exact path="/calculators" component={ Calculators } />

      </div>
    </Router>
  </Provider>
, rootElement);
