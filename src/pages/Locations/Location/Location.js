import React from 'react';
import styled from 'styled-components';
import {
  Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import fetch from 'isomorphic-fetch';

import fadeIn from '../../../anime/fadeIn';
// import {
//   API_COMPANY,
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
  locations,
}) => {
  const { user } = userReducer;

  const heading = 'Location';

  return (
    <Wrapper>
      {
        user._id
          ? (
            <InnerWrapper>
              <Header>
                {heading}
              </Header>
            </InnerWrapper>
          )
          : null
      }
    </Wrapper>
  );
};

Locations.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  locations: PropTypes.shape().isRequired,
};

export default Locations;
