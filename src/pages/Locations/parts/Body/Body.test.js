import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Body from './Body';

const wrapper = shallow(
  <Body
    locations={{
      totalDocs: 0,
      locations: [],
    }}
    userReducer={{
      user: {},
      cognitoUser: {
        signInUserSession: {
          accessToken: {
            jwtToken: 123,
          },
        },
      },
    }}
    company={{
      _id: 123,
    }}
    captureLocation={() => {}}
    captureCompany={() => { }}
  />,
);

it('renders without crashing', () => {
  expect(wrapper).toBeTruthy();
});
