import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import CustomCard from '.';

it('renders without crashing', () => {
  const wrapper = shallow(
    <CustomCard>
      Kard Content
    </CustomCard>,
  );

  expect(wrapper).toBeTruthy();
});
