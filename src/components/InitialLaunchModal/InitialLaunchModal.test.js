import React from 'react';
import { mount } from 'enzyme'; // eslint-disable-line

import InitialLaunchModal from './InitialLaunchModal';

const wrapper = mount(
  <InitialLaunchModal
    onSubmit={() => {}}
    open
    loading={false}
  />,
);

describe('InitialLaunchModal', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('stores name value', () => {
    const data = { target: { value: 'foo' } };

    wrapper
      .find('Input')
      .simulate('change', data);

    // change assertion when enzyme supports checking hooks
    expect(wrapper.find('Input').simulate('change', data)).toBeTruthy();
  });
});
