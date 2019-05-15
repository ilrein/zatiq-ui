import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Card,
  Statistic,
  Grid,
  Header,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import isNil from 'ramda/src/isNil';

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
  company,
  captureCompany,
  captureUser,
}) => {
  const { user, cognitoUser } = userReducer;

  const token = cognitoUser.signInUserSession.idToken.jwtToken;

  const [saving, setSaving] = useState(false);

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
    
      const updateUser = await fetch(`${API_USERS}/${user._id}`, {
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
    } catch (error) {
      //
    }
  };

  console.log(user._id, company._id)

  return (
    <Wrapper>
      {
        user._id
          ? (
            <InnerWrapper>
              <Header>
                {company.name}
              </Header>
              {
                isNil(company._id)
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
          )
          : <div>user id not found</div>
      }
    </Wrapper>
  );
};

export default Dashboard;
