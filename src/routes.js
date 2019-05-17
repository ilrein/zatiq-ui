import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import HomePage from './pages/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Verify from './pages/Auth/Verify';

// Main
import Dashboard from './pages/Dashboard';
import Company from './pages/Company';
import Locations from './pages/Locations';
import Reservations from './pages/Reservations';
import Menus from './pages/Menus';
import Items from './pages/Items';

// Layouts
import MainLayout from './layouts/MainLayout';
// import BasicLayout from './layouts/BasicLayout';

// Containers
// import CompanyContainer from './containers/CompanyContainer';

const Wrapper = styled.div`
  height: 100%;
`;

const Routes = () => (
  <Router>
    <Wrapper>
      <Switch>
        <Route
          exact
          path="/"
          component={HomePage}
        />

        <Route
          exact
          path="/register"
          component={Register}
        />

        <Route
          exact
          path="/login"
          component={Login}
        />

        <Route
          exact
          path="/verify"
          component={Verify}
        />

        <MainLayout>
          <Route
            exact
            path="/dashboard"
            component={Dashboard}
          />

          <Route
            exact
            path="/company"
            component={Company}
          />

          <Route
            exact
            path="/locations"
            component={Locations}
          />

          <Route
            exact
            path="/reservations"
            component={Reservations}
          />

          <Route
            exact
            path="/items"
            component={Items}
          />

          <Route
            exact
            path="/menus"
            component={Menus}
          />
        </MainLayout>
      </Switch>
      <ToastContainer
        autoClose={3500}
      />
    </Wrapper>
  </Router>
);

export default Routes;
