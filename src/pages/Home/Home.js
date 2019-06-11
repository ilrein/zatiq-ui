import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import fadeIn from '../../anime/fadeIn';
import { APP_NAME, API_URL } from '../../constants';
import pkg from '../../../package.json';

const Wrapper = styled.div`
  background-color: indigo;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  height: 100%;
  animation: ${fadeIn} 1s ease;
`;

console.log('Connected to', API_URL, pkg.version); // eslint-disable-line

const HomePage = () => (
  <Wrapper>
    <h1>
      {APP_NAME}
    </h1>

    <Link to="/register">
      Register
    </Link>
    <Link to="/login">
      Login
    </Link>
  </Wrapper>
);

export default HomePage;
