import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import PlacesAutoComplete from './PlacesAutoComplete';

const wrapper = shallow(
  <PlacesAutoComplete
    onPlaceSelected={() => {}}
  />,
);

it('renders without crashing', () => {
  expect(wrapper).toBeTruthy();
});
