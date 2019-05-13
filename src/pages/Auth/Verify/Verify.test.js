import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Verify from './Verify';

const wrapper = shallow(
  <Verify />,
);

it('renders without crashing', () => {
  expect(wrapper).toBeTruthy();
});
