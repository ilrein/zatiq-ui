import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Card,
  Statistic,
  Grid,
  Header,
  Divider,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import isNil from 'ramda/src/isNil';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import fadeIn from '../../anime/fadeIn';
import NewUserWelcome from '../../components/NewUserWelcome';
import LocationCard from '../../components/LocationCard';
import MenuSection from './parts/MenuSection';
import DishesSection from './parts/DishesSection';

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
              <Divider />
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
                      Sales
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width="5">
                    <Card>
                      <Statistic
                        label="Reservations"
                        value="0"
                        color="purple"
                      />
                    </Card>
                  </Grid.Column>

                  <Grid.Column width="5">
                    <Card>
                      <Statistic
                        label="Daily sales"
                        value="$0"
                        color="blue"
                      />
                    </Card>
                  </Grid.Column>

                  <Grid.Column width="5">
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
                    <Link to="/locations">
                      <Header>
                        Locations
                      </Header>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="equal">
                  {
                    locations.totalDocs > 0
                      ? (
                        locations.docs.map(location => (
                          <Grid.Column key={location._id}>
                            <LocationCard location={location} />
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

                <MenuSection />

                <DishesSection />
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
  userReducer: PropTypes.shape().isRequired,
  company: PropTypes.shape().isRequired,
  captureCompany: PropTypes.func.isRequired,
  captureUser: PropTypes.func.isRequired,
};

export default Dashboard;
