import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Dishes from './Dishes';

const wrapper = shallow(
  <Dishes
    dishes={{
      totalDocs: 0,
      docs: [],
    }}
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
