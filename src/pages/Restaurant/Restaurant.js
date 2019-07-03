import React, { useState } from 'react';
import {
  Form,
  Button,
  Header,
  Tab,
} from 'semantic-ui-react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import fadeIn from '../../anime/fadeIn';
import {
  API_RESTAURANT,
} from '../../constants';
import PlacesAutoComplete from '../../components/PlacesAutoComplete';
import CuisineDropdown from '../../components/CuisineDropdown';
import FeaturesDropdown from '../../components/FeaturesDropdown';

const Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 1s ease;
`;

const InnerWrapper = styled.div`
  margin: 0.25rem 1rem;
  width: 100%;
`;

const Restaurant = ({
  userReducer,
  restaurant,
  captureRestaurant,
}) => {
  // restaurant stuff
  const [name, setName] = useState(restaurant.name);
  const [address, setAddress] = useState(restaurant.address);
  const [description, setDescription] = useState(restaurant.description);
  const [cuisineType, setCuisineType] = useState(restaurant.cuisine);
  // const [image, setImage] = useState(restaurant.image);
  const [phone, setPhone] = useState(restaurant.phone);

  // features
  const [features, setFeatures] = useState(restaurant.features);

  // prices
  const [minPrice, setMinPrice] = useState(restaurant.priceRangeMin);
  const [maxPrice, setMaxPrice] = useState(restaurant.priceRangeMax);

  // start/close times
  const [startingTime, setStartingTime] = useState(restaurant.startingTime);
  const [closingTime, setClosingTime] = useState(restaurant.closingTime);

  // update states
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // tokens
  const { cognitoUser } = userReducer;
  const token = cognitoUser.signInUserSession.idToken.jwtToken;

  const onSubmit = async () => {
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
          },
        }),
      });
  
      const result = await post.json();
      captureRestaurant(result);
      setSaving(false);
      toast.success(`Updated ${name}`);
    } catch (error) {
      console.log(error) // eslint-disable-line
    }
  };

  const Panes = [
    {
      menuItem: 'Details',
      render: () => (
        <Tab.Pane>
          <Form>
            <Form.Field>
              <label>
                Name
              </label>
              <Form.Input
                placeholder="Tesla Inc."
                value={name}
                onChange={(event, { value }) => setName(value)}
                fluid
              />
            </Form.Field>
  
            <div className="field">
              <label>
                Address
              </label>
              <PlacesAutoComplete
                onPlaceSelected={place => setAddress(place)}
                placeholder={address}
              />
            </div>
  
            <Form.TextArea
              onChange={(event, { value }) => setDescription(value)}
              value={description}
              label="Description"
              placeholder="Restaurant description here..."
              disabled={loading}
              required
            />
  
            <div className="field required">
              <label>
                Cuisine Type
              </label>
              <CuisineDropdown
                onChange={(event, { value }) => setCuisineType(value)}
                fluid
                required
                disabled={loading}
                value={cuisineType}
              />
            </div>
  
            <div className="field">
              <label>
                Features
              </label>
              <FeaturesDropdown
                onChange={(event, { value }) => setFeatures(value)}
                fluid
                required
                disabled={loading}
                value={features}
              />
            </div>
  
            <Button
              type="submit"
              primary
              onClick={onSubmit}
              loading={saving}
            >
              Submit
            </Button>
          </Form>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Payment',
      render: () => <Tab.Pane>Payment details</Tab.Pane>
    },
  ];

  return (
    <Wrapper>
      <InnerWrapper>
        <Header>
          {restaurant.name}
        </Header>
        <Tab
          panes={Panes}
        />
      </InnerWrapper>
    </Wrapper>
  );
};

Restaurant.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  restaurant: PropTypes.shape().isRequired,
  captureRestaurant: PropTypes.func.isRequired,
};

export default Restaurant;
