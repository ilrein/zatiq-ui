import React from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Grid,
  Image,
} from 'semantic-ui-react';

import fadeIn from '../../anime/fadeIn';
import { API_URL } from '../../constants';
import pkg from '../../../package.json';
import copy from './copy.json';

// images
import Logo from '../../images/logo.png';
import WaiterService from '../../images/waiter-service.png';

import Login from '../Auth/Login';

const Wrapper = styled.div`
  animation: ${fadeIn} 1s ease;
`;

const Caption = styled.p`
  padding: 0.5rem 0;
`;

console.log('Connected to', API_URL, pkg.version); // eslint-disable-line

const HomePage = () => (
  <Wrapper>
    {/* 
    <Link to="/register">
      Register
    </Link>
    <Link to="/login">
      Login
    </Link> */}
    <Grid>
      <Grid.Column
        computer="8"
        tablet="8"
        mobile="16"
        style={{
          padding: '4rem',
        }}
      >
        <Image
          src={Logo}
          size="small"
          style={{
            marginBottom: '3rem',
          }}
        />

        <Caption>
          {copy.home.login}
        </Caption>

        <Login />
      </Grid.Column>

      <Grid.Column
        computer="8"
        tablet="8"
        mobile="16"
      >
        <Image
          src={WaiterService}
          size="huge"
        />
      </Grid.Column>
    </Grid>
  </Wrapper>
);

export default HomePage;
