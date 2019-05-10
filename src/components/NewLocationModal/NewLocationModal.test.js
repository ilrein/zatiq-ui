import React from 'react';
import { mount } from 'enzyme'; // eslint-disable-line

import NewLocationModal from './NewLocationModal';

const wrapper = mount(
  <NewLocationModal
    onSubmit={() => {}}
    open
    loading={false}
  />,
);

describe('NewLocationModal', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
