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
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
  locations,
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

  return (
    <Wrapper>
      {
        user._id
          ? (
            <InnerWrapper>
              <Header as="h1">
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
                <Grid.Row columns="1">
                  <Grid.Column>
                    <Header>
                      Sales Stats
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="2">
                  <Grid.Column>
                    <Card>
                      <Statistic
                        label="Reservations"
                        value="0"
                      />
                    </Card>
                  </Grid.Column>

                  <Grid.Column>
                    <Card>
                      <Statistic
                        label="Total sales"
                        value="$0"
                        color="green"
                      />
                    </Card>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns="1">
                  <Grid.Column>
                    <Header>
                      Location Details
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="equal">
                  {
                    locations.totalDocs > 0
                      ? (
                        locations.docs.map(location => (
                          <Grid.Column>
                            <Card>
                              {location.address}
                            </Card>
                          </Grid.Column>
                        ))
                      )
                      : (
                        <Grid.Column>
                          <Card
                            header="No locations created yet"
                            description={<Link to="/locations">Create one now.</Link>}
                          />
                        </Grid.Column>
                      )
                  }
                </Grid.Row>
              </Grid>
            </InnerWrapper>
          )
          : <div>user id not found</div>
      }
    </Wrapper>
  );
};

Dashboard.propTypes = {
  locations: PropTypes.shape().isRequired,
};

export default Dashboard;
