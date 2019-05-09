import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Dashboard from './Dashboard';

// cognitoUser.signInUserSession.idToken.jwtToken;

it('renders without crashing', () => {
  const wrapper = shallow(
    <Dashboard
      userReducer={{
        user: {},
        cognitoUser: {
          signInUserSession: {
            idToken: {
              jwtToken: 123,
            },
          },
        },
      }}
    />,
  );

  expect(wrapper).toBeTruthy();
});
