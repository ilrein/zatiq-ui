import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import MenusSection from './MenusSection';

it('renders without crashing', () => {
  const wrapper = shallow(
    <MenusSection />,
  );

  expect(wrapper).toBeTruthy();
});
