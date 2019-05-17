import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Reservations from './Reservations';

const wrapper = shallow(
  <Reservations />,
);

it('renders without crashing', () => {
  expect(wrapper).toBeTruthy();
});
