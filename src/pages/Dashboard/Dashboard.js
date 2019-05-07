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
}) => {
  const { user, cognitoUser } = userReducer;

  return (
    <Wrapper>
      Dashboard
    </Wrapper>
  );
};

export default connect(
  ({ userReducer }) => ({ userReducer }),
)(Dashboard);
