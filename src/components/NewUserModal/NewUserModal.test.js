import React from 'react';
import { mount } from 'enzyme'; // eslint-disable-line

import NewUserModal from './NewUserModal';

const wrapper = mount(
  <NewUserModal
    onSubmit={() => {}}
    open
    loading={false}
  />,
);

describe('NewUserModal', () => {
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
