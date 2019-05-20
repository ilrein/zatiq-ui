import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import MenuSection from './MenuSection';

// cognitoUser.signInUserSession.idToken.jwtToken;

it('renders without crashing', () => {
  const wrapper = shallow(
    <MenuSection />,
  );

  expect(wrapper).toBeTruthy();
});
