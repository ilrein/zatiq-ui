import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Company from './Company';

it('renders without crashing', () => {
  const wrapper = shallow(<Company />);

  expect(wrapper).toBeTruthy();
});
