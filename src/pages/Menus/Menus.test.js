import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Menus from './Menus';

const wrapper = shallow(
  <Menus />,
);

it('renders without crashing', () => {
  expect(wrapper).toBeTruthy();
});
