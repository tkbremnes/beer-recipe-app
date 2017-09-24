import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import "./Styles/Reset.css"
import "./Styles/Nord.css"
import "./Styles/table.css"

import "./Styles/Theme.css";
import "./Styles/Variables.css";

import RecipeRoutes from "./Routes/Recipes";
import CalculatorRoutes from "./Routes/Calculators";

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import store from './Utils/Reducers';

import Root from './Components/Root';
import User from './Components/User';
import About from './Components/About';

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <div>
        <Route path="/" component={ Root } />

        <RecipeRoutes />
        <CalculatorRoutes />

        <Route exact path="/user" component={ User } />
        <Route exact path="/about" component={ About } />

      </div>
    </Router>
  </Provider>
, rootElement);
