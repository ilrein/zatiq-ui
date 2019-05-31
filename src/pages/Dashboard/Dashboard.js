import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Card,
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

// import MenuSection from './parts/MenuSection';
import SalesSection from './sections/SalesSection';
import DishesSection from './sections/DishesSection';

import {
  API_COMPANY,
  API_USERS,
} from '../../constants';

const Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 1s ease;
  min-height: 110vh;
`;

const InnerWrapper = styled.div`
  margin: 0.25rem 1rem;
  width: 100%;
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
    <>
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

                <SalesSection />

                <Divider />

                <Grid>
                  <Grid.Row columns="5">
                    <Grid.Column>
                      <Link to="/locations">
                        <Header>
                          Locations
                        </Header>
                      </Link>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns="3">
                    {
                      locations.totalDocs > 0
                        ? (
                          locations.docs.map(location => (
                            <Grid.Column key={location._id}>
                              <Link to={`/locations/${location._id}`}>
                                <LocationCard location={location} />
                              </Link>
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
                <Divider />
                <DishesSection />
              </InnerWrapper>
            )
            : <div>user id not found</div>
        }
      </Wrapper>
    </>
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
