import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  Card,
} from 'semantic-ui-react';

import fadeIn from '../../anime/fadeIn';

const Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 1s ease;
`;

const InnerWrapper = styled.div`
  margin: 0.25rem 1rem;
`;

const Dashboard = ({
  userReducer,
  company,
}) => {
  const { user, cognitoUser } = userReducer;

  return (
    <Wrapper>
      <InnerWrapper>
        <Card
          header="Reservations"
        />
        <Card
          header="Menus"
        />
        <Card
          header="Dishes"
        />
      </InnerWrapper>
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
