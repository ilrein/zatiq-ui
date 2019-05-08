import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import fadeIn from '../../anime/fadeIn';

const Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 1s ease;
`;

const Dashboard = ({
  userReducer,
  company,
}) => {
  const { user, cognitoUser } = userReducer;

  return (
    <Wrapper>
      inner content
    </Wrapper>
  );
};

export default connect(
  ({
    userReducer,
    company,
  }) => ({
    userReducer,
    company,
  }),
)(Dashboard);
