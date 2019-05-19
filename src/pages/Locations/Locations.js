import React from 'react';
import styled from 'styled-components';
import {
  Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import fetch from 'isomorphic-fetch';

import fadeIn from '../../anime/fadeIn';
import Body from './components/Body';
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
  company,
}) => {
  const { user } = userReducer;

  const heading = `${company.name} Locations`;

  return (
    <Wrapper>
      {
        user._id
        && company._id
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
  company: PropTypes.shape().isRequired,
};

export default Locations;
