import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Company from './Company';

const wrapper = shallow(
  <Company
    company={{
      name: '',
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
