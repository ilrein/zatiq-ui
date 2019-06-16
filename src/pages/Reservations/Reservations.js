/* eslint-disable */
import React, { useState } from 'react';
import {
  Form,
  Button,
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

/* eslint-disable */
const Reservations = ({
  // userReducer,
  // restaurant,
  // captureRestaurant,
}) => {
  // const [name, setName] = useState(restaurant.name);
  // const { cognitoUser } = userReducer;

  // const token = cognitoUser.signInUserSession.idToken.jwtToken;

  // const [saving, setSaving] = useState(false);

  return (
    <Wrapper>
      <InnerWrapper>
        Coming soon.
      </InnerWrapper>
    </Wrapper>
  );
};

Reservations.propTypes = {
  // userReducer: PropTypes.shape().isRequired,
  // restaurant: PropTypes.shape().isRequired,
  // captureRestaurant: PropTypes.func.isRequired,
};

export default Reservations;
