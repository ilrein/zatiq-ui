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
    restaurant={{
      _id: 123,
    }}
    captureLocation={() => {}}
    captureRestaurant={() => { }}
  />,
);

it('renders without crashing', () => {
  expect(wrapper).toBeTruthy();
});
