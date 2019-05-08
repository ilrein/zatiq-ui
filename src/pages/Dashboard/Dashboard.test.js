import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Dashboard from './Dashboard';

it('renders without crashing', () => {
  shallow(
    <Dashboard
      userReducer={{
        user: {},
      }}
    />,
  );
});
