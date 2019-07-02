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
import Verify from './pages/Auth/Verify';

// Main
import Dashboard from './pages/Dashboard';
import Restaurant from './pages/Restaurant';
import Locations from './pages/Locations';
import Location from './pages/Locations/Location';
import Reservations from './pages/Reservations';
import Menus from './pages/Menus';
import Dishes from './pages/Dishes';
import Dish from './pages/Dishes/Dish';

// Layouts
import MainLayout from './layouts/MainLayout';
// import BasicLayout from './layouts/BasicLayout';

// Containers
// import restaurantContainer from './containers/restaurantContainer';

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
            path="/restaurant"
            component={Restaurant}
          />

          <Route
            exact
            path="/locations"
            component={Locations}
          />

          <Route
            exact
            path="/locations/:id"
            component={Location}
          />

          <Route
            exact
            path="/reservations"
            component={Reservations}
          />

          <Route
            exact
            path="/dishes"
            component={Dishes}
          />

          <Route
            exact
            path="/dishes/:id"
            component={Dish}
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
