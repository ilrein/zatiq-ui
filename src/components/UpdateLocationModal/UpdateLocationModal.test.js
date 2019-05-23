import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import UpdateLocationModal from './UpdateLocationModal';

const wrapper = shallow(
  <UpdateLocationModal
    onSubmit={() => {}}
    onClose={() => {}}
    open
    loading={false}
  />,
);

describe('UpdateLocationModal', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
