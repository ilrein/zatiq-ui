import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Header,
  Divider,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import isNil from 'ramda/src/isNil';
import PropTypes from 'prop-types';

import fadeIn from '../../anime/fadeIn';
import NewUserModal from '../../components/NewUserModal';

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
  captureRestaurant,
  captureUser,
}) => {
  const { user, cognitoUser } = userReducer;

  const token = cognitoUser.signInUserSession.idToken.jwtToken;

  const [saving, setSaving] = useState(false);

  const onSubmit = async (
    name,
    address,
    image,
    phone,
    startingTime,
    closingTime,
  ) => {
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
            ownerId: user._id,
            image,
            phone,
            startingTime,
            closingTime,
          },
        }),
      });
  
      const result = await post.json();
      if (result.errors) {
        console.log(result.errors); // eslint-disable-line
        return;
      }
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
      console.log(error); // eslint-disable-line
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
                      <NewUserModal
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
  userReducer: PropTypes.shape().isRequired,
  restaurant: PropTypes.shape().isRequired,
  captureRestaurant: PropTypes.func.isRequired,
  captureUser: PropTypes.func.isRequired,
};

export default Dashboard;
