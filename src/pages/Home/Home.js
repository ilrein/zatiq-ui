import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid,
  Image,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';

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

/* eslint-disable */
const HomePage = () => {
  const [APIVersion, setAPIVersion] = useState('');

  const getApiVersion = async () => {
    const get = await fetch(API_URL);
    const result = await get.json();
    setAPIVersion(result.version);
  }

  useEffect(() => {
    getApiVersion();
    if (APIVersion !== '') {
      console.log(
        `App: ${pkg.version},`,
        `API: ${API_URL}, ${APIVersion}`,
      );
    }
  }, [APIVersion]);

  return (
    <Wrapper>
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
};

export default HomePage;
