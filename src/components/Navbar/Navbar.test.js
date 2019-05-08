import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Navbar from './Navbar';

it('renders without crashing', () => {
  shallow(
    <Navbar
      userReducer={{
        user: {},
      }}
    />,
  );
});
