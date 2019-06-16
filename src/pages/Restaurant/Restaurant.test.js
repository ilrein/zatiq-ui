import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Restaurant from './Restaurant';

const wrapper = shallow(
  <Restaurant
    restaurant={{
      name: '',
    }}
    captureRestaurant={() => {}}
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
