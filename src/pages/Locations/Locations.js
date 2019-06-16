import React from 'react';
import styled from 'styled-components';
import {
  Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import fetch from 'isomorphic-fetch';

import fadeIn from '../../anime/fadeIn';
import Body from './parts/Body';
// import {
//   API_RESTAURANT,
//   API_USERS,
// } from '../../constants';

const Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 1s ease;
`;

const InnerWrapper = styled.div`
  margin: 0.25rem 1rem;
`;

const Locations = ({
  userReducer,
  restaurant,
}) => {
  const { user } = userReducer;

  const heading = `${restaurant.name} Locations`;

  return (
    <Wrapper>
      {
        user._id
        && restaurant._id
          ? (
            <InnerWrapper>
              <Header>
                {heading}
              </Header>
              <Body />
            </InnerWrapper>
          )
          : null
      }
    </Wrapper>
  );
};

Locations.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  restaurant: PropTypes.shape().isRequired,
};

export default Locations;
