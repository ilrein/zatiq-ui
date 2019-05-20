import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Menus from './Menus';

const wrapper = shallow(
  <Menus
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
    company={{
      _id: 123,
    }}
  />,
);

it('renders without crashing', () => {
  expect(wrapper).toBeTruthy();
});
