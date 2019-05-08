import React from 'react';
import styled from 'styled-components';
import {
  Card,
  Statistic,
  Grid,
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
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column>
              <Card>
                <Statistic
                  label="Reservations"
                  value="90"
                />
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card>
                <Statistic
                  label="Total sales"
                  value="$7 489"
                  color="green"
                />
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Dashboard;
