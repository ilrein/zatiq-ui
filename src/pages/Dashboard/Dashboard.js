// Core Libs
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Header,
  Divider,
  Segment,
  Image,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import isNil from 'ramda/src/isNil';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { Storage } from 'aws-amplify';
import { toast } from 'react-toastify';

// UI parts
import fadeIn from '../../anime/fadeIn';
import InitialLaunchModal from '../../components/InitialLaunchModal';

import SalesSection from './sections/SalesSection';
import DishesSection from './sections/DishesSection';
import MenusSection from './sections/MenusSection';

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

  // saving a new restaurant with InitialLaunchModal
  const [saving, setSaving] = useState(false);

  const onSubmit = async (
    name,
    address,
    description,
    cuisineType,
    image,
    phoneNumber,
    operatingHours,
    features,
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
            address,
            description,
            cuisineType,
            image: null,
            phoneNumber,
            operatingHours,
            features,
          },
        }),
      });
  
      const result = await post.json();

      if (result.errors) {
        console.log(result.errors); // eslint-disable-line
        return;
      }

      // upload the image after creating the restaurant
      // namespace it with its ID
      const PUT = await Storage.put(
        (`${result._id}/${uuidv4()}-${image.name}`).replace(/\s/g, ''),
        image,
        { level: 'public' },
      );
  
      const { key } = PUT; 

      const updatedRestaurantWithImage = await fetch(`${API_RESTAURANT}/${result._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': token,
        },
        body: JSON.stringify({
          restaurant: {
            image: key,
          },
        }),
      });

      const finalRestaurantObject = await updatedRestaurantWithImage.json();

      captureRestaurant(finalRestaurantObject);
    
      const updateUser = await fetch(`${API_USERS}/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': token,
        },
        body: JSON.stringify({
          user: {
            restaurantId: finalRestaurantObject._id,
          },
        }),
      });

      const updateUserResult = await updateUser.json();
      captureUser(updateUserResult);
      toast.success(`Created ${name}!`);

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
                      <InitialLaunchModal
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
                <Divider />
                <MenusSection />
              </InnerWrapper>
            )
            : (
              <Segment loading>
                <Image src="https://via.placeholder.com/500" />
              </Segment>
            )
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
