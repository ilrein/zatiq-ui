import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Footer from './Footer';

// cognitoUser.signInUserSession.idToken.jwtToken;

it('renders without crashing', () => {
  const wrapper = shallow(
    <Footer />,
  );

  expect(wrapper).toBeTruthy();
});
