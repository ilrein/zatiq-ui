import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import DishesSection from './DishesSection';

// cognitoUser.signInUserSession.idToken.jwtToken;

it('renders without crashing', () => {
  const wrapper = shallow(
    <DishesSection />,
  );

  expect(wrapper).toBeTruthy();
});
