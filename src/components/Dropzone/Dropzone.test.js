import React from 'react';
import { mount } from 'enzyme'; // eslint-disable-line

import Dropzone from './Dropzone';

const wrapper = mount(
  <Dropzone />,
);

describe('Dropzone', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
