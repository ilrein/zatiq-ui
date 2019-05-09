import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Card,
  Statistic,
  Grid,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';

import fadeIn from '../../anime/fadeIn';
import NewUserWelcome from '../../components/NewUserWelcome';
import {
  API_COMPANY,
  API_USERS,
} from '../../constants';

const Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 1s ease;
`;

const InnerWrapper = styled.div`
  margin: 0.25rem 1rem;
`;

const Dashboard = ({
  userReducer,
  // company,
  captureCompany,
  captureUser,
}) => {
  const { user, cognitoUser } = userReducer;

  const token = cognitoUser.signInUserSession.idToken.jwtToken;

  const [newRegistration, setNewRegistration] = useState(user.companyId === null);
  const [saving, setSaving] = useState(false);

  // console.log('newRegistration', newRegistration);

  const onSubmit = async (name) => {
    setSaving(true);

    try {
      const post = await fetch(API_COMPANY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': token,
        },
        body: JSON.stringify({
          company: {
            name,
            staff: [
              {
                role: user.role,
                userId: user._id,
              },
            ],
          },
        }),
      });
  
      const result = await post.json();
      captureCompany(result);
    
      const updateUser = await fetch(API_USERS, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': token,
        },
        body: JSON.stringify({
          user: {
            companyId: result._id,
          },
        }),
      });

      const updateUserResult = await updateUser.json();
      captureUser(updateUserResult);

      setSaving(false);
      setNewRegistration(false);
    } catch (error) {
      //
    }
  };

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
