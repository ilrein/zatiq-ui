import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Items from './Items';

const wrapper = shallow(
  <Items
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

it('renders without crashing', () => {
  expect(wrapper).toBeTruthy();
});
