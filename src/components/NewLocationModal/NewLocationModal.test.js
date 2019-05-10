import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import NewLocationModal from './NewLocationModal';

const wrapper = shallow(
  <NewLocationModal
    onSubmit={() => {}}
    onClose={() => {}}
    open
    loading={false}
  />,
);

describe('NewLocationModal', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
