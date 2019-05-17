import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Body from './Body';

const wrapper = shallow(
  <Body
    locations={{
      totalDocs: 0,
      locations: [],
    }}
  />,
);

it('renders without crashing', () => {
  expect(wrapper).toBeTruthy();
});
