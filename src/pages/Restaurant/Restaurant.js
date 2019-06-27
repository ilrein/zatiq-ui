import React, { useState } from 'react';
import {
  Form,
  Button,
  Header,
} from 'semantic-ui-react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import fadeIn from '../../anime/fadeIn';
import {
  API_RESTAURANT,
} from '../../constants';

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
  const [name, setName] = useState(restaurant.name);
  const { cognitoUser } = userReducer;

  const token = cognitoUser.signInUserSession.idToken.jwtToken;

  const [saving, setSaving] = useState(false);

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

  return (
    <Wrapper>
      <InnerWrapper>
        <Header>
          Edit
          &nbsp;
          {restaurant.name}
        </Header>
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
          <Button
            type="submit"
            primary
            onClick={onSubmit}
            loading={saving}
          >
            Submit
          </Button>
        </Form>
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
