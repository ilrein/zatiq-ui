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
  API_RESTAURANT,
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
  restaurant,
  locations,
  captureRestaurant,
  captureUser,
}) => {
  const { user, cognitoUser } = userReducer;

  const token = cognitoUser.signInUserSession.idToken.jwtToken;

  const [saving, setSaving] = useState(false);

  const onSubmit = async (name) => {
    setSaving(true);

    try {
      const post = await fetch(API_RESTAURANT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': token,
        },
        body: JSON.stringify({
          restaurant: {
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
      captureRestaurant(result);
    
      const updateUser = await fetch(`${API_USERS}/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': token,
        },
        body: JSON.stringify({
          user: {
            restaurantId: result._id,
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
                  {restaurant.name}
                </Header>
                <Divider />
                {
                  isNil(restaurant._id)
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
  restaurant: PropTypes.shape().isRequired,
  captureRestaurant: PropTypes.func.isRequired,
  captureUser: PropTypes.func.isRequired,
};

export default Dashboard;
