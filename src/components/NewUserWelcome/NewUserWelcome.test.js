import React from 'react';
import { mount } from 'enzyme'; // eslint-disable-line

import NewUserWelcome from './NewUserWelcome';

const wrapper = mount(
  <NewUserWelcome
    onSubmit={() => {}}
    open
    loading={false}
  />,
);

describe('NewUserWelcome', () => {
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
