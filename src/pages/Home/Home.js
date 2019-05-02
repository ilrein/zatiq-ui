import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import fadeIn from '../../anime/fadeIn';
import { APP_NAME } from '../../constants';

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

const HomePage = () => (
  <Wrapper>
    <Link to="/dashboard">
      <h1>
        {APP_NAME}
      </h1>
    </Link>
  </Wrapper>
);

export default HomePage;
