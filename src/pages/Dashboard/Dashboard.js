import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Card,
  Statistic,
  Grid,
} from 'semantic-ui-react';

import fadeIn from '../../anime/fadeIn';
import NewUserWelcome from '../../components/NewUserWelcome';

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

  const [newRegistration, setNewRegistration] = useState(company._id === null);
  const [saving, setSaving] = useState(false);

  // console.log('newRegistration', newRegistration);

  const onSubmit = () => {
    console.log('submit');
  }

  return (
    <Wrapper>
      <InnerWrapper>

        {
          newRegistration
            ? (
              <NewUserWelcome
                open
                onSubmit={onSubmit}
                loading={saving}
              />
            )
            : null
        }

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
