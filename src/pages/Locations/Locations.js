import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Header,
} from 'semantic-ui-react';
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
  locations,
}) => {
  const { user, cognitoUser } = userReducer;

  const token = cognitoUser.signInUserSession.idToken.jwtToken;

  // const [saving, setSaving] = useState(false);

  // const onSubmit = async () => {
  //   setSaving(true);
  // };

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
              <Body
                locations={locations}
              />
            </InnerWrapper>
          )
          : null
      }
    </Wrapper>
  );
};

export default Locations;
